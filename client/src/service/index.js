import axios from "axios";
import { COMPILE, COMPILE_JS } from "./api";

export const compile = async (code) => {
  const res = await axios.post(COMPILE, { code });
  return res;
};

export const compileJs = async (code) => {
  const res = await axios.post(COMPILE_JS, { code });
  return res;
};
