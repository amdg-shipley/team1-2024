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
    const makeupList = db.get('makeupList') || [];

    res.render('Demo', {
        data: makeupList
    })
});

app.get('/Create', function(req, res){
    res.render('Create');
});


app.post('/makeup', (req, res) => {
    const { name, sub, sec, ass, qot, day, per,} = req.body;

    const makeupList = db.get('makeupList') || [];

    makeupList.push({name, sub, sec, ass, qot, day, per,});

    db.set('makeupList', makeupList);

    res.redirect('/Create');
});

app.get('/delete/:id', (req,res, next) => {
    const id = req.params.id;

    const makeupList = db.get('makeupList') || [];
    makeupList.splice(id, 1);
    db.set('makeupList', makeupList);

    res.redirect('/');
});

app.get('/view/:id', (req, res) => {
    const id = req.params.id;
    const blocks = db.get('blocks')
    db.set('blocks',blocks);

    const makeupList = db.get('makeupList') || [];
    const makeup = makeupList[id];

    res.render('Edit', {
        id,
        makeup,
        blocks
    });
});

app.post('/edit/:id', (req,res) => {
    const id = req.params.id;
    const { name, sub, sec, ass, qot, day, per,} = req.body;

    const makeupList = db.get('makeupList') || [];
    makeupList[id] = { name, sub, sec, ass, qot, day, per,};
    db.set('makeupList', makeupList);

    res.redirect('/view/'+id);
});


app.listen(port, () => {
    console.log('Server Running')
});
