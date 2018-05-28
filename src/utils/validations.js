export const rolRoute = (user) => {
    return new Promise( (resolve, reject) => {
        if(user){
            switch (user.rolId){
                case 1:{
                    resolve('/votante');
                    break;
                }
                case 2:{
                    resolve('/admin');
                    break;
                }
                case 3:{
                    resolve('/jurado');
                    break;
                }
                default:{
                    resolve('/');
                    break;
                }
            }
        }else{
            return '/'
        }
    })
}
