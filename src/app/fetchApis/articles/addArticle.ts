import axios from "axios";
import { DOMAIN_NAME } from "../../../utils/domain";

export const ADD_ARTCILE = async (title: string, description: string) => {
  try {
    // const res = await axios.post(`${DOMAIN_NAME}/api/articles`, {
    const res = await axios.post(`/api/articles`, {
      title: title,
      description: description,
    });
    return (res);

  } catch (error) {
    return (error);
  }
};
