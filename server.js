const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const postDir = './post/';
const fileArr = [];

let corsOption = {
    origin: 'http://localhost:8080',
    credentials: true    
}

app.use(cors(corsOption));

app.get("/", (req, res)=>{
    res.json(JSON.stringify({ 'postlist' : fileArr }));
});

app.get("/post/:fileName", (req, res) => {
    fs.readFile(postDir+req.params.fileName, 'utf8', (err, data) => {
        // console.log(data);
        res.send(data);
    });
    
    
});

app.listen(9000, ()=>{
    const files = fs.readdirSync(postDir);
    files.forEach( el => {
        const url = postDir+el;
        fs.readFile(url, 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                return
            }

            const fileInfoIdx = data.indexOf('---', 2);
            const fileInfoText = data.slice(4, fileInfoIdx-1).replace(/(\r\n|\n|\r)/gm, "::");
            const fileInfoArr = fileInfoText.split('::');

            const fileInfoObj = fileInfoArr.map( (ele) => {
                const arr = ele.split(': ');
                return arr[1]
            })

            const obj = {
                'title' : fileInfoObj[0],
                'author' : fileInfoObj[1],
                'data' : fileInfoObj[2],
                'categories' : fileInfoObj[3].slice(1, -1).split(', '),
                'tags': fileInfoObj[4].slice(1, -1).split(', '),
                'url' : url.slice(1)
            }
            fileArr.push(obj);
            // console.log(obj);
        });
    });

    console.log('server is running');
})