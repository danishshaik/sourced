import React from 'react';

import Badge from 'react-bootstrap/Badge'



class Tag extends React.Component {

	render() {
		return (
			<Badge className="tag mr-3" style={{backgroundColor: this.props.tag.color + "1A"}}>
				<span className="tag-text" style={{color: this.props.tag.color}}>{this.props.tag.name}</span>
			</Badge>
		);
	}
}

export default Tag;