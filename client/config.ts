
interface Config {
  baseUrl: string;
}
const checkConfig = (server: string): Config  => {
  let config: Config = {
    baseUrl: "",
  };
  switch (server) {
    case "production":
      config = {
        baseUrl: "https://e-commerce-5us9.vercel.app",
      };
      break;
    case "local":
      config = {
        baseUrl: "http://localhost:8000",
      };
      break;
    default:
      break;
  }
  return config;
};

export const selectServer = "production";
export const config = checkConfig(selectServer) as Config;
