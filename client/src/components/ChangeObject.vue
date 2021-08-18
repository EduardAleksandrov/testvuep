<template>
	<form v-on:submit.prevent="onSubmit">
		<input type="text" v-model="form.name" placeholder="Name">
		<input type="text" v-model="form.typeId" placeholder="TypeId">
		<button type="submit">Изменить</button>
	</form>
</template>

<script>
export default {
	name: "ChangeObject",
	props:{
		num: String
	},
	data(){
		return{
			form: {
				name: '',
				typeId: ''
			}
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
