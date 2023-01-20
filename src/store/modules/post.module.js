import { PostService } from "@/services/PostService";
import store from "..";

// initial state
const state = () => ({
    postList: {
        posts: [],
        errorMessage: "",
        isLoading: false,
        post: null,
    },
})

// getters
const getters = {
    getPostState: function (state) {
        return state.postList;
    }
}

// mutations
const mutations = {
    SET_LOADING: function (state, payload) {
        state.postList.isLoading = payload;
    },
    SET_POSTS: function (state, payload) {
        state.postList.posts = payload.posts;
    },
    SET_POST: function (state, payload) {
        state.postList.post = payload.post;
    },
    SET_ERROR: function (state, payload) {
        state.postList.errorMessage = payload.error;
    },
}

// actions
const actions = {
    getAllPosts: async function ({ commit }) {
        try {
            commit("SET_LOADING", true);
            let response = await PostService.getAllPosts();
            console.log(response)
            commit("SET_POSTS", { posts: response.data.data });
            commit("SET_LOADING", false);
        } catch (error) {
            commit("SET_ERROR", { error: error });
            commit("SET_LOADING", false);
        }
    },
    deletePost: async function ({ commit }, id) {
        try {
            let response = await PostService.deletePost(id);
            console.log(response)
        } catch (error) {
            console.log(error)
            commit("SET_ERROR", { error: error })
        }
    },
    updatePost: async function ({ commit }, post) {
        try {
            let response = await PostService.updatePost(post, post.id);
            store.dispatch(this.getAllPosts)
            console.log(response)
        } catch (error) {
            console.log(error)
            commit("SET_ERROR", { error: error })
        }
    },
    getPost: async function ({ commit },id) {
        try {
            commit("SET_LOADING", true);
            let response = await PostService.getPost(id);
            console.log(response)
            commit("SET_POST", { category: response.data });
            commit("SET_LOADING", false);
        } catch (error) {
            commit("SET_ERROR", { error: error });
            commit("SET_LOADING", false);
        }
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}