import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {render} from 'react-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import {Generic} from '../jsApi/Generic';
import Footer from '../jsxFiles/footer.jsx';
import Header from '../jsxFiles/Header.jsx'
import Content from '../jsxFiles/Content.jsx';

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
               <Header />
               <Switch>
                  <Route exact path='/' component={Home} />
				  <Route exact path='/Content'>
					<Content />
				  </Route>
                  <Route exact path='/Login'>
					<Login error={this.state.error} loginHandler={this.loginHandler} />
				  </Route>
				  <Route exact path='/Register'>
					<Register error={this.state.error} successMsg={this.state.successMsg} userHandler={this.addUser}/>
				  </Route>
               </Switch>
			   <Footer />
            </div>
         </Router>
      );
   }
}

export default App;