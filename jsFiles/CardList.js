import React from 'react';
import Card from '../jsxFiles/Card.jsx'

class CardList extends React.Component{
	
	constructor(props){
		super(props);
	};
	render(){
		return(
			// <div>
			// {this.props.cards.map((cardData,i)=><Card key={i} card={cardData} />)}
			// </div>
			<div className="row">
					{this.props.cards.map((cardData,i)=><Card key={i} card={cardData} />)}
			</div>
		);
	}
}

export default CardList;