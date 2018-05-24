// eslint-disable-next-line
import React from 'react';
import Routes from './routes';

import { Provider } from 'react-redux';
import { initStore } from './redux/store'; 

const App = (
  <Provider store={initStore()}>
    <Routes />
  </Provider>
)

export default App