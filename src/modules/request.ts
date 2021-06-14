import axios from "axios"
const serverSideBaseURL = "http://localhost:8000"

const requestInstance = axios.create({
  baseURL: serverSideBaseURL,
})

export const getAxiosInstance = () => {
  return requestInstance
}
