import axios from "axios";
import { DOMAIN_NAME } from "../../../utils/domain";

export const ADD_COMMENT = async (text: string | number, articleId: string | number) => {
  try {
    // const res = await axios.post(`${DOMAIN_NAME}/api/comments`, {
    const res = await axios.post(`/api/comments`, {
      text: text,
      articleId: articleId,
    });
    return res;
  } catch (error) {
    return error;
  }
};
