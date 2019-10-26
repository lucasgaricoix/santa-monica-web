import axios from 'axios'

export const save = (data: any) => {
  return axios.post(`http://localhost:3333/book`, data)
}

export const load = () => {
  return axios.get(`http://localhost:3333/book`)
}