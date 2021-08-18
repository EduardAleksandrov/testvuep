<template>
	<form v-on:submit.prevent="onSubmit">
		<input type="text" v-model="title" placeholder="Title">
		<input type="text" v-model="body" placeholder="Body">
		<button type="submit">Change</button>
	</form>
</template>

<script>
export default {
	name: "ChangeObject",
	props:{
		num: Number
	},
	data(){
		return{
			title:'',
			body:''
		}
	},
	methods:{
		onSubmit() {
			console.log(this.num);
		}
	}

}
</script>

<style scoped>
input{
	width:100%;
	margin-bottom: 5px;
}
</style>
