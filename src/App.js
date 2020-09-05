import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Login from './components/Login'
import Home from './components/Home'
import { Redirect, Route ,Router,Switch} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Switch>
            <Route exact path="/" component={()=><Login/>}/>
            <Route exact path="/home" component={()=><Home/>}/>
            <Route exact path="/file" component={()=><FileUpload/>}/>
            <Redirect to="/"/>
          </Switch>
      </header>
    </div>
  );
}

export default App;
