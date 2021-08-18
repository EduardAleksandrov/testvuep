<template>
	<form v-on:submit.prevent="onSubmit">
		<input type="text" v-model="form.name" placeholder="Name (Обязательно для заполнения)">
		<input type="text" v-model="form.typeId" placeholder="TypeId">
		<button type="submit">Создать</button>
	</form>
</template>

<script>
export default {
	name: "addObject",
	data() {
		return {
			form: {
				name: '',
				typeId: ''
			}
		}
	},
	methods: {
		onSubmit() {
			if (this.form.name){
				const {...post} = this.form;
				this.$store.dispatch("addPosts", post);
				this.form.name = this.form.typeId = '';
			} else {
				this.form.name = this.form.typeId = '';
			}
		}
	}
}
</script>

<style lang="scss" scoped>
input{
	width:100%;
	margin-bottom: 5px;
}
</style>
