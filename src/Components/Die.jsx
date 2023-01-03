const Die = (props) => {
	const styles = {
		backgroundColor: props.isHeld ? "#59E391" : "white"
	};

	return (
		<div
			style={styles}
			className="die"
		>
			<h2 className="die-num">{props.value}</h2>
		</div>
	);
};

export default Die;
