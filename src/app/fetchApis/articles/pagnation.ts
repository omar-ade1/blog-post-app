import axios from "axios"
import { DOMAIN_NAME } from "../../../utils/domain"

export const PAGNATION = async() => {
  try {
    const res = await axios.get(`${DOMAIN_NAME}/api/article`)
  } catch (error) {
    return error
  }
}