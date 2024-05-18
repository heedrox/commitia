import { exec } from 'child_process';

async function execute(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            resolve(stdout)
        });
    })
}

export default execute;
