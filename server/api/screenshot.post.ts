import * as fs from 'fs';
import * as path from 'path';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let data = body.replace(/^data:image\/\w+;base64,/, "");
    let buf = Buffer.from(data, 'base64');
    fs.writeFile('./public/images/screenshot.jpeg', buf, (err)=>{
        if(err) throw err;
    });
    return { body }
})