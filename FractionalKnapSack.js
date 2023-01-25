const fractionalData = [
  {
    price: 900,
    weight: 3,
  },
  {
    price: 400,
    weight: 2,
  },
  {
    price: 1200,
    weight: 3,
  },
  {
    price: 200,
    weight: 4,
  },
];

function fractionalKnapSack(dataObject, capacity) {
  dataObject.sort((a, b) =>
    a.price / a.weight < b.price / b.weight
      ? 1
      : b.price / b.weight < a.price / a.weight
      ? -1
      : 0
  );

  let Tweight = 0;
  let Tprice = 0;
  itemPrecentageArray = [];
  while (Tweight < capacity) {
    const i = dataObject.shift();
    if (i.weight + Tweight < capacity) {
      itemPrecentageArray.push(1);
      Tweight += i.weight;
      Tprice += i.price;
    } else {
      itemPrecentageArray.push((capacity - Tweight) / i.weight);
      Tweight = capacity;
      Tprice += ((capacity - Tweight) / i.weight) * i.price;
    }
  }

  console.log(Tprice, itemPrecentageArray);
}

fractionalKnapSack(fractionalData, 9);
