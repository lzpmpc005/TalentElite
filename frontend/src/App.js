import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Animal from './components/AnimalComponent';
import Habitat from "./components/Habitat";
import ZookeeperComponent from "./components/Zookeeper";
import CarelogComponent from "./components/Carelog";
import Member from "./components/Member";
import MemberComponent from "./components/Member";
import ActivityComponent from "./components/Activity";
import ActivityParticipantComponent from "./components/AP";
import NavApp from './Header'
function App() {
    return (
        <Router>
            <div>
                <NavApp />

                <Routes>

                    <Route path="/animals" element={<Animal />} />
                    <Route path='/habitats' element ={<Habitat/>}/>
                    <Route path='/zookeepers' element={<ZookeeperComponent/>}/>
                    <Route path='/carelogs' element={<CarelogComponent/>}/>
                    <Route path='/members' element={<MemberComponent/>}/>
                    <Route path='/activities' element={<ActivityComponent/>}/>

                </Routes>

            </div>
        </Router>
    );
}

export default App;

