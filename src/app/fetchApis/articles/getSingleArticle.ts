import axios from "axios";
import { DOMAIN_NAME } from "../../../utils/domain";

// Get Single Article From Api
export async function singleArticle(id: any) {
  try {
    // const response = await axios.get(`${DOMAIN_NAME}/api/articles/${id}`);
    const response = await axios.get(`/api/articles/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}
