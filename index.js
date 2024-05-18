import dotenv from 'dotenv'
import fs from 'fs'
import { queryGpt } from './query-gpt-chat.js';
import stripAnsi from "strip-ansi";

dotenv.config()
const openAiKey = process.env.OPENAI_API_KEY

const filenameInput = `./prueba2.commit`

const openFile = (filename) => {
    try {
        return fs.readFileSync(filename, {encoding:'utf8', flag:'r'})
    } catch (e) {
        console.error(`Cannot open file: ${filename}`)
        process.exit(1)
    }
}

const writeFile = (filename, content) => {
    try {
        fs.writeFileSync(filename, content, {encoding:'utf8'})
        console.log(`Written ${filename} - ${content.length} bytes`)
    } catch (e) {
        console.error(`Cannot write content to file: ${filename}`, e)
        process.exit(1)
    }
}

const readFile = (filename) => fs.readFileSync(filename)
const removeFile = (filename) => fs.unlinkSync(filename)

const fromSystem = (content) => ({ role: "system", content })
const fromUser = (content) => ({ role: "user", content })
const fromAssistant = (content) => ({ role: "assistant", content })
const content = openFile(filenameInput)
const SYSTEM_PROMPT = 'You are an assistant to write the commit message.' +
    'The user will send you the content of the commit diff, and you will reply with the commit message.' +
    'Be concise, just write the message, do not give any explanation. '

;(async () => {
    try {
        const gptRes = await queryGpt([
            fromSystem(SYSTEM_PROMPT),
            fromUser(content)
        ], openAiKey);
        console.log(gptRes);
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
