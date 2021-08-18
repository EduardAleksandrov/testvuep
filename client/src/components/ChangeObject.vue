<template>
	<form v-on:submit.prevent="onSubmit">
		<input type="text" v-model="form.name" placeholder="Name (если не заполнено, то изменено не будет)">
		<input type="text" v-model="form.typeId" placeholder="TypeId (если не заполнено, то изменено не будет)">
		<button type="submit">Изменить</button>
	</form>
</template>

<script>
import {mapGetters} from "vuex";

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
	computed:{
		...mapGetters(['allPosts']),
	},
	methods:{
		onSubmit() {
			if(this.form.name || this.form.typeId){
				const post = this.allPosts.find(c => c.id === this.num);
				let x = '';
				let y = '';
				if (this.form.name) {
					x = this.form.name;
				} else {
					x = post.name;
				}
				if (this.form.typeId) {
					y = this.form.typeId;
				} else {
					y = post.typeId;
				}
				const newPost = {id:this.num, name:x, typeId:y, done:false};
				this.$store.dispatch("changePosts", newPost);
			}
		}
	}

}
</script>

<style lang="scss" scoped>
input{
	width: 100%;
	margin-bottom: 5px;
}
</style>
