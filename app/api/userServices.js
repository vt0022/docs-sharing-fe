import axiosClient from './axios/axiosClient'

const userServices = {
  login(email, password) {
    const url = '/auth/login'
    return axiosClient.post(url, { email, password })
  },
}

export default userServices
