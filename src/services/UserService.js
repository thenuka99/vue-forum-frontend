import  axios  from "axios";

export class UserService{
    static serverURL = 'http://localhost:5000';

    static getAllUsers(){
        let dataURL = `${this.serverURL}/users`;
        return axios.get(dataURL);
    }
    static getUser(userId){
        let dataURL = `${this.serverURL}/users/${userId}`;
        return axios.get(dataURL);
    }
    static updateUser(user,userId){
        let dataURL = `${this.serverURL}/users/${userId}`;
        return axios.put(dataURL,user);
    }
    static deleteUser(userId){
        let dataURL = `${this.serverURL}/users/${userId}`;
        return axios.delete(dataURL);
    }
}