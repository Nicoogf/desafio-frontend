import axios from "./axios"

export const getCardsRequest = (idUser) => axios.get(`/account/${idUser}/cards`)

export const createCardRequest = (idUser, card) => axios.post(`/account/${idUser}/cards`, card);
export const deleteCardRequest = (idUser, id ) => axios.delete(`/account/${idUser}/cards/${id}` )