import { PostService } from "@/services/PostService";
import { NotificationHelper } from "@/helper/NotificationHelper";
import store from "..";
import router from "@/router";

// initial state
const state = () => ({
    postList: {
        posts: [],
        isLoading: false,
        post: null,
        totalPages:0,
        page: 1,
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
}

// actions
const actions = {
    getAllPosts: async function ({ commit },payload) {
        try {
            commit("SET_LOADING", true);
            let response = await PostService.getAllPosts(payload);
            commit("SET_POSTS",  { posts: response.data.data.docs,totalPages:response.data.data.totalPages });
            commit("SET_LOADING", false);
        }catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    getAllPostsOfCategory: async function ({ commit },payload) {
        try {
            commit("SET_LOADING", true);
            let response = await PostService.getAllPostsOfCategory(payload.id,payload.page);
            commit("SET_POSTS", { posts: response.data.data.docs,totalPages:response.data.data.totalPages });
            commit("SET_LOADING", false);
        }catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    getAllPostsOfUser: async function ({ commit },payload) {
        try {
            commit("SET_LOADING", true);
            let response = await PostService.getAllPostsOfUser(payload.id,payload.page);
            console.log(response)
            commit("SET_POSTS", { posts: response.data.data.docs,totalPages:response.data.data.totalPages });
            commit("SET_LOADING", false);
        }catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    deletePost: async function ({ commit },id) {
        try {
            commit("SET_LOADING", true);
            await PostService.deletePost(id);    
            NotificationHelper.notificationhandler('Post deleted successfully!')
            store.dispatch("getAllPosts")     
            commit("SET_LOADING", false);
        }catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    updatePost: async function ({ commit },post) {
        try {
            commit("SET_LOADING", true);
            await PostService.updatePost(post, post._id);
            NotificationHelper.notificationhandler("Post updated successfully!")
            store.dispatch("getAllPosts")    
            commit("SET_LOADING", false);
        }catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    getPost: async function ({ commit },id) {
        try {
            commit("SET_LOADING", true);
            let response = await PostService.getPost(id);
            console.log(response)
            commit("SET_POST", { post: response.data.data});
            commit("SET_LOADING", false);
        }catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    createPost:async function({commit},post){
        try {
            commit("SET_LOADING", true);
            await PostService.createPost(post);
            NotificationHelper.notificationhandler("Post updated successfully!")
            store.dispatch("getAllPosts")    
            commit("SET_LOADING", false);
            return router.push("/");
        }catch (error) {
            NotificationHelper.errorhandler(error)
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