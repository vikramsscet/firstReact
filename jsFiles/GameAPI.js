import {Generic} from '../jsApi/Generic';
import lodash from 'lodash';
import 'babel-polyfill';
const showElementClass = {};
const hideElementClass = {'display':'none'};
export let GameApi = {
	resetTimer(){
		let stateObj = this.state;
		stateObj.timeCounter = 5;
		this.setState(stateObj);
	},
	showRemainingTime(){
		let stateObj = this.state;
		let tObj = setInterval(()=>{
			if(stateObj.timeCounter === 0){
				this.resetTimer();
				clearInterval(tObj);
			}else{
				stateObj.timeCounter--;
				this.setState(stateObj);
			}
		},1000);
	},
	boxEvent(e){
		console.log("----clicking box----",e.target.id,this.state);
		let stateObj = this.state;
		
		if(stateObj.moveAllowed){
			
		}else{
			stateObj.resultBox.moveWarning = showElementClass;
		}
		
		stateObj.attemptCount++;
		this.setState(stateObj);
		if(this.state.attemptCount === 7){
			stateObj.resultBox.attemptWarning = showElementClass;
			this.setState(stateObj);
		}
	},
	
	handleClick(counter){
		let stateObj = this.state;
		stateObj.res = stateObj.res+counter;
		this.setState(stateObj);
	},
	
	setRandomColors(color){
		for(let i=0; i<this.state.randomNums.length; i++){
			Generic.changeBackgroundColor(this.state.randomNums[i], color);
		}
	},
	simulateBoxGame(){
		if(this.state.randomNums.length > 0){
			GameApi.setRandomColors.call(this,this.state.neutralColor);
		}
		let stateObj = this.state;
		stateObj.isGameRunning = true;
		this.setState(stateObj);
		var counter=1;
		function* gameStart(){
			while(this.state.isGameRunning){
				yield showBlueBox.call(this);
				yield showWhiteBox.call(this);
				if(counter==5){
					this.stopGame();
				}
				counter++;
			}
		}
		function showBlueBox(){
			console.log("from blueBox after 2 sec",counter);
			let stateObj = this.state;
			stateObj.randomNums = [];
			stateObj.randomNums = Generic.getRandomArray(this.state.currentDifficultyLevel);
			
			this.setRandomColors(this.state.gameColor);
			
			stateObj.resultBox.waitMsg = showElementClass;
			stateObj.resultBox.startMsg = hideElementClass;
			stateObj.resultBox.moveWarning = hideElementClass;
			stateObj.moveAllowed = false;
			stateObj.resultBox.timerClass = hideElementClass;
			this.setState(stateObj);
			setTimeout(()=>{
				this.resetTimer();
				it.next();
			},2000);
		}
		function showWhiteBox(){
			let stateObj = this.state;
			this.setRandomColors(this.state.neutralColor);
			stateObj.resultBox.waitMsg = hideElementClass;
			stateObj.resultBox.startMsg = showElementClass;
			stateObj.resultBox.moveWarning = hideElementClass;
			stateObj.resultBox.timerClass = showElementClass;
			stateObj.moveAllowed = true;
			this.setState(stateObj);
			this.showRemainingTime();
			setTimeout(()=>{
				console.log("from whiteBox after 5 sec",counter);
				it.next();
			},5000);
		}
		var it = gameStart.call(this);
		it.next();
	},
	stopGame(){
		console.log("stopping game....");
		this.setRandomColors(this.state.neutralColor);
		let stateObj = this.state;
		stateObj.isGameRunning = false;
		stateObj.resultBox.startMsg = hideElementClass;
		stateObj.resultBox.resultMsg = showElementClass;
		stateObj.resultBox.attemptWarning = hideElementClass;
		stateObj.resultBox.timerClass = hideElementClass;
		this.setState(stateObj);
	},
	
	setDiffLevel(e){
		let stateObj = this.state;
		let newDiffLevel = e.target.value;
		stateObj.currentDifficultyLevel = newDiffLevel;
		this.setState(stateObj);
	},
	getDiffLevel(){
		return this.state.difficultyLevels[this.state.currentDifficultyLevel];
	}
};