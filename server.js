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

app.get("/blogAPI", (req, res)=>{
    fs.readFile('./postlist.json', 'utf8', (err, data) => {
        // console.log(data)
        res.json(JSON.parse(data));
    });
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

app.get("/blogAPI/post/:fileName", (req, res) => {
    fs.readFile(postDir + req.params.fileName +'.md', 'utf8', (err, data) => {
        // console.log(data);
        res.send(data);
    });
});

app.get("/blogAPI/assets/:foldName/:fileName", (req, res) => {
    res.sendFile(path.resolve(path.resolve(__dirname, './assets/' + req.params.foldName +'/' + req.params.fileName)));
});

app.get("/blogAPI/assets/:foldName/:subFoldName/:fileName", (req, res) => {
    res.sendFile(path.resolve(path.resolve(__dirname, './assets/' + req.params.foldName +'/' + req.params.subFoldName +'/'+ req.params.fileName)));
});

app.get("/blogAPI/assets/:foldName/:subFoldName/:subFoldName2/:fileName", (req, res) => {
    res.sendFile(path.resolve(path.resolve(__dirname, './assets/' + req.params.foldName +'/' + req.params.subFoldName+'/' + req.params.subFoldName2 +'/'+ req.params.fileName)));
});

app.listen(9000, ()=>{
    const files = fs.readdirSync(postDir);
    console.log(files);

    const categoriesList = [];

    files.forEach( el => {
    
        const result = fs.readFileSync(postDir + el, 'utf8');
        // console.log(result);
        const fileInfoIdx = result.indexOf('---', 2);
        // console.log(fileInfoIdx);
        const fileInfoText = result.slice(result.indexOf('title'), fileInfoIdx).replace(/(\r\n|\n|\r)/gm, "::");
        // console.log(fileInfoText);
        const fileInfoArr = fileInfoText.split('::');
        // console.log(fileInfoArr);

        const fileInfoObj = fileInfoArr.map( (ele) => {
            const arr = ele.split(': ');
            return arr[1]
        });

        // 날짜 타입으로 변환하기
        const postDate = fileInfoObj[2].slice(0, 10);

        // 컨텐츠 가져오기
        const fileCon = result.slice(fileInfoIdx, fileInfoIdx+500);

        // 카테고리 저장하기
        const categoriesArr = fileInfoObj[3].slice(1, -1).split(', ');

        categoriesArr.forEach( el => {
            if(categoriesList.indexOf(el) === -1 ){
                categoriesList.push(el);
            }
        })
        
        const obj = {
            'title' : fileInfoObj[0],
            'author' : fileInfoObj[1],
            'date' : new Date(postDate),
            'categories' : categoriesArr,
            'tags': fileInfoObj[4].slice(1, -1).split(', '),
            'math' : fileInfoObj[5],
            'mermaid' : fileInfoObj[6],
            'img' : fileInfoObj[7],
            'url' : (postDir + el).slice(1, -3),
            'con' : fileCon
        }

        // console.log(obj);
        
        filesArr.push(obj);
    });

    const allFilesSort = filesArr.sort((a,b) => b.date - a.date );
    // console.log('dataSort');
    // console.log(allFilesSort);

    const jsonCon = { 'postlist' : allFilesSort };
    fs.writeFileSync('postlist.json', JSON.stringify(jsonCon));

    const categoriesListJson = [];

    categoriesList.forEach( el => {    
        const categoriesJson = [];
        filesArr.forEach( ele => {
            if(ele.categories.indexOf(el) !== -1){
                // console.log('add');

                // if(el === 'javascript'){
                //     console.log(ele.title);
                //     console.log(ele.img);
                // }

                categoriesJson.push(ele);
            }
        });
        
        categoriesListJson.push({ name : el, length : categoriesJson.length });
        
        const categoriesJsonSort = categoriesJson.sort((a,b) => b.date - a.date );
        const jsonCon = { 'postlist' : categoriesJsonSort };

        fs.writeFileSync(el+'list.json', JSON.stringify(jsonCon));
    })

    fs.writeFileSync('categorieslist.json', JSON.stringify({ 'categorieslist' : categoriesListJson }));
    console.log({ 'categorieslist' : categoriesListJson });

    console.log('server is running');
})