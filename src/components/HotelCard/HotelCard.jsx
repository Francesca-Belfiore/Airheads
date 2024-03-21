import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Bed } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import styles from "./styles";

const HotelCard = ({ checkin, checkout, hotel, exchangeRates }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const nights = Math.floor(
    (new Date(checkout).getTime() - new Date(checkin).getTime()) /
      (1000 * 3600 * 24)
  );

  return (
    <Card
      style={styles.container}
    >
      <CardContent>
        <Box
          style={styles.content}
        >
          <Typography variant="h6" component="div" style={styles.title}>
            Soggiorno
          </Typography>

          <Divider
            orientation="horizontal"
            flexItem
            style={{ marginTop: 8, marginBottom: 8 }}
          />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">{hotel.hotel.name}</Typography>
            <Bed style={styles.icon} />
          </Box>

          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              style={styles.dates}
            >
              <Typography variant="body1">
                Check in: {new Date(checkin).toLocaleDateString("it-IT")}
              </Typography>

              <Divider
                orientation="vertical"
                flexItem
                style={styles.dividerVertical}
              />
              <Typography variant="body1">
                Check out: {new Date(checkout).toLocaleDateString("it-IT")}
              </Typography>
            </Box>

            <Typography variant="body1" align="right">
              {nights} notti
            </Typography>
          </Box>

          <Typography variant="body1" component="div" style={styles.price}>
            Prezzo:{" "}
            {parseFloat(
              hotel?.offers[0]?.price?.total /
                exchangeRates[hotel?.offers[0]?.price?.currency]
            ).toLocaleString("it-IT", { style: "currency", currency: "EUR" })}
          </Typography>

          <Divider
            orientation="horizontal"
            flexItem
            style={styles.divider}
          />

          <Button
            variant="outlined"
            color="success"
            href={encodeURI(
              `https://www.google.com/search?q=${hotel.hotel.name} check in ${checkin} check out ${checkout}`
            )}
            style={styles.button(isSmallScreen)}
            target="_blank"
          >
            Controlla disponibilità
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
