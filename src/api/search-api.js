import API from './api'

const endpointRoot = '/search'

const SearchAPI = {
  searchProfiles (query) {
    return API.get(`${endpointRoot}/?query=${query}`)
  }
}

export default SearchAPI
