import React from 'react';
import {Generic} from '../jsApi/Generic';
import lodash from 'lodash';
const showElementClass = {};
const hideElementClass = {'display':'none'};
class Content extends React.Component {
	constructor(){
		super();
		this.state = {
			res : 0,
			gameColor : 'blue',
			neutralColor : 'white',
			boxes:[],
			randomNums:[],
			currentDifficultyLevel:5,
			timerObj:'',
			time:7000,
			difficultyLevels : {
				5 : "Easy",
				7 : "Medium",
				9 : "Difficult"
			},
			gameCounter : 5,
			timeCounter : 5,
			resultBox:{
				waitMsg:hideElementClass,
				startMsg:hideElementClass,
				resultMsg:hideElementClass,
				attemptWarning:hideElementClass,
				moveWarning : hideElementClass,
				timerClass : hideElementClass
			},
			gameResults:[],
			attemptCount : 0,
			moveAllowed : false,
			commonMessages : {
				noMsg : "",
				waitMsg : "Wait & memorize boxes...",
				startMsg : "Start selecting box...",
				resultMsg : "Your Result...",
				attemptWarningMsg : "Your attempts are Over :( ",
				moveMsg : "Not allowed to make selection..."
			}
		}
		
		this.boxEvent = this.boxEvent.bind(this);
		this.addBoxes.call(this);
		this.handleClick = this.handleClick.bind(this);
		
		this.setDiffLevel = this.setDiffLevel.bind(this);
		this.getDiffLevel = this.getDiffLevel.bind(this);
		this.simulateBoxGame = this.simulateBoxGame.bind(this);
		this.stopGame = this.stopGame.bind(this);
		this.showRemainingTime = this.showRemainingTime.bind(this);
		this.resetTimer = this.resetTimer.bind(this);
		
	};
	
	showHide(){
		this.setRandomColors(this.state.gameColor);
		let stateObj = this.state;
		stateObj.resultBox.waitMsg = showElementClass;
		stateObj.resultBox.startMsg = hideElementClass;
		stateObj.resultBox.moveWarning = hideElementClass;
		stateObj.moveAllowed = false;
		this.setState(stateObj);
		
		setTimeout(()=>{
			this.setRandomColors(this.state.neutralColor);
			stateObj.resultBox.waitMsg = hideElementClass;
			stateObj.resultBox.startMsg = showElementClass;
			stateObj.resultBox.moveWarning = hideElementClass;
			stateObj.moveAllowed = true;
			this.setState(stateObj);
		},2000);
	};

