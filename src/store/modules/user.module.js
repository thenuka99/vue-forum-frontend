import { AuthService } from "@/services/AuthService";
import { UserService } from "@/services/UserService";
import store from "..";

// initial state
const state = () => ({
    userList: {
        users: [],
        errorMessage: "",
        isLoading: false,
        user: null,
        otherUser: null,
        token: "",
    },
})

// getters
const getters = {
    getUserState: function (state) {
        return state.userList;
    }
}

// mutations
const mutations = {
    SET_LOADING: function (state, payload) {
        state.userList.isLoading = payload;
    },
    SET_USERS: function (state, payload) {
        state.userList.users = payload.users;
    },
    SET_LOGGED_USER: function (state, payload) {
        state.userList.user = payload.user;
    },
    SET_OTHER_USER: function (state, payload) {
        state.userList.user = payload.otherUser;
    },
    SET_ERROR: function (state, payload) {
        state.userList.errorMessage = payload.error;
    },
    SET_TOKEN: function (state, payload) {
        state.userList.token = payload.token;
    },
}

// actions
const actions = {
    getUsers: async function ({ commit }) {
        try {
            commit("SET_LOADING", true);
            let response = await UserService.getAllUsers();
            console.log(response)
            commit("SET_USERS", { users: response.data });
            commit("SET_LOADING", false);
        } catch (error) {
            commit("SET_ERROR", { error: error });
            commit("SET_LOADING", false);
        }
    },
    deleteUser: async function ({ commit }, id) {
        try {
            let response = await UserService.deleteUser(id);
            console.log(response)
            store.dispatch(this.logout)
        } catch (error) {
            console.log(error)
            commit("SET_ERROR", { error: error })
        }
    },
    updateUser: async function ({ commit }, user) {
        try {
            let response = await UserService.updateuser(user, user.id);
            store.dispatch(this.getUsers)
            console.log(response)
        } catch (error) {
            console.log(error)
            commit("SET_ERROR", { error: error })
        }
    },
    signup: async function ({ commit }, user) {
        try {
            let response = await AuthService.signup(user);
            console.log(response)
            store.dispatch('login', {
                user:user
              })
        } catch (error) {
            console.log(error)
            commit("SET_ERROR", { error: error })
        }
    },
    login: async function ({ commit }, user) {
        try {
            let response = await AuthService.login(user);
            commit("SET_TOKEN", { token: response.data.data })
            store.dispatch('getUser',{ token:response.data.data})
        } catch (error) {
            console.log(error)
            commit("SET_ERROR", { error: error })
        }
    },
    logout: async function ({ commit }) {
        commit("SET_LOGGED_USER", { contact: null });
    },
    getUser: async function({commit},token){
        try {
            let response = await AuthService.getUserDetails(token);
            console.log("user----", response.data)
            commit("SET_LOGGED_USER", { user: response.data.data })
        } catch (error) {
            console.log(error)
            commit("SET_ERROR", { error: error })
        }
    }, 
}

export default {
    state,
    getters,
    actions,
    mutations
}