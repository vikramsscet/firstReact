import React from 'react';

class Card extends React.Component {
	render(){
		return (
			<div className="card">
			  <img src={this.props.card.avatar_url} alt="Avatar" style={{width:200}} />
			  <div className="container">
				<h4><b>{this.props.card.login}</b></h4> 
				<p>Architect & Engineer</p> 
			  </div>
			</div>
		);
	}
}

export default Card;