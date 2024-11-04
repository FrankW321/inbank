import axios from 'axios'
import type { ApiResponse, UserDetails } from '../types'

const API_URL = 'https://inbank.ee/endpoint'

export const submitUserData = async (
  userDetails: UserDetails,
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(API_URL, userDetails)
    return response.data
  } catch (error) {
    console.error('Error submitting user data:', error)
    throw error
  }
}
