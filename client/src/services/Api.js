import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://192.168.129.18:8080`
  })
}
