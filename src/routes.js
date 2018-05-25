import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './containers/home/home';
import Admin from './containers/admin/admin';
import Jurado from './containers/jurado/jurado';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route  path ="/jurado" component={Jurado} />
                <Route  path ="/admin" component={Admin} />
                <Route exact path ="/" component={Home} />
            </Switch>
        </BrowserRouter>
    )
}