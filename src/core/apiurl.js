import axios from "axios";

export let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "*");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");

export const APIS = axios.create({
  baseURL: "https://examapi.nuhvin.com",
});

export const serverUrl = "https://examapi.nuhvin.com";

// export const APIS = axios.create({
//   baseURL: "http://localhost:8000",
// });

// export const serverUrl = "http://localhost:8000";

// export const APIS = axios.create({
//   baseURL: "https://v-new-deployment-election-server.onrender.com/",
// });
