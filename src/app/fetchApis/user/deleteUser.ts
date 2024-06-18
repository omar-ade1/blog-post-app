import axios from "axios";
import { DOMAIN_NAME } from "../../../utils/domain";

export const DELETE_USER = async (id:string|number) => {
  try {
    const res = await axios.delete(`${DOMAIN_NAME}/api/profile/${id}`);
    return res
  } catch (error) {
    return (error);
  }
};
