import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './containers/home/home';
import Admin from './containers/admin/admin';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                {/* <Route exact path ="/app" component={WebApp} /> */}
                <Route  path ="/admin" component={Admin} />
                <Route exact path ="/" component={Home} />
            </Switch>
        </BrowserRouter>
    )
}