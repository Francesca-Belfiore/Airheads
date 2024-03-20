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

import { Bed } from "@mui/icons-material";

const HotelCard = ({ checkin, checkout, hotel, exchangeRates }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const nights = Math.floor(
    (new Date(checkout).getTime() - new Date(checkin).getTime()) /
      (1000 * 3600 * 24)
  );

  return (
    <Card
      sx={{
        borderRadius: 2,
        backgroundColor: "#e5ffef",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
          <Typography variant="h6" component="div" sx={{ color: "#2e7d32" }}>
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
            <Bed style={{ width: 36, height: 36 }} />
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
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography variant="body1">
                Check in: {new Date(checkin).toLocaleDateString("it-IT")}
              </Typography>

              <Divider
                orientation="vertical"
                flexItem
                style={{ marginLeft: 16, marginRight: 16 }}
              />
              <Typography variant="body1">
                Check out: {new Date(checkout).toLocaleDateString("it-IT")}
              </Typography>
            </Box>

            <Typography variant="body1" align="right" >{nights} notti</Typography>
          </Box>

          <Typography variant="body1" component="div" style={{ marginTop: 8 }}>
            Prezzo:{" "}
            {parseFloat(
              hotel?.offers[0]?.price?.total /
                exchangeRates[hotel?.offers[0]?.price?.currency]
            ).toLocaleString("it-IT", { style: "currency", currency: "EUR" })}
          </Typography>

          <Divider
            orientation="horizontal"
            flexItem
            style={{ marginTop: 8, marginBottom: 8 }}
          />

          <Button
            variant="outlined"
            color="success"
            href={encodeURI(
              `https://www.google.com/search?q=${hotel.hotel.name} check in ${checkin} check out ${checkout}`
            )}
            style={{
              alignSelf: isSmallScreen ? undefined : "flex-end",
            }}
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
