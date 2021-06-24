import axios from "axios"
const serverSideBaseURL = process.env.BASE_URL

const requestInstance = axios.create({
  baseURL: serverSideBaseURL,
})

export const getAxiosInstance = () => {
  return requestInstance
}
