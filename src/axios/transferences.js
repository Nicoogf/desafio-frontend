import axios from "./axios"

export const sendMoneyRequest = ( trans ) => axios.post("/account/id/transferences" , trans)
export const depositMoneyRequest = ( idUser, trans  ) => axios.post(`/account/${idUser}/deposit` , trans)
// export const sendMoneyRequest = ( trans ) => axios.post("/account/id/transferences" , trans)