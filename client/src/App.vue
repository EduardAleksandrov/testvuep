<template>
	<div id="app">
		<div class="wrapper">
			<div class="leftBox">
				<div class="innerWrapper">
					<addObject class="AddObject" />
					<button v-on:click="visible=!visible">Изменить</button>
					<div class="post" v-for="(post, index) in posts" :key="post.id"
						 v-on:click="getId(post.id)"
						 :class="{'strike': post.done}">
						<h2>Пост №{{ index + 1 }}</h2>
						<changeObject v-if="visible" v-bind:num="post.id" />
					</div>

				</div>
			</div>
			<div class="rightBox">
				<div v-for="post in posts" :key="post.id" v-if="post.id == numberId" >
					<p class="jsonData">
						{<br>"User ID": {{ post.id }}<br>
						"User title": {{ post.name }}<br>
						"User body": {{ post.typeId }}<br>
						}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AddObject from '@/components/AddObject';
import changeObject from '@/components/ChangeObject';
import request from '@/lib/wp';
export default {
	name: 'App',
	components: {
		AddObject, changeObject
	},
	data() {
		return {
			posts: [],
			index: 0,
			numberId: 0,
			visible: false,

		}
	},
	async mounted() {
		this.posts = await request('http://127.0.0.1:80/api/things');
		// const res = await fetch("http://127.0.0.1:80/api/things");
		// const posts = await res.json();
		// this.posts = posts;
	},
	methods:{
		getId(id) {
			this.numberId = id;
			for (let i of this.posts) {
				if (i.id == id) {
					i.done = true;
				} else {
					i.done = false;
				}
			}
		},

	}
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 0px;
}
@import 'assets/styles/reset.scss';
.leftBox {
	background: #acf5f5;
	width: 40%;
}
.rightBox {
	background: #ccdaea;
	width: 60%;

}
.wrapper {
	display:flex;
	min-height: 100vh;
}
.innerWrapper{
	margin-left:20%;
	margin-right:20%;
	margin-top: 30%;
}
.post {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	border: 1px solid #2c3e50;
	border-radius: 5px;
	margin-bottom: 1rem;
	background: #efef91;

}
.jsonData {
	margin-left:30%;
	margin-top:30%;
	text-align: left;
}
.AddObject {
	margin-bottom: 20px;
}
button {
	margin-bottom: 10px;
}
.strike {
	background: crimson;
}
</style>
