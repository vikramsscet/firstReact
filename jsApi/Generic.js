export let Generic = {
	
	alertMsg(msg="hello from generic api"){
		alert(msg);
	},
	consoleMsg(msg="logging from generic api"){
		console.log(msg);
	},
	addUser(){
		let uName = document.getElementsByName('uname')[0].value;
		let passwrd = document.getElementsByName('passwrd')[0].value;
		let desig = document.getElementsByName('desig')[0].value;
		console.log(uName, passwrd, desig);
		let stateObj = this.state;
		if(uName && passwrd && desig){
			stateObj.user.push({
				id : stateObj.user.length + 1,
				userName : uName,
				password : passwrd,
				desig : desig
			});
			stateObj.error = "";
			stateObj.successMsg = `User ${uName} added successfully...`;
			this.setState(stateObj);
			document.getElementsByName('uname')[0].value = "";
			document.getElementsByName('passwrd')[0].value = "";
			document.getElementsByName('desig')[0].value = "";
			setTimeout(() => {stateObj.successMsg="";this.setState(stateObj);},3000);
		}else{
			stateObj.error = "Please enter valid details...";
			this.setState(stateObj);
		}
		console.log(stateObj);
	},
	loginHandler(){
		let uName = document.getElementsByName('uname')[0].value;
		let passwrd = document.getElementsByName('passwrd')[0].value;
		let stateObj = this.state;
		console.log(uName, passwrd);
		let findUser = function(userObj, index){
			return userObj.userName === uName && userObj.password === passwrd;
		};
		
		if(uName && passwrd){
			let userDetail = stateObj.user.find(findUser);
			console.log(userDetail);
			if(userDetail){
				stateObj.error = "";
				this.setState(stateObj);
				Generic.clearFields('uname','passwrd');
			}else{
				stateObj.error = "UserName or Password is incorrect...";
				this.setState(stateObj);
			}
		}else{
			stateObj.error = "Please enter valid details...";
			this.setState(stateObj);
		}
	},
	clearFields(...fields){
		fields.forEach((field) => {
			document.getElementsByName(field)[0].value = '';
		});
	},
	getAsyncData(url){
		
		return new Promise((resolve,reject)=>{
			
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", url, true);
			xhttp.setRequestHeader("Content-type", "application/json");
			console.log("+++++",url);
			xhttp.onreadystatechange = function(){
				console.log(xhttp);
				if (xhttp.readyState === 4 && (xhttp.status === 200 || xhttp.status  === 304)){
					resolve(JSON.parse(xhttp.response));
				}
				if(xhttp.readyState === 4 && xhttp.status === 404){
					reject(xhttp.statusText)
				}
			}
			xhttp.onerror = () => reject(xhttp.statusText);
			xhttp.send();
		});
	}
	
};

//export Generic;