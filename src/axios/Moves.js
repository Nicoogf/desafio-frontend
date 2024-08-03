import axios from "./axios"

export const getMovesRequest = (userid) => axios.get(`/account/${userid}/activity`)