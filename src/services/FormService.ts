import axios from 'axios'

export const save = (
  name: string, 
  lastName: string, 
  email: string, 
  password: string, 
  cnpjcpf: string, 
  adressName: string, 
  number: string, 
  aditionalAdress: string, 
  city: string, 
  state: string, 
  zipCode: string
) => {
  const formData = {
    name,
    lastName,
    email,
    password,
    cnpjcpf,
    adressName,
    number,
    aditionalAdress,
    city,
    state,
    zipCode
  }
  return axios.post(`http://localhost:3333/person`, {...formData})
}