const styles = (loading) => ({
  container: {
    background: "white",
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    pointerEvents: loading ? "none" : "auto",
  },
  content: {
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    opacity: loading ? 0.5 : 1,
  },
  picture: {
    maxWidth: 500,
    pointerEvents: "none",
    userSelect: "none",
  },
});

export default styles;
