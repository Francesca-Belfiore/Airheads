const styles = {
  container: (error) => ({
    borderRadius: 20,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    padding: 20,
    paddingBottom: !!error ? 0 : 20,
  }),
  content: (loading, error, isSmallScreen) => ({
    opacity: loading ? 0.5 : 1,
    pointerEvents: loading ? "none" : "auto",
    paddingBottom: !!error ? 16 : 24,
    paddingLeft: isSmallScreen ? 0 : 20,
    paddingRight: isSmallScreen ? 0 : 20,
  }),
  dateInput: {
    minWidth: 200,
  },
  error: {
    marginTop: 8,
  },
  inputs: (isSmallScreen) => ({
    flexDirection: isSmallScreen ? "column" : "row",
    gap: 16,
  }),
  loadingButton: {
    minWidth: 160,
  },
  searchInput: {
    flex: 1,
  },
};

export default styles;
