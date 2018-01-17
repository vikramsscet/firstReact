import {Generic} from '../jsApi/Generic';
import lodash from 'lodash';
import 'babel-polyfill';
const showElementClass = {};
const hideElementClass = {'display':'none'};
const eachGameWaitSecs = 10;
 
export let GameApi = {
	resetTimer(){
		let stateObj = this.state;
		stateObj.timeCounter = eachGameWaitSecs;
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
		let boxId = parseInt(e.target.id);
		let stateObj = this.state;
		console.log(typeof stateObj.randomNums, Array.isArray(stateObj.randomNums));
		if(stateObj.moveAllowed){
			stateObj.attemptCount++;
			if(this.state.attemptCount >= 7){
				stateObj.resultBox.attemptWarning = showElementClass;
			}else{
				stateObj.userSelectedBox.push(boxId);
				if(stateObj.randomNums.indexOf(boxId) > -1){
					e.target.style.backgroundColor='blue';
				}else{
					e.target.style.backgroundColor='red';
				}
			}
			this.setState(stateObj);
		}else{
			stateObj.resultBox.moveWarning = showElementClass;
		}
	},
	
	handleClick(counter){
		let stateObj = this.state;
		stateObj.res = stateObj.res+counter;
		this.setState(stateObj);
	},
	
	setRandomColors(color,all=false){
		
		if(all){
			//Paints all boxes to white...
			for(let i=0; i<25; i++){
				Generic.changeBackgroundColor(i, color);
			}	
		}else{
			for(let i=0; i<this.state.randomNums.length; i++){
				Generic.changeBackgroundColor(this.state.randomNums[i], color);
			}
		}
	},
	clearMsgArea(){
		let stateObj = this.state;
		stateObj.resultBox.waitMsg = hideElementClass;
		stateObj.resultBox.startMsg = hideElementClass;
		stateObj.resultBox.resultMsg = hideElementClass;
		stateObj.resultBox.attemptWarning = hideElementClass;
		stateObj.resultBox.moveWarning = hideElementClass;
		stateObj.resultBox.timerClass = hideElementClass;
		this.setState(stateObj);
	},
	simulateBoxGame(){
		
		let stateObj = this.state;
		stateObj.attemptCount=0;
		stateObj.isGameRunning = true;
		this.setState(stateObj);
		var counter=1;
		function* gameStart(){
			while(this.state.isGameRunning){
				this.setRandomColors(this.state.neutralColor,true);
				this.clearMsgArea();
				yield showBlueBox.call(this);
				this.clearMsgArea();
				yield showWhiteBox.call(this);
				yield saveOperation.call(this);
				if(counter==5){
					this.stopGame();
				}
				counter++;
			}
		}
		function showBlueBox(){
			let stateObj = this.state;
			stateObj.attemptCount = 0;
			stateObj.randomNums = [];
			stateObj.randomNums = Generic.getRandomArray(this.state.currentDifficultyLevel);
			
			this.setRandomColors(this.state.gameColor);
			
			stateObj.resultBox.waitMsg = showElementClass;
			stateObj.moveAllowed = false;
			this.setState(stateObj);
			setTimeout(()=>{
				this.resetTimer();
				it.next();
			},2000);
		}
		function showWhiteBox(){
			let stateObj = this.state;
			this.setRandomColors(this.state.neutralColor);
			stateObj.resultBox.startMsg = showElementClass;
			stateObj.resultBox.timerClass = showElementClass;
			stateObj.moveAllowed = true;
			this.setState(stateObj);
			this.showRemainingTime();
			setTimeout(()=>{
				console.log("from whiteBox after 5 sec",counter);
				it.next();
			},10000);
		}
		
		function saveOperation(){
			let stateObj = this.state;
			
			stateObj.overAllGameResults.push({
				'actualBoxes':stateObj.randomNums,
				'userBoxes':stateObj.userSelectedBox
			});
			stateObj.userSelectedBox = [];
			this.setState(stateObj);
			setTimeout(()=>{
				console.log(this.state);
				console.log("saving operation....",counter);
				it.next();
			},2000);
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