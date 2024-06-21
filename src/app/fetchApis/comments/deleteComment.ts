import axios from "axios";
import { DOMAIN_NAME } from "../../../utils/domain";

export const DELETE_COMMENT = async (id: string | number) => {
  try {
    // const res = await axios.delete(`${DOMAIN_NAME}/api/comments/${id}`);
    const res = await axios.delete(`/api/comments/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
