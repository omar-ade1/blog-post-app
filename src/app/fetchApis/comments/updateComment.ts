import axios from "axios";
import { DOMAIN_NAME } from "../../../utils/domain";

export const UPDATE_COMMENT = async (text: string | number, id: string | number) => {
  try {
    // const res = await axios.put(`${DOMAIN_NAME}/api/comments/${id}`, {
    const res = await axios.put(`/api/comments/${id}`, {
      text: text,
    });
    return res;
  } catch (error) {
    return error;
  }
};
