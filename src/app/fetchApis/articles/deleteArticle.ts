import axios from "axios";
import { DOMAIN_NAME } from "../../../utils/domain";

export const DELETE_ARTICLE = async (id: string | number) => {
  try {
    // const res = await axios.delete(`${DOMAIN_NAME}/api/articles/${id}`);
    const res = await axios.delete(`/api/articles/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
