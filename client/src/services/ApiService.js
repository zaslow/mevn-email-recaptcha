import axios from 'axios'
import globals from '../globals.js'

export default class ApiService {

  static get(path, data) {
    let uri = `${globals.apiEndpointBase}${path}`;

    if (data) {
      uri += `?${Object.keys(data).map(key => key + '=' + data[key]).join('&')}`
    }

    return axios.get(uri);
  }

  static post(path, data) {
    return axios.post(`${globals.apiEndpointBase}${path}`, data)
  }
}
