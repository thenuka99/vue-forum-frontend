import { AuthService } from "@/services/AuthService";
import { UserService } from "@/services/UserService";
import { NotificationHelper } from "@/helper/NotificationHelper";
import store from "..";
import router from "@/router";

// initial state
const state = () => ({
    userList: {
        users: [],
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
            commit("SET_USERS", { users: response.data.data });
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },
    deleteUser: async function ({ commit },id) {
        try {            
            commit("SET_LOADING", true);
            await UserService.deleteUser(id);
            NotificationHelper.notificationhandler("User deleted successfully!")            
            commit("SET_LOADING", false);
            store.dispatch(this.logout)
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },
    updateUser: async function ({ commit },user) {
        try {
            commit("SET_LOADING", true);
            await UserService.updateUser(user, user._id);   
            let response = await UserService.getUser(user._id);            
            commit("SET_LOGGED_USER", { user: response.data.data })
            NotificationHelper.notificationhandler("User updated successfully!")
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },
    updateUserRole: async function ({ commit },user) {
        try {
            commit("SET_LOADING", true);
            await UserService.updateUser(user, user._id);   
            store.dispatch('getUsers')
            NotificationHelper.notificationhandler("UserRole change successfully!")
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },
    signup: async function ({ commit },user) {
        try {
            commit("SET_LOADING", true);
            await AuthService.signup(user);
            NotificationHelper.notificationhandler("User registered successfully!")
            commit("SET_LOADING", false);
            return router.push("/signin");
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },
    login: async function ({ commit }, user) {
        try {
            let response = await AuthService.login(user);
            commit("SET_TOKEN", { token: response.data.data })
            store.dispatch('getUser', { token: response.data.data })     
        } catch (error) {
            this.errorhandler(error)
        }
    },
    logout: async function ({ commit }) {
        commit("SET_LOGGED_USER", { contact: null });
    },
    getUser: async function ({ commit }, token) {
        try {
            let response = await AuthService.getUserDetails(token);
            commit("SET_LOGGED_USER", { user: response.data.data })
            NotificationHelper.notificationhandler("Successfully login in!")                   
            return router.push("/");
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },
    
}

export default {
    state,
    getters,
    actions,
    mutations
}