import axios from "axios"

const serverSideBaseURL = process.env.NEXT_PUBLIC_BASE_URL

const requestInstance = axios.create({
  baseURL: serverSideBaseURL,
})

const nextRequestInstance = axios.create({
  baseURL: "http://localhost:3000",
})

export const getAxiosInstance = () => {
  return requestInstance
}

export const getNextAxiosInstance = () => {
  return nextRequestInstance
}
