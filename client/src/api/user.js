import axios from "./client";

export const getUser = () => axios.get("/user");

