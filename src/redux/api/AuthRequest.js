import { APIS } from "../../core/apiurl";

export const logIn = (FormData) => APIS.post("auth/login", FormData);
