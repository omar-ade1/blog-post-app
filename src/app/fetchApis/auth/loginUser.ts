import axios from "axios";
import { DOMAIN_NAME } from "../../../utils/domain";

export const LOGIN_USER = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${DOMAIN_NAME}/api/login`, {
      email: email,
      password: password,
    });
    return res;
  } catch (error) {
    return error;
  }
};
