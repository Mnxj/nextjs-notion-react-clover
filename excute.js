const fs = require('fs')
function writeFile (value, filename){
    fs.writeFile('./data.json', JSON.stringify(value),err => {
         // err 写入失败：错误对象 写入成功:null
        if(err){
            console.log('写入失败')
            return;
        }
        console.log('写入成功')
    });
}

function readFileSync (filename, key){
    const items = JSON.parse(fs.readFileSync(filename, 'utf8'));
    return items.find(item=> !!item[key]);
}