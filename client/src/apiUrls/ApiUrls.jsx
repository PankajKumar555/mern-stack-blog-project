const developmentURL = "http://localhost:8000";
const productionURL = "";

const baseURL =
  process.env.NODE_ENV === "production" ? productionURL : developmentURL;

export default baseURL;
