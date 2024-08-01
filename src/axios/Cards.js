import axios from "./axios"

export const getCardsRequest = (idUser) => axios.get(`/account/${idUser}/cards`)
export const createCardRequest = (idUser, card) => axios.post(`/account/${idUser}/cards`, card);
