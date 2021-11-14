import CandyStore from "./candyStore";
test('Check the GetCandy Function',() =>{
    const candyStore = new CandyStore()
    expect(candyStore.getCandy('as12f')).toBe({
        name: 'mint gum',
        id: 'as12f',
        price: 2,
        amount: 2,
    })
})
test('Chek the GetPrice Function',() => {
    const candyStore = new CandyStore()
    expect(candyStore.getPrice('5hd7y')).toBe(5)
})

