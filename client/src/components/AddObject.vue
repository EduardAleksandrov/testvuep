<template>
	<form v-on:submit.prevent="onSubmit">
		<input type="text" v-model="title" placeholder="Title">
		<input type="text" v-model="body" placeholder="Body">
		<button type="submit">Create</button>
	</form>
</template>

<script>
export default {
	name: "addObject",
	data(){
		return{
			title:'',
			body:''
		}
	},
}
</script>

<style lang="scss" scoped>
input{
	width:100%;
	margin-bottom: 5px;
}
</style>
