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

export class CategoryService{
    static serverURL = 'http://localhost:5000';

   
    static getAllCategories(){
        let dataURL = `${this.serverURL}/categories`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getCategory(contactID){
        let dataURL = `${this.serverURL}/categories/${contactID}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static createCategory(contact){
        let dataURL = `${this.serverURL}/categories/`;
        return axios.post(dataURL,contact,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static updateCategory(contact,contactID){
        let dataURL = `${this.serverURL}/categories/${contactID}`;
        return axios.put(dataURL,contact,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static deleteCategory(contactID){
        let dataURL = `${this.serverURL}/categories/${contactID}`;
        return axios.delete(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
}