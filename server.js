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
    const jsonCon = { 'postlist' : fileArr };
    fs.writeFileSync('postlist', JSON.stringify(jsonCon))

    res.sendFile('index.html', { root : __dirname});
});

app.get("/postlist.json", (req, res)=>{
    fs.readFile('./postlist', 'utf8', (err, data) => {
        // console.log(data)
        res.json(JSON.parse(data));
    });
});

app.get("/test", (req, res)=>{
    const jsonCon = { 'postlist' : fileArr };
    fs.writeFileSync('postlist', JSON.stringify(jsonCon))

    res.sendFile('index.html', { root : __dirname});
});


app.get("/blogAPI", (req, res)=>{
    const jsonCon = { 'postlist' : fileArr };
    fs.writeFileSync('postlist', JSON.stringify(jsonCon))

    res.json(jsonCon);
});

app.get("/blogAPI/post/:fileName", (req, res) => {
    fs.readFile(postDir+req.params.fileName+'.md', 'utf8', (err, data) => {
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
            // console.log(data.slice(5, fileInfoIdx-2));
            const fileInfoText = data.slice(5, fileInfoIdx-2).replace(/(\r\n|\n|\r)/gm, "::");
            // console.log(fileInfoText);
            const fileInfoArr = fileInfoText.split('::');
            // console.log(fileInfoArr);

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
                'url' : url.slice(1, -3)
            }
            fileArr.push(obj);
            console.log(obj);
        });
    });

    console.log('server is running');
})