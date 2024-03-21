import { useState, useEffect } from "react";
import axios from "axios";

import { ImageList, ImageListItem } from "@mui/material";

import styles from "./styles";

const Images = (destination) => {
  const [images, setImages] = useState([]);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const IMG_DIMENSIONS = 200;

  useEffect(() => {
    const fetchCityImages = async () => {
      try {
        // Funzione asincrona per recuperare le immagini della destinazione
        const response = await axios.get(
          `${BACKEND_URL}/city-images?destination=${
            destination.destination
          }&imagesQuantity=${6}`
        );

        // Mapping per creare un po' di varietà nelle dimensioni delle immagini
        const formattedImages = response.data.map((url, index) => ({
          id: index + 1,
          url: url,
          cols: index === 0 || (index + 1) % 4 === 0 ? 2 : 1,
          rows: index === 0 || (index + 1) % 4 === 0 ? 2 : 1,
        }));

        // Aggiornamento dello stato delle immagini con quelle ottenute
        setImages(formattedImages);
      } catch (error) {
        console.error("Errore durante il recupero delle immagini");
        fetchCityImages();
      }
    };

    // Verifica se la destinazione è stata fornita e, in caso positivo, esegue la funzione di recupero delle immagini
    !!destination && fetchCityImages();
  }, [BACKEND_URL, destination]);

  return (
    <ImageList
      cols={images.length < 6 ? images.length : 4}
      rowHeight={120}
      variant="quilted"
      style={styles.imageList}
    >
      {images.map((item, index) => (
        <ImageListItem key={index} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            src={`${item.url}?w=${IMG_DIMENSIONS * item.cols}&h=${
              IMG_DIMENSIONS * item.rows
            }&fit=crop&auto=format`}
            alt={destination + index}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default Images;
