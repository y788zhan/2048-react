var CellsGroup = React.createClass({
	render: function() {
		return (
			<div className="cell-container row">
				{this.props.source.map(function(results) {
					return (
						<Cell value={results.val}>
							{results.val}
						</Cell>
					)
				})}
			</div>
		);
	}
});