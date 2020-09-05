import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Login from './components/Login'
import Home from './components/Home'
import { Redirect, Route ,Router,Switch} from 'react-router-dom';
import HomeProtect from './Protected/HomeProtect';
import FileProtect from './Protected/FileProtect';
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Switch>
            <Route exact path="/" component={()=><Login/>}/>
            <Route exact path="/home" component={()=><HomeProtect/>}/>
            <Route exact path="/file" component={()=><FileProtect/>}/>
            <Redirect to="/"/>
          </Switch>
      </header>
    </div>
  );
}

export default App;
