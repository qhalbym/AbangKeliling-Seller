import axios from "axios";

const instance = axios.create({
  baseURL: "http://2461-2404-8000-1003-11f4-6f10-200b-c3e7-ee66.ngrok.io",
});

export default instance;
