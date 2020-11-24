import React, { useEffect } from 'react';
import List from './views/list/index';
//
import { Provider } from 'react-redux';
import store from './store';
// import { getList } from './actions/listActions';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={List} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
