import axios from "./axios"

export const sendMoneyRequest = ( trans ) => axios.post("/account/id/transferences" , trans)
// export const sendMoneyRequest = ( trans ) => axios.post("/account/id/transferences" , trans)
// export const sendMoneyRequest = ( trans ) => axios.post("/account/id/transferences" , trans)