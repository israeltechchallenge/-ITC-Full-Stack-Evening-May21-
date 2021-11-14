class CandyStore {
	constructor() {
		this.getCandy = this.getCandy.bind(this);
		this.getPrice = this.getPrice.bind(this);
		this.addCandy = this.addCandy.bind(this);
		this.buy = this.buy.bind(this);
	}
	candies = [
		{
			name: 'mint gum',
			id: 'as12f',
			price: 2,
			amount: 2,
		},
		{
			name: 'twix',
			id: '5hd7y',
			price: 5,
			amount: 4,
		},
	];
	cashRegister = 200;
	getCandy = function (id) {
		return this.candies.find((x) => x.id === id);
	};

	getPrice = function (id) {
		try {
			const candy = this.getCandy(id);
			return candy.price;
		} catch (err) {
			return null;
		}
	};

	addCandy = function (id, name, price) {
		const candy = this.getCandy(id);
		if (candy) candy.amount++;
		else {
			this.candies.push({
				name: name,
				id: id,
				price: price,
				amount: 1,
			});
		}
	};

	buy = function (id) {
		const candy = this.getCandy(id);
		if (candy.amount > 0) {
			this.cashRegister += candy.price;
			candy.amount--;
		}
	};
}
export default CandyStore;
