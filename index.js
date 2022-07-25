const express = require ('express');
const path = require('path');
const {v4} = require('uuid');
const dotenv = require('dotenv');
const app = express();

//redis connection start
var redis = require('redis'),
db = redis.createClient();
db.connect();
db.select(1);

db.on('connect', function() {
	console.log('Connected!');
});

db.set('frameworks', 'ReactJSS');

// db.select(1, function(err,res){
// 	db.set('key', 'string'); 
// });

//redis connection end

// mongo start 	
const MongoClient = require("mongodb").MongoClient;
    
const url = "mongodb://root:example@localhost:27017/";
const mongoClient = new MongoClient(url);
  
// Подключаемся к серверу
mongoClient.connect(function(err, client){
       
    // обращаемся к базе данных admin
    const db = client.db("one-test");
     
    db.command({ping: 1}, function(err, result){
        if(!err){
            console.log("Подключение с сервером mongo успешно установлено");
            console.log(result);
        }
        // Закрываем подключение
        client.close();
        console.log("Подключение mongo закрыто");
    });
});
   //set data
const mongoClient_v2 = new MongoClient(url);
mongoClient_v2.connect(function(err, client){
      
    const db = client.db("one-test");
    const collection = db.collection("delete_me");
    let user = {name: "Tom", age: 23};
    collection.insertOne(user, function(err, result){
          
        if(err){ 
            return console.log(err);
        }
        console.log(result);
        console.log(user);
		client.close();
    });
});
// mongo end

// mysql start
const mysql = require("mysql2");
  
const connection = mysql.createConnection({
	host: "localhost",
	user: "user",	
	database: "dbase",
	password: "password"
});
connection.connect(function(err){
    if (err) {
		return console.error("Ошибка: " + err.message);
    }
    else{
		console.log("Подключение к серверу MySQL успешно установлено");
    }
});
connection.end(function(err) {
	if (err) {
		return console.log("Ошибка: " + err.message);
	}
	console.log("Подключение MySQL закрыто");
});
// mysql end

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST_HOME  || 'localhost';

console.log("enviroment variable global" ,process.env.SSH_PATH);

let POSTS = [
	{id:v4(),name:"первый",typeId:1, done:false},
	{id:v4(),name:"второй",typeId:2, done:false},
	{id:v4(),name:"третий",typeId:3, done:false},
	{id:v4(),name:"Четвертый",typeId:4, done:false},
	{id:v4(),name:"пятый",typeId:5, done:false}
]

app.use(express.json());
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

//GET
app.get('/api/things', (req, res) => {
	//res.setHeader("Access-Control-Allow-Origin","http://localhost:8080"); //заголовок ответа
	res.status((200)).json(POSTS);
})
//POST
app.post('/api/things', (req, res) => {
	// res.setHeader("Access-Control-Allow-Origin","http://localhost:8080");
	// res.setHeader("Access-Control-Allow-Methods",["GET","POST"]);
	// res.setHeader("Vary", "Origin");
	const post = {...req.body, id: v4(), done:false};
	POSTS.push(post);
	res.status(201).json(post);
})
//PUT
app.put('/api/things/:id', (req, res) => {
	const idx = POSTS.findIndex(c => c.id === req.params.id)
	POSTS[idx] = {...req.body, id: v4()};
	res.json(POSTS[idx])
})

//app.use(express.static(path.resolve(__dirname,'client')))

app.listen(PORT, HOST,() => {
	console.log(`Server has been started on port ${PORT} and host ${HOST}...`);
});




