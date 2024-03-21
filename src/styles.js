const styles = (isSmallScreen, loading) => ({
  card: {
    flex: 1,
    paddingLeft: isSmallScreen ? 0 : 20,
    paddingRight: isSmallScreen ? 0 : 20,
  },
  columns: {
    display: "flex",
    flexDirection: isSmallScreen ? "column" : "row",
    opacity: loading ? 0.5 : 1,
  },
  container: {
    background: "white",
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    pointerEvents: loading ? "none" : "auto",
  },
  content: {
    opacity: loading ? 0.5 : 1,
    paddingLeft: isSmallScreen ? 0 : 20,
    paddingRight: isSmallScreen ? 0 : 20,
    paddingBottom: isSmallScreen ? 0 : 20,
  },
  destination: {
    display: "flex",
    flexDirection: isSmallScreen ? "column" : "row",
    alignContent: "center",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  disclaimer: {
    display: "flex",
    alignItems: "center",
    opacity: 0.5,
  },
  price: {
    marginTop: !isSmallScreen ? 20 : undefined,
    paddingBottom: 0,
  }
});

export default styles;
