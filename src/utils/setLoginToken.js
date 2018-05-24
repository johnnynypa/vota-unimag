import axios from 'axios';

export default function setLoginToken(token){
    if(axios){
        axios.defaults.headers.common['Login'] = 'Bearer ' + token;
    }else{
        delete axios.defaults.headers.common['Login'];
    }
}
