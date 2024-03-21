const styles = {
  card: (isSmallScreen) => ({
    flex: 1,
    paddingLeft: isSmallScreen ? 0 : 20,
    paddingRight: isSmallScreen ? 0 : 20,
  }),
  columns: (isSmallScreen) => ({
    display: "flex",
    flexDirection: isSmallScreen ? "column" : "row",
  }),
  container: (loading) => ({
    background: "white",
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    opacity: loading ? 0.5 : 1,
    pointerEvents: loading ? "none" : "auto",
  }),
  content: (isSmallScreen) => ({
    paddingLeft: isSmallScreen ? 0 : 20,
    paddingRight: isSmallScreen ? 0 : 20,
    paddingBottom: isSmallScreen ? 0 : 20,
  }),
  destination: (isSmallScreen) => ({
    display: "flex",
    flexDirection: isSmallScreen ? "column" : "row",
    alignContent: "center",
    alignItems: "baseline",
    justifyContent: "space-between",
  }),
  disclaimer: {
    display: "flex",
    alignItems: "center",
    opacity: 0.5,
  },
  price: (isSmallScreen) => ({
    marginTop: !isSmallScreen ? 20 : undefined,
    paddingBottom: 0,
  }),
};

export default styles;
