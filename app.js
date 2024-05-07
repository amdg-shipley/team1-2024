const express = require('express') 
const path = require('path') 
const app = express() 
const port = 3000;
var favicon = require('serve-favicon')

const JSONdb = require('simple-json-db')
const db = new JSONdb('db.json')

app.use(favicon(path.join(__dirname, '/Images', 'favicon.ico')))

app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    const apexList = db.get('apexList') || [];

    res.render('Demo', {
        data: apexList
    })
});

app.get('/Create', function(req, res){
    res.render('Create');
});


app.post('/apex', (req, res) => {
    const { name, sub, rarity} = req.body;

    const apexList = db.get('apexList') || [];

    apexList.push({name, sub, rarity});

    db.set('apexList', apexList);

    res.redirect('/Create');
});

app.get('/delete/:id', (req,res, next) => {
    const id = req.params.id;

    const apexList = db.get('apexList') || [];
    apexList.splice(id, 1);
    db.set('apexList', apexList);

    res.redirect('/');
});

app.get('/view/:id', (req, res) => {
    const id = req.params.id;

    const apexList = db.get('apexList') || [];
    const apex = apexList[id];

    res.render('Edit', {
        id,
        apex
    });
});

app.post('/edit/:id', (req,res) => {
    const id = req.params.id;
    const { name, sub, rarity} = req.body;

    const apexList = db.get('apexList') || [];
    apexList[id] = { name, sub, rarity};
    db.set('apexList', apexList);

    res.redirect('/view/'+id);
});


app.listen(port, () => {
    console.log('Server Running')
});
