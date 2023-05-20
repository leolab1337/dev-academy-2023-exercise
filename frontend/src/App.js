import "leaflet/dist/leaflet.css";
import './App.css'
import {AppRouter} from "./components/router/AppRouter";
import React from "react";
import {Navbar} from "./components/widgets/Navbar";

function App() {

  return (
      <div className="App" id="container">
          <Navbar/>
          <AppRouter />
      </div>
  );
}

export default App;
