import axios from "axios";
import { DOMAIN_NAME } from "../../../utils/domain";
export const UPDATE_USER = async (id, inputName?, value?,passwordU?,passwordUValue?) => {
  try {
    // const res = await axios.put(`${DOMAIN_NAME}/api/profile/${id}`, {
    const res = await axios.put(`/api/profile/${id}`, {
      [inputName]: value,
      [passwordU]:passwordUValue
      
    });
    return res;
  } catch (error) {
    return error;
  }
};
