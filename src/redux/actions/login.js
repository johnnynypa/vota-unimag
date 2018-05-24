import axios from 'axios';
import setLoginToken from '../../utils/setLoginToken';
import  {LOGIN} from './types';
import config from '../../config/default.json';
import jwt from 'jsonwebtoken';

export const logout = () => {
    /*global localStorage */
    localStorage.removeItem(config.localStorageLogin);
    setLoginToken(false);
}

export const setCurrentUser =  (token) => {
    setLoginToken(token);
    localStorage.setItem(config.localStorageLogin, token);
    return {
        type: LOGIN,
        user: jwt.decode(token)
    }
}

export const loginStorage = () =>{
    return new Promise( (resolve, reject) => {
        const token = localStorage.getItem(config.localStorageLogin);
        if(token){
            resolve(true);
        }else{
            resolve(false);
        }
    });
}

/* @userData is a Object JSON, his fields are 'username' and 'password' */
export const loginRequest =  (userData) => {
    return new Promise((resolve) => {
        axios.post(config.api+'/login', userData, {crossDomain: true})
        .then(res =>{
            resolve({
                token: res.data,
                error: res.data.error
            });
        })
        .catch(err => {
            resolve({error: err});
        })
    })

}
