import fs from 'fs';
import path from 'path';

export const writeJson = (filename: string,value:any) => {
    fs.writeFile(filename, JSON.stringify(value),err => {
         // err 写入失败：错误对象 写入成功:null
        if(err){
            console.log('写入失败')
            return;
        }
    });
}

const readJson = (filename: string) =>  JSON.parse(fs.readFileSync(filename, 'utf8'));

export const findID = (filename: string, key: string) => {
    return readJson(filename).find(item=> !!item[key])?.id;
}