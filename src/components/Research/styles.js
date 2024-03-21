const styles = (error, isSmallScreen, loading ) => ({
  container: {
    borderRadius: 20,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    padding: 20,
    paddingBottom: !!error ? 0 : 20,
  },
  content: {
    opacity: loading ? 0.5 : 1,
    pointerEvents: loading ? "none" : "auto",
    paddingBottom: !!error ? 16 : 24,
    paddingLeft: isSmallScreen ? 0 : 20,
    paddingRight: isSmallScreen ? 0 : 20,
  },
  dateInput: {
    minWidth: 200,
  },
  error: {
    marginTop: 8,
  },
  inputs: {
    flexDirection: isSmallScreen ? "column" : "row",
    gap: 16,
  },
  loadingButton: {
    minWidth: 160,
  },
  searchInput: {
    flex: 1,
  },
});

export default styles;
