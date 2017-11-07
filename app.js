const express = require( 'express' );
const app = express(); 
const nunjucks = require('nunjucks');


app.listen(3000, ()=>{
  console.log('Running on port 3000');
})


app.use('/', (req, res, next)=>{
  console.log(req.method + ' ' + req.url)
  next();
})

app.get('/',(req, res)=>{
  // res.send('<h1>Hello Message</h1>')
nunjucks.render('index.html', locals, function(err, output){
	res.send(output);
});

})

var locals = {
	title: 'An Example',
	people: [
	{name: 'Gandalf'},
	{name: 'Frodo'},
	{name: 'Hermione'}
	]
};
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache: true});

