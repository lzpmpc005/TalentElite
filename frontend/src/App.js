import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Animal from './components/AnimalComponent';
import Habitat from "./components/Habitat";
import ZookeeperComponent from "./components/Zookeeper";
import CarelogComponent from "./components/Carelog";
import Member from "./components/Member";
import MemberComponent from "./components/Member";
import ActivityComponent from "./components/Activity";
import TourScheduleComponent from "./components/tour_schedules";
import HabitatStatusComponent from "./components/HabitatStatusComponent";
import Homepage from "./components/Homepage";
import Animals_Homepage from "./components/Animals_Homepage";
import Habitats_homepage from "./components/Habitats_homepage";
import Activities_homepage from "./components/Activities_homepage";
function App() {
    return (
        <Router>
            <div>


                <Routes>
                    <Route path='/activities_homepage' element={<Activities_homepage/>}/>
                    <Route path='/homepage' element={<Homepage />}/>
                    <Route path='/habitats_homepage' element={<Habitats_homepage />}/>
                    <Route path='/animals_homepage' element={<Animals_Homepage />}/>
                    <Route path="/animals" element={<Animal />} />
                    <Route path='/habitats' element ={<Habitat/>}/>
                    <Route path='/zookeepers' element={<ZookeeperComponent/>}/>
                    <Route path='/carelogs' element={<CarelogComponent/>}/>
                    <Route path='/members' element={<MemberComponent/>}/>
                    <Route path='/activities' element={<ActivityComponent/>}/>
                    <Route path='/tour_schedules' element={<TourScheduleComponent/>}/>
                    <Route path='/habitat_status' element={<HabitatStatusComponent/>}/>
                </Routes>

            </div>
        </Router>
    );
}

export default App;

