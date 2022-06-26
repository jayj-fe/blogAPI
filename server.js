const express = require('express');
const fs = require('fs');
const path = require('path');
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
    res.sendFile('index.html', { root : __dirname});
});

app.get("/postlist.json", (req, res)=>{
    fs.readFile('./postlist.json', 'utf8', (err, data) => {
        // console.log(data)
        res.json(JSON.parse(data));
    });
});

app.get("/blogAPI/:fileName", (req, res)=>{
    fs.readFile('./'+req.params.fileName, 'utf8', (err, data) => {
        // console.log(data)
        res.json(JSON.parse(data));
    });
});

app.get("/blogAPI", (req, res)=>{
    res.json(jsonCon);
});

app.get("/blogAPI/post/:foldName/:fileName", (req, res) => {
    fs.readFile(postDir + req.params.foldName +'/'+ req.params.fileName, 'utf8', (err, data) => {
        // console.log(data);
        res.send(data);
    });
});

app.get("/blogAPI/assets/:foldName/:subFoldName/:fileName", (req, res) => {
    res.sendFile(path.resolve(path.resolve(__dirname, './assets/' + req.params.foldName +'/' + req.params.subFoldName +'/'+ req.params.fileName)));
});

app.listen(9000, ()=>{
    const folders = fs.readdirSync(postDir);
    console.log(folders);

    const categoriesList = [];

    folders.forEach( (el, idx) => {
        // console.log(el);
        const folderDir = postDir + el + '/';
        // console.log(folderDir);

        const files = fs.readdirSync(folderDir);
        let categoriesFiles = [];

        files.forEach( el => {
            const url = folderDir+el;
                
            const result = fs.readFileSync(url, 'utf8');
            const fileInfoIdx = result.indexOf('---', 2);
            // console.log(result.slice(5, fileInfoIdx-2));
            const fileInfoText = result.slice(5, fileInfoIdx-2).replace(/(\r\n|\n|\r)/gm, "::");
            // console.log(fileInfoText);
            const fileInfoArr = fileInfoText.split('::');
            // console.log(fileInfoArr);

            const fileCon = result.slice(fileInfoIdx+15, fileInfoIdx+500);
            console.log(fileCon);

            const fileInfoObj = fileInfoArr.map( (ele) => {
                const arr = ele.split(': ');
                return arr[1]
            })

            const postDate = fileInfoObj[2].slice(0, 10);
            // console.log(postDate);

            const obj = {
                'title' : fileInfoObj[0],
                'author' : fileInfoObj[1],
                'date' : new Date(postDate),
                'categories' : fileInfoObj[3].slice(1, -1).split(', '),
                'tags': fileInfoObj[4].slice(1, -1).split(', '),
                'url' : url.slice(1),
                'con' : fileCon
            }
            
            categoriesFiles.push(obj);
            filesArr.push(obj);
            // console.log(obj);
        });

        console.log(idx);
        categoriesList.push({ name : el , length : files.length });
        console.log(categoriesList);
        let categoriesFilesSort = categoriesFiles.sort((a,b) => b.date - a.date );
        console.log(categoriesFiles);

        let jsonCon = { 'postlist' : categoriesFilesSort };
        fs.writeFileSync(el+'list.json', JSON.stringify(jsonCon));
    });

    const categoriesjsonCon = { 'categorieslist' : categoriesList };
    fs.writeFileSync('categorieslist.json', JSON.stringify(categoriesjsonCon));

    // console.log(filesArr);

    const allFilesSort = filesArr.sort((a,b) => b.date - a.date );
    console.log('dataSort');
    console.log(allFilesSort);

    const jsonCon = { 'postlist' : allFilesSort };
    fs.writeFileSync('postlist.json', JSON.stringify(jsonCon));

    console.log('server is running');
})