const styles = {
  button: (isSmallScreen) => ({
    alignSelf: isSmallScreen ? undefined : "flex-end",
  }),
  container: {
    borderRadius: 8,
    backgroundColor: "#e5ffef",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  dates: {
    display: "flex",
    flexDirection: "row",
  },
  divider: {
    marginTop: 8,
    marginBottom: 8,
  },
  dividerVertical: {
    marginLeft: 16,
    marginRight: 16,
  },
  icon: {
    width: 36,
    height: 36,
  },
  price: {
    marginTop: 8,
  },
  title: {
    color: "#2e7d32",
  },
};

export default styles;
