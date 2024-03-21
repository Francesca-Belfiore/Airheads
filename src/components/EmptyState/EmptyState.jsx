import { default as logo } from "./World-amico.svg";

import { Card, CardContent, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import styles from "./styles";

const EmptyState = ({ loading }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const style = styles(loading);

  return (
    <Card style={style.container}>
      <CardContent style={style.content}>
        <Typography variant={isSmallScreen ? "h5" : "h4"} align="center">
          Dove si va?
        </Typography>
        <Typography variant="subtitle1" align="center">
          Compila i campi in alto e scopri la tua prossima destinazione, è
          semplice!
        </Typography>
        <img
          src={logo}
          alt="empty-state"
          style={style.picture}
          draggable={false}
        />
      </CardContent>
    </Card>
  );
};

export default EmptyState;
