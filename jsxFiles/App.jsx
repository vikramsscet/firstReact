import React from 'react';

import Header from './Header.jsx';
import Content from './Content.jsx';
import TableData from './TableData.jsx';

class App extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			header : "Header from state",
			error : "",
			myStyle : {
				fontSize: 30,
				color: '#FF0000',
				border: 1
			},
			tableData : [
				{
					id : 1,
					name : "vikram",
					designation : "Consultant"
				},
				{
					id : 2,
					name : "satish",
					designation : "SSE"
				},
				{
					id : 3,
					name : "Sandeep",
					designation : "Senior Software Engineer"
				},
				{
					id : 4,
					name : "Rohit",
					designation : "Senior Software Engineer"
				}
			]
		};
		this.addEmp = this.addEmp.bind(this);
	};
	addEmp(){
		var obj = this.state;
		let name = document.getElementById('name').value;
		let desig = document.getElementById('designation').value;
		if(name && name !== '' && desig && desig !== ''){
			let emp = {
				id : this.state.tableData.length + 1,
				name : name,
				designation : desig
			};
			obj.tableData.push(emp);
			obj.error = "";
			this.setState(obj);
		}else{
			obj.error = "Enter valid Name OR Designation...";
			this.setState(obj);
		}
		
	};
   render() {
      return (
		<div>
			<Header headerProps={this.state.header}/> 
			<Content error={this.state.error} addEmpl={this.addEmp} style={this.state.myStyle}/>
			<table style={this.state.myStyle}>
			<tbody>
				{this.state.tableData.map((obj, i) => <TableData key={i} tData={obj}/>)}
			</tbody>
			</table>
		</div>
      );
   };
};

export default App;