	addBoxes(){
		let stateObj = this.state;
		for(let i=0; i<25; i++){
			stateObj.boxes.push(<GameBox boxEvent={this.boxEvent} key={i} id={i} />);
		}
		stateObj.randomNums = Generic.getRandomArray(5);
		this.setState(stateObj);
	};
	resetTimer(){
		let stateObj = this.state;
		stateObj.timeCounter = 5;
		this.setState(stateObj);
	};
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
	};
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
	};
	
	handleClick(counter){
		let stateObj = this.state;
		stateObj.res = stateObj.res+counter;
		this.setState(stateObj);
	};
	
	setRandomColors(color){
		for(let i=0; i<this.state.randomNums.length; i++){
			Generic.changeBackgroundColor(this.state.randomNums[i], color);
		}
	};
	simulateBoxGame(){
		let counter = 0;
		let time = this.state.time;
		
		function privateFun(){
			if(this.state.randomNums.length > 0){
				this.setRandomColors(this.state.neutralColor);
			}
			let stateObj = this.state;
			stateObj.randomNums = [];
			stateObj.randomNums = Generic.getRandomArray(this.state.currentDifficultyLevel);
			stateObj.timerObj = timerObj;
			this.setState(stateObj);
			
			this.showHide.call(this);
			counter++;
			if(this.state.gameCounter === counter){
				clearInterval(timerObj);
				setTimeout(()=>{
					console.log("Ending Game....");
					this.setRandomColors(this.state.neutralColor);
					//showing Result....
					stateObj.resultBox.startMsg = hideElementClass;
					stateObj.resultBox.resultMsg = showElementClass;
					this.setState(stateObj);
				},time);
			}
		}
		privateFun.call(this);
		let timerObj = setInterval(()=>{
			privateFun.call(this);
		},time);
	};
	stopGame(){
		clearInterval(this.state.timerObj);
		this.setRandomColors(this.state.neutralColor);
		
		let stateObj = this.state;
		stateObj.resultBox.startMsg = hideElementClass;
		stateObj.resultBox.resultMsg = hideElementClass;
		stateObj.resultBox.resultMsg = hideElementClass;
		stateObj.resultBox.attemptWarning = hideElementClass;
		this.setState(stateObj);
	};
	
	componentDidMount() {
		
	};
	setDiffLevel(e){
		let stateObj = this.state;
		let newDiffLevel = e.target.value;
		stateObj.currentDifficultyLevel = newDiffLevel;
		this.setState(stateObj);
	};
	getDiffLevel(){
		return this.state.difficultyLevels[this.state.currentDifficultyLevel];
	};
	
	render(){
		return (
			<div>
				<Button handleClick={this.handleClick} plusBy={1} />
				<Button handleClick={this.handleClick} plusBy={5} />
				<Button handleClick={this.handleClick} plusBy={10} />
				<Result res={this.state.res} />
				<div className='gameContainer'>
					<div className="gameXxXContainer">
						{this.state.boxes}
					</div>
					<GameResultContainer timer={this.state.timeCounter} resultCSS={this.state.resultBox} stopGame={this.stopGame} startGame={this.simulateBoxGame} diffLevel={this.getDiffLevel} setDiffLevel={this.setDiffLevel} />
				</div>
			</div>	
		);
		
	};
}

class GameBox extends React.Component{
	render(){
		return (
			<div onClick={this.props.boxEvent} className='gamebox' id={this.props.id} />
		);
	}
}

class GameResultContainer extends React.Component{
	render(){
		return(
			<div className='gameResultContainer'>
				<GameResult timer={this.props.timer} resultCSS={this.props.resultCSS} />
				<GameDifficultyLevel startGame={this.props.startGame} stopGame={this.props.stopGame}  diffLevel={this.props.diffLevel} setDiffLevel={this.props.setDiffLevel} />
			</div>
		);
	}
}

class GameDifficultyLevel extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className='gameDifficultyLevel'>
				<button name='easy' value='5' onClick={this.props.setDiffLevel}>Easy</button>
				<button name='medium' value='7' onClick={this.props.setDiffLevel}>Medium</button>
				<button name='difficult' value='9' onClick={this.props.setDiffLevel}>Difficult</button>
				<button name='start' onClick={this.props.startGame}>Start</button>
				<button name='stop' onClick={this.props.stopGame}>Stop & Reset</button>
				<span >Diffculty Level : <span id="diffLevel">{this.props.diffLevel()}</span></span>
			</div>
		);
	}
}

class GameResult extends React.Component{
	render(){
		return(
			<div className='gameResult'>
				<span style={this.props.resultCSS.waitMsg}>Wait & memorize boxes...</span>
				<span style={this.props.resultCSS.startMsg}>Start selecting box...</span>
				<span style={this.props.resultCSS.resultMsg}>Your Result...</span>
				<span style={this.props.resultCSS.attemptWarning}>Your attempts are Over :( </span>
				<span style={this.props.resultCSS.moveWarning}>Not allowed to make selection...</span>
				<ShowTimer timerClass={this.props.resultCSS.timerClass} timer={this.props.timer} />
			</div>
		);
	}
}

class Button extends React.Component{
	render(){
		return(
			<button onClick={()=>this.props.handleClick(this.props.plusBy)}>+{this.props.plusBy}</button>
		);
	}
}

class Result extends React.Component{
	render(){
		return(
			<div>
				<p>{this.props.res}</p>
			</div>
		);
	}
}

class ShowTimer extends React.Component{
	render(){
		return(
			<div>
				<p className='gameTimer' style={this.props.timerClass}>{this.props.timer}</p>
			</div>
		);
	}
}

export default Content;