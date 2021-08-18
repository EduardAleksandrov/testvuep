import request from '@/lib/wp';
export default {
	actions: {
		async fetchPosts(ctx) {
			const posts = await request('http://127.0.0.1:80/api/things');
			ctx.commit('updatePosts', posts)
		}
	},
	mutations: {
		updatePosts(state, posts){
			state.posts = posts
		}
	},
	state: {
		posts:[]
	},
	getters: {
		allPosts(state) {
			return state.posts
		}
	}
}









