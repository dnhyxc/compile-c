import axios from "axios";
import { COMPILE } from "./api";

export const compile = async (code) => {
  const res = await axios.post(COMPILE, { code });
  console.log(res, "res");
  return res;
};
