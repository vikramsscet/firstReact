import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {render} from 'react-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import {Generic} from '../jsApi/Generic';

class App extends Component {
	constructor(){
		super();
		this.state = {
			error : "",
			successMsg : "",
			user : [
				{
					id:1,
					userName : "admin",
					password : "admin",
					desig : "admin"
				}
			]
		};
		this.addUser = Generic.addUser.bind(this);
		this.loginHandler = Generic.loginHandler.bind(this);
	};
	
	render() {
		
      return (
         <Router>
            <div>
               <h2>Welcome to React Router Tutorial</h2>
               <ul>
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
				  <li><Link to={'/Register'}>Register</Link></li>
               </ul>
               <hr />
               
               <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/Login'>
					<Login error={this.state.error} loginHandler={this.loginHandler} />
				  </Route>
				  <Route exact path='/Register'>
					<Register error={this.state.error} successMsg={this.state.successMsg} userHandler={this.addUser}/>
				  </Route>
               </Switch>
            </div>
         </Router>
      );
   }
}

export default App;