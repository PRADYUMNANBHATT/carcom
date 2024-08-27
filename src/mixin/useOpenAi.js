import { OpenAI } from "openai";
const key = process.env.VUE_APP_ENV_VARIABLE;

const configuration = {
  apiKey: key,
  dangerouslyAllowBrowser: true,
};

const openai = new OpenAI(configuration);

export default openai;
