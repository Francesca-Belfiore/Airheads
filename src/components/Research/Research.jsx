import { useState } from "react";
import axios from "axios";

import {
  Autocomplete,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { fetchPlaces } from "../../utils";

import { useTheme } from "@mui/material/styles";

import { Send } from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";

const Research = ({
  departureDate,
  returnDate,
  loading,
  setDepartureDate,
  setReturnDate,
  handleSearch,
  setSearch,
  search,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [suggestions, setSuggestions] = useState([]);
  const [cancelToken, setCancelToken] = useState(null);
  const [error, setError] = useState("");

  /** funzione che gestisce la ricerca dell'aeroporto di partenza al cambio dell'input */
  const handleInputChange = async (event) => {
    const value = event.target.value;

    if (!value) {
      setSuggestions([]);
    }

    if (!!value && value.length > 2) {
      if (cancelToken) {
        cancelToken.cancel();
      }

      const newCancelToken = axios.CancelToken.source();
      setCancelToken(newCancelToken);

      const places = await fetchPlaces(value, true, 3, newCancelToken.token);

      if (places) {
        setSuggestions(places);
      }
    }
  };

  const validateFields = () => {
    // controlla se tutti i campi sono compilati
    if (!search || !departureDate || !returnDate) {
      setError("Tutti i campi sono obbligatori");
      return;
    }

    // controlla se le date sono antecedenti ad oggi
    const today = new Date().toISOString().split("T")[0];
    if (departureDate < today || returnDate < today) {
      setError("Le date non possono essere antecedenti ad oggi");
      return;
    }

    // controlla se la data di ritorno è precedente alla data di partenza
    if (returnDate <= departureDate) {
      setError(
        "La data di ritorno deve essere successiva alla data di partenza"
      );
      return;
    }

    // resetta lo stato di errore se tutti i controlli passano
    setError("");
    handleSearch();
  };

  return (
    <Card
      style={{
        margin: "20px auto",
        padding: "20px",
        borderRadius: "20px",
        paddingBottom: !!error ? 0 : 20,
      }}
    >
      <CardContent
        style={{
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? "none" : "auto",
          paddingBottom: !!error ? 16 : 24,
          paddingLeft: isSmallScreen ? 0 : 20,
          paddingRight: isSmallScreen ? 0 : 20,
        }}
      >
        <Stack direction={{ sm: "column", md: "row" }} sx={{ gap: 2 }}>
          <Autocomplete
            freeSolo
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.defaultMuiPrevented = true;
              }
            }}
            forcePopupIcon={false}
            options={suggestions || []}
            getOptionLabel={(option) =>
              `${option.name} (${option.iataCode}), ${option.countryName}`
            }
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                type="text"
                label="Aeroporto di partenza"
                placeholder="Da dove si parte?"
                autoComplete="off"
                required
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!error}
                autoFocus
              />
            )}
            onChange={(_, option) => setSearch(option?.iataCode)}
            sx={{ flex: 1 }}
          />
          <TextField
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            label="Data di partenza"
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 200 }}
            error={!!error}
          />
          <TextField
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label="Data di ritorno"
            sx={{ minWidth: 200 }}
            error={!!error}
          />

          <LoadingButton
            color="primary"
            onClick={validateFields}
            endIcon={<Send />}
            loading={loading}
            variant="contained"
            sx={{ minWidth: 160 }}
          >
            <span>Andiamo!</span>
          </LoadingButton>
        </Stack>

        {!!error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Research;
