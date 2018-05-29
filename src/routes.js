import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './containers/home/home';
import Admin from './containers/admin/admin';
import Jurado from './containers/jurado/jurado';
import Votante from './containers/votante/votante';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route  path ="/votante" component={Votante} />
                <Route  path ="/jurado" component={Jurado} />
                <Route  path ="/admin" component={Admin} />
                <Route exact path ="/" component={Home} />
            </Switch>
        </BrowserRouter>
    )
}