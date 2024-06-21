import axios from "axios";
import { DOMAIN_NAME } from "../../../utils/domain";

// Get All Articles From Api
export async function allArticlesData(searchText,pageNumber?) {
  try {
    // const response = await axios.get(`${DOMAIN_NAME}/api/articles?searchText=${searchText}&pageNumber=${pageNumber}`);
    const response = await axios.get(`/api/articles?searchText=${searchText}&pageNumber=${pageNumber}`);

    return response;
  } catch (error) {
    console.error(error);
  }
}
