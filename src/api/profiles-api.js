import API from './api'

const endpointRoot = '/profiles'

const ProfilesAPI = {
  createProfile (profile) {
    return API.post(`${endpointRoot}/`, profile)
  },

  getProfile (id) {
    return API.get(`${endpointRoot}/${id}/`)
  },

  updateProfile (id, profile) {
    return API.put(`${endpointRoot}/${id}/`, profile)
  },

  deleteProfile (id) {
    return API.delete(`${endpointRoot}/${id}/`)
  }
}

export default ProfilesAPI
