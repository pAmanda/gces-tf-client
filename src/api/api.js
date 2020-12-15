import axios from 'axios'

const base = 'http://104.131.170.181:3000/api/v1'

const API = axios.create({
  baseURL: base
})

export default API
