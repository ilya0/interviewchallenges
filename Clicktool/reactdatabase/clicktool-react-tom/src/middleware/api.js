import axios from 'axios'
import config from 'config'

const client = axios.create({
  baseURL: config.api_endpoint,
  responseType: 'json'
})

client.defaults.headers.post['Content-Type'] = 'application/json'

export default client
