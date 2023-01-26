import { CategoryService } from "@/services/CategoryService";
import store from "..";

// initial state
const state = () => ({
    categoryList: {
        categories: [],
        errorMessage: "",
        isLoading: false,
        category: null,
    },
})

// getters
const getters = {
    getCategoryState: function (state) {
        return state.categoryList;
    }
}

// mutations
const mutations = {
    SET_LOADING: function (state, payload) {
        state.categoryList.isLoading = payload;
    },
    SET_CATEGORISE: function (state, payload) {
        state.categoryList.categories = payload.categories;
    },
    SET_CATEGORY: function (state, payload) {
        state.categoryList.category = payload.category;
    },
    SET_ERROR: function (state, payload) {
        state.categoryList.errorMessage = payload.error;
    },
}

// actions
const actions = {
    getAllCategories: async function ({ commit }) {
        try {
            commit("SET_LOADING", true);
            let response = await CategoryService.getAllCategories();
            console.log(response)
            commit("SET_CATEGORISE", { categories: response.data.data });
            commit("SET_LOADING", false);
        } catch (error) {
            commit("SET_ERROR", { error: error });
            commit("SET_LOADING", false);
        }
    },
    deleteCategory: async function ({ commit }, id) {
        try {
            let response = await CategoryService.deleteCategory(id);
            console.log(response)
        } catch (error) {
            console.log(error)
            commit("SET_ERROR", { error: error })
        }
    },
    updateCategory: async function ({ commit }, category) {
        try {
            let response = await CategoryService.updateCategory(category, category.id);
            store.dispatch(this.getAllCategories)
            console.log(response)
        } catch (error) {
            console.log(error)
            commit("SET_ERROR", { error: error })
        }
    },getCategory: async function ({ commit },id) {
        try {
            commit("SET_LOADING", true);
            let response = await CategoryService.getCategory(id);
            console.log(response)
            commit("SET_CATEGORY", { category: response.data });
            commit("SET_LOADING", false);
        } catch (error) {
            commit("SET_ERROR", { error: error });
            commit("SET_LOADING", false);
        }
    },
    createCategory:async function({commit},category){
        try {
            commit("SET_LOADING", true);
            let response = await CategoryService.createCategory(category);
            console.log(response)
            store.dispatch(this.getAllCategories)
            commit("SET_LOADING", false);
        } catch (error) {
            commit("SET_ERROR", { error: error });
            commit("SET_LOADING", false);
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}