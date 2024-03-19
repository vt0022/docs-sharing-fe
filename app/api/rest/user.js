import axiosClient from '../axios/axiosClient'
import { privateAxios } from '../axios/axiosClient'

export const updatePassword = async (data, config) => {
  try {
    const response = await privateAxios.put('/users/password', data, config)
    return response.data
  } catch (error) {
    throw error
  }
}

export const resetPassword = async (data, config) => {
  try {
    const response = await axiosClient.put('/users/password/reset', data, config)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getProfile = async (config) => {
  try {
    const response = await privateAxios.get('/users/profile', config)
    return response.data
  } catch (error) {
    throw error
  }
}
