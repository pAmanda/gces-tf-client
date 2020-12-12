import ProfilesAPI from './profiles-api'
import SearchAPI from './search-api'

const apiList = {
  profiles: ProfilesAPI,
  search: SearchAPI
}

const Factory = {
  getApi: (target) => apiList[target]
}

export default Factory
