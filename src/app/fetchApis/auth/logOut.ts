import axios from "axios";
import { DOMAIN_NAME } from "../../../utils/domain";

export async function LOG_OUT_USER() {
  try {
    // const res = await axios.get(`${DOMAIN_NAME}/api/log-out`);
    const res = await axios.get(`/api/log-out`);
    return res.data.message;
  } catch (error) {
    return error.response.data.message;
  }
}
