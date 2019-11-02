import axios from 'axios'

export const save = (data: any) => {
  return axios.post(`https://santa-monica-server.herokuapp.com/book`, data)
}

export const load = () => {
  return axios.get(`https://santa-monica-server.herokuapp.com/book`)
}