import fs from 'fs';

export const writeJson = (filename: string,value:any) => {
    fs.writeFile(filename, JSON.stringify(value),err => {
        if(err){
            console.log('写入失败')
            return;
        }
    });
}

export const appendWriteJson = (filename: string,value:any) => {
    if (fs.existsSync(filename)) {
        writeJson(filename,value)
    } else {
        fs.appendFile(filename, JSON.stringify(value),err => {
            if(err){
                console.log('写入失败')
                return;
            }
        });
    }
    
}

const readJson = (filename: string) =>  JSON.parse(fs.readFileSync(filename, 'utf8'));

export const findID = (filename: string, key: string) => {
    return readJson(filename).find(item=> !!item[key])?.id;
}