import axios from "axios";
import corsproxy from "corsproxy";

const proxy = corsproxy.createServer();
proxy.listen(8080);

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default instance;
