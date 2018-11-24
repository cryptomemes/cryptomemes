import React from 'react';
import { Provider } from 'mobx-react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import RootStore from './stores/';
import MemePage from './pages/Memes/';

const store = new RootStore();
window.store = store;

const App = () => (
    <Provider {...store}>
        <Router>
            <Route path="/" component={MemePage} />
        </Router>
    </Provider>
);

export default App;
