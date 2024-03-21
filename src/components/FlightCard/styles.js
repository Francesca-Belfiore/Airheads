const styles = {
  button: (isSmallScreen) => ({
    alignSelf: isSmallScreen ? undefined : "flex-end",
  }),
  container: {
    borderRadius: 8,
    backgroundColor: "#e2f5ff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    flex: 1,
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  dashedLine: {
    display: "flex",
    flex: 0.4,
    borderStyle: "dashed",
    borderWidth: 2,
  },
  divider: {
    marginTop: 8,
    marginBottom: 8,
  },
  icon: {
    width: 36,
    height: 36,
  },
  price: {
    marginTop: 8,
  },
  title: {
    color: "#1976d2",
  },
};

export default styles;
