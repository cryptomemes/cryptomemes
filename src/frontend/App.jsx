import React from 'react';
import { Provider } from 'mobx-react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import RootStore from './stores/';
import MemePage from './pages/Memes/';
import LandingPage from './pages/Landing/';

const store = new RootStore();
window.store = store;

const App = () => (
    <Provider {...store}>
        <Router>
            <div>
                <Route path="/" component={LandingPage} />
                <Route path="/memes" component={MemePage} />
            </div>
        </Router>
    </Provider>
);

export default App;
