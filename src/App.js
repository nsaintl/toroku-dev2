import React  from 'react';
import './App.css';
import "./styles/pages.css";
import "./styles/components.css";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Universe from "./pages/Universe";
import Studio from "./pages/Studio";
import Tag from "./pages/Tag";
import Episode from "./pages/Episode";
import Media from "./pages/Media";
import Staff from "./pages/Staff";
import Character from "./pages/Character";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/universe' element={<Universe/>}/>
                    <Route path='/tag' element={<Tag/>}/>
                    <Route path='/studio' element={<Studio/>}/>
                    <Route path='/episode' element={<Episode/>}/>
                    <Route path='/media' element={<Media/>}/>
                    <Route path='/character' element={<Character/>}/>
                    <Route path='/staff' element={<Staff/>}/>
                    {/*<Route path='/' element={<Home />} />
                    <Route path='/universe' element={<Universe />} />
                    <Route path='/tag' element={<Tag />} />
                    <Route path='/studio' element={<Studio />} />
                    <Route path='/episode' element={<Episode />} />
                    <Route path='/staff' element={<Staff />} />
                    <Route path='/media' element={<Media />} />
                    <Route path='/character' element={<Character />} />
                    <Route path='/theme' element={<Theme />} />
                    <Route path='/voice-actor' element={<VoiceActor />} />*/}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
