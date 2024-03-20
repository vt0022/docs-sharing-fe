import axiosClient from './axios/axiosClient'

const userServices = {
  login(email, password) {
    const url = '/auth/login'
    return axiosClient.post(url, { email, password })
  },
  signup(email, password, confirmPassword, firstName, lastName) {
    const url = '/auth/signup'
    return axiosClient.post(url, {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
    })
  },
  getProfile(accessToken) {
    const url = '/users/profile'
    return axiosClient.get(url, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
  },
}

export default userServices
