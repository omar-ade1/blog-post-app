import axios from "axios"
import { DOMAIN_NAME } from "../../../utils/domain"


export const GET_ARTICLE_COUNT = async(searchText) => {
  
  try {
    // Get Article Count  Searchtext For Count The Results Of Search
    // const response = await axios.get(`${DOMAIN_NAME}/api/articles/count?searchText=${searchText}`);
    const response = await axios.get(`/api/articles/count?searchText=${searchText}`);
    return response
  } catch (error) {
    return error
  }
}