const express = require ('express');
const multer  = require('multer') // multipart/form-data
const upload = multer({ dest: 'uploads/' }) // multipart/form-data
const cookieParser = require('cookie-parser')
const path = require('path');
const {v4} = require('uuid');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = '192.168.2.176' || 'localhost';

let POSTS = [
	{id:v4(),name:"первый",typeId:1, done:false},
	{id:v4(),name:"второй",typeId:2, done:false},
	{id:v4(),name:"третий",typeId:3, done:false},
	{id:v4(),name:"Четвертый",typeId:4, done:false},
	{id:v4(),name:"пятый",typeId:5, done:false}
]

app.use(express.json());
app.use(cookieParser());
//CORS
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', process.env.API_URL);

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.get("/about", function(request, response){
    response.send("<h1>О сайте</h1>");
});

//GET
app.get('/api/things', (req, res) => {
	//res.setHeader("Access-Control-Allow-Origin","http://localhost:8080"); //заголовок ответа
	console.log('Cookies: ', req.cookies);
	console.log('Signed Cookies: ', req.signedCookies);
	res.status((200)).json(POSTS);
})

//POST
app.post('/api/things', upload.none(), (req, res) => {  // multipart/form-data
	// res.setHeader("Access-Control-Allow-Origin","http://localhost:8080");
	// res.setHeader("Access-Control-Allow-Methods",["GET","POST"]);
	// res.setHeader("Vary", "Origin");
	const post = {...req.body, id: v4(), done:false};
	console.log(req.body);
	POSTS.push(post);
	res.status(201).json(post);
})
app.post('/api/things', (req, res) => {  // application/json
	const post = {...req.body, id: v4(), done:false};
	console.log(req.body);
	POSTS.push(post);
	res.status(201).json(post);
})
//PUT
app.put('/api/things/:id', (req, res) => {
	const idx = POSTS.findIndex(c => c.id === req.params.id);
	POSTS[idx] = {...req.body, id: v4()};
	res.json(POSTS[idx]);
})

//app.use(express.static(path.resolve(__dirname,'client')))

// app.listen(PORT, HOST,() => {
// 	console.log(`Server has been started on port ${PORT} and host ${HOST}...`);
// });

app.listen(PORT, 'localhost',() => {
	console.log(`Server has been started on port ${PORT} and host localhost...`);
});




