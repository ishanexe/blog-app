import './App.css';
import React from 'react';
// import Getnotes from './components/Getnotes';
import NoteState from "./context/Notestate";
// import Addnote from './components/Addnote';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';

// eslint-disable-next-line
// import Login from './components/Login';
// import Signup from './components/Signup'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>  {/* Wrap the entire app in Router */}
      <NoteState>
        <Navbar />
         {/* <Addnote />  */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/addnote" element={<Addnote />} /> */}
          </Routes>
        </div>
      </NoteState>
    </Router>  
  );
}

export default App;
