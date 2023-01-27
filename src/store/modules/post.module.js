import { PostService } from "@/services/PostService";
import store from "..";
import router from "@/router";

// initial state
const state = () => ({
    postList: {
        posts: [],
        errorMessage: "",
        isLoading: false,
        post: null,
        totalPages:0,
        page: 1,
        category:'',
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
        state.postList.totalPages = payload.totalPages;
    },
    SET_POST: function (state, payload) {
        state.postList.post = payload.post;
    },
    SET_ERROR: function (state, payload) {
        state.postList.errorMessage = payload.error;
    },
    INCREMENT_PAGE: function(state){
        state.postList.page =state.postList.page+ 1;
    },
    DECREMENT_PAGE: function(state){
        state.postList.page =state.postList.page- 1;
    }
}

// actions
const actions = {
    getAllPosts: async function ({ commit },payload) {
        try {
            commit("SET_LOADING", true);
            let response = await PostService.getAllPosts(payload);
            console.log("post---",response)
            commit("SET_POSTS",  { posts: response.data.data.docs,totalPages:response.data.data.totalPages });
            commit("SET_LOADING", false);
        } catch (error) {
            commit("SET_ERROR", { error: error });
            commit("SET_LOADING", false);
        }
    },
    getAllPostsOfCategory: async function ({ commit },payload) {
        try {
            commit("SET_LOADING", true);
            let response = await PostService.getAllPostsOfCategory(payload.id,payload.page);
            console.log("post---",response)
            commit("SET_POSTS", { posts: response.data.data.docs,totalPages:response.data.data.totalPages });
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
            return router.push("/");
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
    createPost:async function({commit},post){
        try {
            commit("SET_LOADING", true);
            let response = await PostService.createPost(post);
            console.log(response)
            commit("SET_LOADING", false);
            return router.push("/");
        } catch (error) {
            commit("SET_ERROR", { error: error });
            commit("SET_LOADING", false);
        }
    },
    incrementPage:async function({commit}){
        return commit("INCREMENT_PAGE")
    },
    decrementPage:async function({commit}){
        return commit("DECREMENT_PAGE")
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}