const express = require( 'express' );
const app = express(); 
const nunjucks = require('nunjucks');
const routes = require('./routes');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');


app.listen(3000, ()=>{
  console.log('Running on port 3000');
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', routes);


app.use('/', function(req, res){
  res.setHeader('Content-Type', 'text/plain');
  res.write('you posted: \n');
  res.end(JSON.stringify(req.body, null, 2));
});

// app.get('/public', function(req, res){
// 	res.sendFile(__dirname + '/public/stylesheets/style.css');
// })

app.use('/', express.static(path.join(__dirname, '/public')));


app.use('/', (req, res, next)=>{
  console.log(req.method + ' ' + req.url)
  next();
})

// app.get('/',(req, res)=>{
//   // res.send('<h1>Hello Message</h1>')
// nunjucks.render('index.html', locals, function(err, output){
// 	res.send(output);
// });

// })

// var locals = {
// 	title: 'An Example',
// 	people: [
// 	{name: 'Gandalf'},
// 	{name: 'Frodo'},
// 	{name: 'Hermione'}
// 	]
// };

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { list: list } );
});

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache: true});
// nunjucks.configure('views', {showForm: true});


