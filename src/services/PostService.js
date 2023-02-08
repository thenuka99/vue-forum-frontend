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
    static getAllPostsOfUser(id,page){
        let dataURL = `${this.serverURL}/posts/user/${id}?page=${page}`;
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
    static createPost(post){
        let dataURL = `${this.serverURL}/posts/`;
        return axios.post(dataURL,post,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static updatePost(post,postId){
        let dataURL = `${this.serverURL}/posts/${postId}`;
        return axios.put(dataURL,post,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static deletePost(postId){
        let dataURL = `${this.serverURL}/posts/${postId}`;
        return axios.delete(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static addComment(data){
        let dataURL = `${this.serverURL}/posts/comment`;
        return axios.patch(dataURL,data,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static removeComment(data){
        let dataURL = `${this.serverURL}/posts/comment/remove`;
        return axios.put(dataURL,data,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static editComment(data){
        let dataURL = `${this.serverURL}/posts/comment/update`;
        return axios.patch(dataURL,data,{headers: {
            'Content-Type': 'application/json'
        }});
    }
}