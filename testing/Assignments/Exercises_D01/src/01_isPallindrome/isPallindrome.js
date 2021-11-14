const isPallindrome = (input) => {
	if (typeof input !== 'string') throw TypeError('Checks only on string');
	for (let i = 0; i < input.length / 2; i++) {
		if (input[i].toLowerCase() !== input[input.length - 1 - i].toLowerCase()) return false;
	}
	return true;
};
export default isPallindrome;
