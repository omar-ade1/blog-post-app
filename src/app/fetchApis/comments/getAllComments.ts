import axios from "axios";
import { DOMAIN_NAME } from "../../../utils/domain";

export const GET_ALL_COMMENTS = async (id) => {
  try {    
    const res = await axios.get(`api/comments?articleId=${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
