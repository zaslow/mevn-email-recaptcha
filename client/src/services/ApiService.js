import axios from 'axios'
import globals from '../globals.js'

export default class ApiService {

  static get(path, data) {
    return axios.get(`${globals.apiEndpointBase}${path}?${this.objToQueryStr(data)}`)
  }

  static post(path, data) {
    return axios.post(`${globals.apiEndpointBase}${path}`, data)
  }

  static objToQueryStr(data) {
    return Object.keys(data).map(key => key + '=' + data[key]).join('&')
  }
}
