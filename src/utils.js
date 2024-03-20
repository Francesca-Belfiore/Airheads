import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

/** restituisce una lettera casuale */
export const generateRandomLetter = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
};

/** restituisce un elenco di posti secondo un criterio di ricerca */
export const fetchPlaces = async (
  searchTerm,
  isDestination,
  limit,
  cancelToken
) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/autosuggest`,
      {
        limit: limit,
        market: "IT",
        locale: "it-IT",
        searchTerm: searchTerm,
        includedEntityTypes: ["PLACE_TYPE_AIRPORT"],
        isDestination: isDestination,
      },
      // usato per annullare delle richieste in sospeso, se necessario
      { cancelToken: cancelToken }
    );
    return response.data.places;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Si è verificato un errore durante la ricerca");
    }
  }
};

/** restituisce una destinazione casuale, diversa da quella di partenza */
export const findDestination = async (departureAirport) => {
  try {
    // troviamo una lista di posti che iniziano per/contengono una lettera casuale
    const places = await fetchPlaces(generateRandomLetter(), true);

    // togliamo dai possibili risultati l'aeroporto di partenza
    const filteredPlaces = places.filter(
      (place) => place.iataCode !== departureAirport
    );

    // ritorna un posto casuale tra quelli trovati
    return filteredPlaces[Math.floor(Math.random() * filteredPlaces.length)];
  } catch (error) {
    console.error("Errore durante il recupero della destinazione");
  }
};

/** ricerca i voli da un aeroporto di partenza a uno di destinazione per una precisa data */
export const handleSearchFlights = async (
  departureAirport,
  destinationAirport,
  date
) => {
  const formattedDate = new Date(date);
  try {
    const response = await axios.post(`${BACKEND_URL}/search-flights`, {
      market: "IT",
      locale: "it-IT",
      currency: "EUR",
      query_legs: [
        {
          origin_place_id: { iata: departureAirport },
          destination_place_id: { iata: destinationAirport },
          date: {
            year: formattedDate.getFullYear(),
            // month è un array che va da 0 a 11, quindi è necessario sommare 1 per ottenere il valore corretto
            month: formattedDate.getMonth() + 1,
            day: formattedDate.getDate(),
          },
        },
      ],
      adults: 1,
      cabin_class: "CABIN_CLASS_ECONOMY",
    });
    return response.data;
  } catch (error) {
    console.error("Errore nella ricerca dei voli");
  }
};

/** restituisce il volo diretto più economico tra quelli forniti */
export const getCheapestFlight = (flights, type) => {
  // Converte l'oggetto ricevuto in un array per poter utilizzare i metodi degli array
  const itineraries = Object.values(flights);

  // Gestisce il caso in cui non ci sono voli disponibili
  if (itineraries.length === 0) {
    console.error("no", type, "itineraries found, retrying...");
    return;
  }

  // Ordina i voli trovati per prezzo
  const cheapestFlights = itineraries.sort((a, b) => {
    const priceA = parseFloat(a.pricingOptions[0].price.amount);
    const priceB = parseFloat(b.pricingOptions[0].price.amount);
    return priceA - priceB;
  });

  // Restituisci il volo più economico
  return cheapestFlights[0];
};

/** restituisce una lista di hotel id in una data città */
export const fetchHotelsByCity = async (cityCode) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/hotels-list`, {
      params: {
        cityCode,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Errore durante la ricerca degli hotel");
  }
};

/** ricerca hotel in base agli id e alle date fornite */
export const researchHotel = async (hotelIds, checkInDate, checkOutDate) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/search-hotel`, {
      params: {
        hotelIds,
        checkInDate,
        checkOutDate,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Errore durante la ricerca degli hotel");
  }
};

export const fetchExchangeRates = async (currency) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/exchange-rates?currency=${currency}`
    );
    // aggiunge una chiave con il timestamp all'oggetto contenente i tassi di scambio
    return { ...response.data, lastUpdate: Date.now() };
  } catch (error) {
    console.error("Errore durante il recupero delle conversioni");
  }
};

export const isUpdateNeeded = (storedItem, expirationInHours) => {
  // true se i dati non sono presenti
  if (!storedItem || !storedItem.lastUpdate) {
    return true;
  }
  const currentTime = Date.now();
  const expirationInMs = expirationInHours * 60 * 60 * 1000;
  // true se è scaduto il tempo di validità
  return currentTime - storedItem.lastUpdate > expirationInMs;
};
