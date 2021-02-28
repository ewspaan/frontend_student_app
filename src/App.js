import './App.css';
import React from 'react';
import Routes from "./routes/Routes";
import { Route } from 'react-router-dom';
import RoommateAddPage from "./pages/RoommateAddPage";





function App() {

    return (

        <>
          <Routes/>
          <Route path="/huisgenoot/signup/:firstName/:lastName/:email/:houseId" component={RoommateAddPage}/>
        </>
  );
}

export default App;
