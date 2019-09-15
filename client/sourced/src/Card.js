import React from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Tag from './Tag.js'

// image imports
import star from './star.png'



class Card extends React.Component {

	renderTags() {
		if (this.props.company.categories) {
			let tagsCopy = this.props.company.categories.slice()
			let tags = tagsCopy.map((tag) => 
				<Tag tag={tag}></Tag>
			);
			return tags
		}
	}

	render() {
		return (
			<Row className="ml-5 mr-5 mt-4 mb-4 company-card">
				<Col xs={1} style={{backgroundColor: this.props.company.color}} className="side-boarder">
				</Col>
				<Col xs={1}>
				<div className="circle" style={{backgroundColor: this.props.company.color}}>
					<div className="logo-vertical">
						<center><img className="company-logo" src={this.props.company.image_url}/></center>
					</div>
				</div>
				</Col>
				<Col xs={9} className="pl-0">
					<Row className="pt-2"><Col className="company-name"><a onClick={(e) => {this.props.upVoteHandler(this.props.company.id)}} href={this.props.company.url} target="_blank">{this.props.company.name}</a></Col></Row>
					<Row><Col>{this.props.company.desc}</Col></Row>
					<Row className="pt-3 pb-4">
						<Col>
							{this.renderTags()}
						</Col>
					</Row>
				</Col>
				<Col xs={1}>
					<div className="star" style={{backgroundImage: `url(${star})`}}>
  					<p className="upvotes-text">{this.props.company.upvotes}</p>
  					</div>
				</Col>
			</Row>
		);
	}
}

export default Card;