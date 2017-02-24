var arr = [1, 2, 3, 4, 5, 6];
arr.reduce(function(result, a){
	return result + a;
}, 0);

function sum(n) {
	let sum = 0;
	let i = 1;
	while (i <= n) {
		sum += i;
		i++;
	}
	return sum;
}

function sum(n) {
	let arr = [];
	for (let i = 1; i <= n; i++) {
		arr.push(i);
	}

	return arr.reduce(function(result, a){
		return result + a;
	}, 0);
}

arr.reduce(function(result, value) {
	result[value.id] = value

	return result
}, {})