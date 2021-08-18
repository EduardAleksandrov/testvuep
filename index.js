const express = require ('express');
const path = require('path');
const {v4} = require('uuid');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST_HOME  || 'localhost';

let POSTS = [
	{id:v4(),name:"первый",typeId:"тело", done:false},
	{id:v4(),name:"второй",typeId:"тело", done:false},
	{id:v4(),name:"третий",typeId:"тело", done:false},
	{id:v4(),name:"Четвертый",typeId:"тело", done:false},
	{id:v4(),name:"пятый",typeId:"тело", done:false}
]

app.use(express.json())

//GET
app.get('/api/things', (req, res) => {
	res.setHeader("Access-Control-Allow-Origin","http://localhost:8080"); //заголовок ответа
	res.status((200)).json(POSTS);
})

//app.use(express.static(path.resolve(__dirname,'client')))

app.listen(PORT, HOST,() => {
	console.log(`Server has been started on port ${PORT} and host ${HOST}...`);
});




