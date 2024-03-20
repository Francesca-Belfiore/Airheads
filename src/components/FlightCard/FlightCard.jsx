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

const FlightCard = ({ departureAirport, destinationAirport, flight, type }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      sx={{
        borderRadius: 2,
        backgroundColor: "#e2f5ff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        flex: 1
      }}
    >
      <CardContent>
        <Box
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" component="div" sx={{ color: "#1976d2" }}>
            {`Volo di ${type === "outbound" ? "andata" : "ritorno"}`}
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
              marginBottom: 24 // PROVA
            }}
          >
            <Typography variant="h5">{departureAirport}</Typography>

            <Box
              style={{
                display: "flex",
                flex: 0.4,
                borderStyle: "dashed",
                borderWidth: 2,
              }}
            />

            {type === "outbound" ? (
              <FlightTakeoff style={{ width: 36, height: 36 }} />
            ) : (
              <FlightLand style={{ width: 36, height: 36 }} />
            )}

            <Box
              style={{
                display: "flex",
                flex: 0.4,
                borderStyle: "dashed",
                borderWidth: 2,
              }}
            />

            <Typography variant="h5">{destinationAirport}</Typography>
          </Box>

          <Typography variant="body1" component="div" style={{ marginTop: 8 }}>
            Prezzo:{" "}
            {parseFloat(
              flight?.pricingOptions[0]?.price?.amount / 1000
            ).toLocaleString("it-IT", { style: "currency", currency: "EUR" })}
          </Typography>

          <Divider
            orientation="horizontal"
            flexItem
            style={{ marginTop: 8, marginBottom: 8 }}
          />

          <Button
            variant="outlined"
            color="primary"
            href={flight?.pricingOptions[0].items[0].deepLink}
            style={{
              alignSelf: isSmallScreen ? undefined : "flex-end",
            }}
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
