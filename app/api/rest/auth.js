import axiosClient from '../axios/axiosClient'

export const login = async (data, config) => {
  try {
    const response = await axiosClient.post('/auth/login', data, config)
    return response.data
  } catch (error) {
    throw error
  }
}

export const signup = async (data, config) => {
  try {
    const response = await axiosClient.post('/auth/signup', data, config)
    return response.data
  } catch (error) {
    throw error
  }
}

export const sendEmail = async (config) => {
  try {
    const response = await axiosClient.post('/auth/sendEmail', '', config)
    return response.data
  } catch (error) {
    throw error
  }
}

export const verify = async (config) => {
  try {
    const response = await axaxiosClientios.post('/auth/verify', '', config)
    return response.data
  } catch (error) {
    throw error
  }
}
