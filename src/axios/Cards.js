import axios from "./axios"

export const getCardsRequest = (idUser) => axios.get(`/account/${idUser}/cards`)