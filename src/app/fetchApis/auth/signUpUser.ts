import axios from "axios";
import { DOMAIN_NAME } from "../../../utils/domain";

// Create A New User
export const CREATE_NEW_USER = async (email: string, password: string, userName: string) => {
  try {
    // const res = await axios.post(`${DOMAIN_NAME}/api/sign-up`, {
    const res = await axios.post(`/api/sign-up`, {
      email: email,
      password: password,
      userName: userName,
    });
    return res;
  } catch (error) {
    return error;
  }
};
