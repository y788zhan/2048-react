var Cell = React.createClass({
	render: function() {
		return (
			<div className="cell col-xs-3" value={this.props.value}>
				<p>{this.props.value}</p>
			</div>
		);
	}
});