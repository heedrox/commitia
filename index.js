import dotenv from 'dotenv'
import { queryGpt } from './query-gpt-chat.js';
import execute from "./exec.js";

dotenv.config()
const openAiKey = process.env.COMMITIA_OPENAI_API_KEY

const fromSystem = (content) => ({ role: "system", content })
const fromUser = (content) => ({ role: "user", content })
const SYSTEM_PROMPT = 'You are an assistant to write the commit message.' +
    'The user will send you the content of the commit diff, and you will reply with the commit message. ' +
    'It must be a commit message of one single line. Be concise, just write the message, do not give any explanation. '

;(async () => {
    try {
        const content = await execute('git diff --cached')
        const res = await queryGpt([
            fromSystem(SYSTEM_PROMPT),
            fromUser(content)
        ], openAiKey);
        console.log(res);
    } catch (err) {
        let data= ''
        err.body.on('data', chunk => {
            data += chunk;
        });

        err.body.on('end', () => {
            console.log(data);
        });
        console.error('UNCONTROLLED ERROR', err)
    }
})()
