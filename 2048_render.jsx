var board = React.createClass({
	handleKeyDown: function(e) {
		var controls = [{key: 37, val: "a"},
						{key: 38, val: "w"},
						{key: 39, val: "d"},
						{key: 40, val: "s"}];
		if (e.keyCode == 32) {
			myreset(b);
		} else {
			mycontinue(b, p, t, o, controls[e.keyCode - 37].val)
		}
		this.forceUpdate();
			$('.cell').each(function() {
				var val = $(this).find('p').text();
				if (val == 8) {
					$(this).css("background-color", "#96b1ac");
				} else if (val == 16) {
					$(this).css("background-color", "#bcded7");
				} else if (val == 32) {
					$(this).css("background-color", "#3fe694");
				} else if (val == 64) {
					$(this).css("background-color", "#d7deff");
				} else if (val == 128) {
					$(this).css("background-color", "#395075");
				} else if (val == 256) {
					$(this).css("background-color", "#525162");
				} else if (val == 512) {
					$(this).css("background-color", "#116493");
				} else if (val == 1024) {
					$(this).css("background-color", "#800000");
				} else if (val == 2048) {
					$(this).css("background-color", "#74d600");
				} else if (val >= 4096) {
					$(this).css("background-color", "#3fe694");
				} else {
					$(this).css("background-color", "#dcb");
				}
			});
	},
	componentDidMount: function() {
		window.addEventListener('keydown', this.handleKeyDown);
	},
	componentWillUnmount: function() {
		window.removeEventListener('keydown', this.handleKeyDown);
	},
	render: function() {
		return (
			<div className="2048game row">
				<div className="col-md-4"></div>
				<div className="cellGroup col-md-4">
					<CellsGroup source={results}/>
					{gameover && (
						<h4>Game Over</h4>
					)}
					<p>Press SPACE to restart</p>
				</div>
				<div className="col-md-4"></div>
			</div>
		)
	}
})
