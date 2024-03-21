import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { FlightLand, FlightTakeoff } from "@mui/icons-material";

import styles from "./styles";

const FlightCard = ({ departureAirport, destinationAirport, flight, type }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      style={styles.container}
    >
      <CardContent>
        <Box
          style={styles.content}
        >
          <Typography variant="h6" component="div" style={styles.title}>
            {`Volo di ${type === "outbound" ? "andata" : "ritorno"}`}
          </Typography>

          <Divider
            orientation="horizontal"
            flexItem
            style={styles.divider}
          />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24
            }}
          >
            <Typography variant="h5">{departureAirport}</Typography>

            <Box
              style={styles.dashedLine}
            />

            {type === "outbound" ? (
              <FlightTakeoff style={styles.icon} />
            ) : (
              <FlightLand style={styles.icon} />
            )}

            <Box
              style={styles.dashedLine}
            />

            <Typography variant="h5">{destinationAirport}</Typography>
          </Box>

          <Typography variant="body1" component="div" style={styles.price}>
            Prezzo:{" "}
            {parseFloat(
              flight?.pricingOptions[0]?.price?.amount / 1000
            ).toLocaleString("it-IT", { style: "currency", currency: "EUR" })}
          </Typography>

          <Divider orientation="horizontal" flexItem style={styles.divider} />

          <Button
            variant="outlined"
            color="primary"
            href={flight?.pricingOptions[0].items[0].deepLink}
            style={styles.button(isSmallScreen)}
            target="_blank"
          >
            Vai al sito
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
