import axios from "axios"

const serverSideBaseURL = process.env.NEXT_PUBLIC_BASE_URL

const requestInstance = axios.create({
  baseURL: serverSideBaseURL,
})

export const getAxiosInstance = () => {
  return requestInstance
}
