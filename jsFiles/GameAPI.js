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
		if(stateObj.moveAllowed){			
			stateObj.userSelectedBox.push(boxId);
			if(stateObj.randomNums.indexOf(boxId) > -1){
				e.target.style.backgroundColor='blue';
			}else{
				e.target.style.backgroundColor='red';
			}
		}else{
			stateObj.resultBox.moveWarning = showElementClass;
		}
		this.setState(stateObj);
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
			stateObj.randomNums = [];
			stateObj.randomNums = Generic.getRandomArray(this.state.currentDifficultyLevel);
			
			this.setRandomColors(this.state.gameColor);
			
			stateObj.resultBox.waitMsg = showElementClass;
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
				it.next();
			},10000);
		}
		
		function saveOperation(){
			let stateObj = this.state;
			stateObj.moveAllowed = false;
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
		let gameResult = [];
		for(let i=0; i<stateObj.overAllGameResults.length; i++){
			
			let gameStats = stateObj.overAllGameResults[i]; 
			console.log(gameStats);
			if(gameStats.userBoxes.length > stateObj.foulLevel){
				gameResult.push(`Disqualified in game ${i+1} because total number of attempts is greater than ${stateObj.foulLevel}`);
			}else{
				let correctAttempts = gameStats.userBoxes.filter(function(obj) { return gameStats.actualBoxes.indexOf(obj) > -1; });
				console.log(correctAttempts,"correctAttempts");
				gameResult.push(`${correctAttempts.length} out of ${gameStats.actualBoxes.length} are correct attempts`);
			}
		}
		stateObj.finalResult = gameResult.join('--');
		this.setState(stateObj);
	},
	
	setDiffLevel(e){
		let stateObj = this.state;
		let newDiffLevel = e.target.value;
		stateObj.currentDifficultyLevel = newDiffLevel;
		stateObj.foulLevel = parseInt(stateObj.currentDifficultyLevel)+2;
		this.setState(stateObj);
	},
	getDiffLevel(){
		return this.state.difficultyLevels[this.state.currentDifficultyLevel];
	}
};