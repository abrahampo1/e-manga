import MFA from "mangadex-full-api";
import db from "./db";



const mangaDex = async ({username, password}) => {
  await MFA.login(username, password);
  return MFA;
};

export { mangaDex };
