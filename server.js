const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const postDir = './post/';
const filesArr = [];

let corsOption = {
    origin: 'http://localhost:8080',
    credentials: true    
}

app.use(cors(corsOption));

app.get("/", (req, res)=>{
    const jsonCon = { 'postlist' : filesArr };
    fs.writeFileSync('postlist.json', JSON.stringify(jsonCon))

    res.sendFile('index.html', { root : __dirname});
});

app.get("/postlist.json", (req, res)=>{
    const jsonCon = { 'postlist' : filesArr };
    fs.writeFileSync('postlist.json', JSON.stringify(jsonCon))
    
    fs.readFile('./postlist.json', 'utf8', (err, data) => {
        // console.log(data)
        res.json(JSON.parse(data));
    });
});

app.get("/blogAPI/postlist.json", (req, res)=>{
    const jsonCon = { 'postlist' : filesArr };
    fs.writeFileSync('postlist.json', JSON.stringify(jsonCon))

    fs.readFile('./postlist.json', 'utf8', (err, data) => {
        // console.log(data)
        res.json(JSON.parse(data));
    });
});

app.get("/blogAPI", (req, res)=>{
    const jsonCon = { 'postlist' : filesArr };
    fs.writeFileSync('postlist.json', JSON.stringify(jsonCon))

    res.json(jsonCon);
});

app.get("/blogAPI/post/:foldName/:fileName", (req, res) => {
    // console.log(req.params);
    const jsonCon = { 'postlist' : filesArr };
    fs.writeFileSync('postlist.json', JSON.stringify(jsonCon))

    fs.readFile(postDir + req.params.foldName +'/'+ req.params.fileName, 'utf8', (err, data) => {
        // console.log(data);
        res.send(data);
    });
});

app.listen(9000, ()=>{
    const folders = fs.readdirSync(postDir);
    console.log(folders);

    folders.forEach( el => {
        // console.log(el);
        const folderDir = postDir + el + '/';
        // console.log(folderDir);

        const files = fs.readdirSync(folderDir);
        
        files.forEach( el => {
            const url = folderDir+el;
                
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
                    'url' : url.slice(1)
                }
                filesArr.push(obj);
                console.log(obj);
            });
        })
    });

    console.log('server is running');
})