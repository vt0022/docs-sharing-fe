import { privateAxios } from '../axios/axiosClient'

export const getPosts = async (config) => {
  try {
    const response = await privateAxios.get('/post/all', config)
    return response.data
  } catch (error) {
    throw error
  }
}
