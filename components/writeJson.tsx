import fs from 'fs';

export const writeJson = (filename: string,value:any) => {
    fs.writeFile(filename, JSON.stringify(value),()=>{});
}

export const appendWriteJson = (filename: string,value:any) => {
    fs.appendFile(filename, JSON.stringify(value),()=>{})
    
}

const readJson = (filename: string) =>  {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(filename, 'utf8');
    
        let data = '';
    
        readStream.on('data', (chunk) => {
          data += chunk;
        });
    
        readStream.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
    
        readStream.on('error', reject);
      });
}

export const findID = async (filename: string, key: string) => {
    return Object.values(await readJson(filename)).find(item=> item['id'] === key)?.['id'];
}

export const findValue = async (filename: string, key: string) => { 
    return Object.values(await readJson(filename)).find(item=> item['id'] === key)?.['value'];
}