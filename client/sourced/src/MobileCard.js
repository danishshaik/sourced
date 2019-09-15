import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge'


class MobileCard extends React.Component {
	constructor(props) {
		super(props);
		this.setState ={}
	}

	componentDidMount () {

	}

	renderMobileTags() {
		return this.props.company.categories.map((tag) => {
			return (
				<Badge className="mobile-tag mr-2" style={{backgroundColor:tag.color + "1A"}}>
					<span className="tag-text mobile-tag-text" style={{color: tag.color}}>{tag.name}</span>
				</Badge>
			);
		})
	}

	render() {
		return (
			<Row className="mt-3 pb-5">
				<Col xs={{span: 10, offset: 1}} className="mobile-card">
					<Row className="mobile-banner" style={{backgroundColor: this.props.company.color}}>
						<Col>
							<center>
								<div className="mobile-circle" style={{backgroundColor: this.props.company.color}}>
									<div className="logo-vertical">
										<center><img className="company-logo" src={this.props.company.image_url}/></center>
									</div>
								</div>
							</center>
						</Col>
					</Row>
					<Row>
						<Col xs={{span: 10, offset: 1}}>
							<Row><Col className="mobile-name pt-4"><a href={this.props.company.url} onClick={(e) => {this.props.upVoteHandler(this.props.company.id)}} target="_blank">{this.props.company.name}</a></Col></Row>
							<Row><Col className="mobile-desc">{this.props.company.desc}</Col></Row>
							<Row className="mt-4 pb-5"><Col className="pb-3">{this.renderMobileTags()}</Col></Row>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

export default MobileCard;