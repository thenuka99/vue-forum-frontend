import  axios  from "axios";
import store from "../store/index";


axios.interceptors.request.use(req => {
        var accessToken = store.getters.getUserState.token;
        req.headers.Authorization = `Bearer ${accessToken}`;
    console.log('INTERCEPTED');
    return req;
},
(error) => {
  return Promise.reject(error);
});

export class PostService{
    static serverURL = 'http://localhost:5000';

   
    static getAllPosts(page){
        let dataURL = `${this.serverURL}/posts?page=${page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getAllPostsOfCategory(id,page){
        let dataURL = `${this.serverURL}/posts/category/${id}?page=${page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getPost(id){
        let dataURL = `${this.serverURL}/posts/${id}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static createPost(contact){
        let dataURL = `${this.serverURL}/posts/`;
        return axios.post(dataURL,contact,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static updatePost(contact,contactID){
        let dataURL = `${this.serverURL}/posts/${contactID}`;
        return axios.put(dataURL,contact,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static deletePost(contactID){
        let dataURL = `${this.serverURL}/posts/${contactID}`;
        return axios.delete(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
}