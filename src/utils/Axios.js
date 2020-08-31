import axios from "axios";

export default axios.create({
  baseURL: "http://13.57.235.126:5000/",
  responseType: "json"
});