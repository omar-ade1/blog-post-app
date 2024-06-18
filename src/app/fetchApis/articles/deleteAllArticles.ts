import axios from "axios"
import { DOMAIN_NAME } from "../../../utils/domain"

export const DELETE_ALL_ARTICLES = async () => {
  try {
    const res = await axios.delete(`${DOMAIN_NAME}/api/articles`)
    return res
  } catch (error) {
    return error
  }
}