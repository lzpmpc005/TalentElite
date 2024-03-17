import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './layout/header';
import Footer from './layout/footer';
import HabitatAPI from './api/HabitatAPI';
import AnimalApi from './api/AnimalApi';
import ZookeeperApi from './api/Zookeeper.js';
import CarelogApi from './api/CarelogApi.js';
import TourApi from './api/TourApi.js';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/habitats" component={HabitatAPI} />
                    <Route exact path="/animals" component={AnimalApi} />
                    <Route exact path="/zookeepers" component={ZookeeperApi} />
                    <Route exact path="/carelogs" component={CarelogApi} />
                    <Route exact path="/tours" component={TourApi} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

