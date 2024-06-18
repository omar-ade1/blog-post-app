import axios from "axios";
import { DOMAIN_NAME } from "../../../utils/domain";

export const EDIT_ARTICLE = async (id: string | number, newTitle, newDesc) => {
  try {
    const res = await axios.put(`${DOMAIN_NAME}/api/articles/${id}`, {
      title: newTitle,
      description: newDesc,
    });
    return res;
  } catch (error) {
    return error;
  }
};
