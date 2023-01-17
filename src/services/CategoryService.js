import { axios } from "axios";

export class CategoryService{
    static serverURL = 'http://localhost:5000';

    static getAllCategories(){
        let dataURL = `${this.serverURL}/categories`;
        return axios.get(dataURL);
    }
    static getCategory(contactID){
        let dataURL = `${this.serverURL}/categories/${contactID}`;
        return axios.get(dataURL);
    }
    static createCategory(contact){
        let dataURL = `${this.serverURL}/categories/`;
        return axios.post(dataURL,contact);
    }
    static updateCategory(contact,contactID){
        let dataURL = `${this.serverURL}/categories/${contactID}`;
        return axios.put(dataURL,contact);
    }
    static deleteCategory(contactID){
        let dataURL = `${this.serverURL}/categories/${contactID}`;
        return axios.delete(dataURL);
    }
}