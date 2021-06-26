import React from 'react';
import { BrowserRouter , Route ,Switch } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Intro from './components/intro/Intro';
import Profile from './components/profile/Profile';
import TrackVaccine from './components/vaccine/TrackVaccine';
import ChangeDate from './components/changedate/ChangeDate';
import Admin from './components/admin/AdminLogin';
import AdminPortal from './components/admin/AdminPortal';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/change-date" exact component={ChangeDate} />
        <Route path="/track-vaccine" exact component={TrackVaccine} />
        <Route path="/adM1n-portal" exact component={AdminPortal} />
        <Route path="/adM1n" exact component={Admin} />
        <Route path="/" exact component={Intro} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
