import axios from "axios"
const serverSideBaseURL = "http://localhost:8000/api"

const requestInstance = axios.create({
  baseURL: serverSideBaseURL,
})

export const getRequestInstance = () => {
  return requestInstance
}
