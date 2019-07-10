import React  from 'react';

class ToolTip extends React.Component {
	render() {
		console.log(this.props);
		const posStyle = {
			left: this.props.pos.x,
			top: this.props.pos.y,
			display: this.props.disp
		};
		
		return (
			<div id={"tool-tip"+this.props.tipnr} style={posStyle} className="tool-tip">{this.props.text}</div>
		);
	}
}

export default ToolTip;