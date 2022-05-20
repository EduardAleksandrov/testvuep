import request from '@/lib/wp';
export default {
	actions: {
		async fetchPosts(ctx) {
			const posts = await request('http://127.0.0.1:8080/api/things');
			ctx.commit('updatePosts', posts);
		},
		async addPosts(ctx, post) {
			const p = await request('http://127.0.0.1:8080/api/things', 'POST', post);
			//ctx.commit('addPosts', p);
			await ctx.dispatch("fetchPosts");
		},
		async changePosts(ctx, post) {
			const s = await request(`http://127.0.0.1:8080/api/things/${post.id}`, 'PUT', post);
			await ctx.dispatch("fetchPosts");
		},
	},
	mutations: {
		updatePosts(state, posts){
			state.posts = posts;
		},
		// addPosts(state, post) {
		// 	state.posts.push(post);
		// }
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









