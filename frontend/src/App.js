import "leaflet/dist/leaflet.css";
import './App.css'
import {AppRouter} from "./components/router/AppRouter";
import Navbar from "./components/widgets/Navbar/Navbar";
import React from "react";

function App() {

  return (
      <div className="App" id="container">
          <Navbar/>
          <AppRouter />
      </div>
  );
}

export default App;
