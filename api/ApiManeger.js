import axios from "react-native-axios";

const ApiManeger = axios.create({
  baseURL: "http://23.100.50.204:8080/",
  responseType: "json",
  withCredentials: true,
});
export default ApiManeger;
