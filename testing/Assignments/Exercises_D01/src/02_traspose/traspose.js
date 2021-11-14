const traspose = (arr) => {
	const arrTraspose = [];
	for (let row = 0; row < arr.length; row++) {
		for (let col = 0; col < arr[row].length; col++) {
			if (arrTraspose[col] === undefined) arrTraspose[col] = [];
			arrTraspose[col][row] = arr[row][col];
		}
	}
	return arrTraspose;
};

export default traspose;