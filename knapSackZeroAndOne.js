// const data = [
//   {
//     id: 0,
//     product: "قالپاق",
//     price: 3,
//     weight: 0,
//   },
//   {
//     id: 1,
//     product: "سماور",
//     price: 7,
//     weight: 2,
//   },
//   { id: 2, product: "موبایل ۱۱۰۰", price: 20, weight: 0 },
//   { id: 3, product: "جام بلور", price: 15, weight: 1 },
//   { id: 4, product: "ظرف مسی", price: 8, weight: 3 },
//   { id: 5, product: "شمعدانی", price: 10, weight: 2 },
// ];

const functionInputData = [];

const count = document.getElementById("nodeCountInput");
const capacity = document.getElementById("capacityInput");
document.getElementById("submitInputBtn").addEventListener("click", () => {
  for (i = 0; i < count.value; i++) {
    const name = prompt("نام کالا را وارد کنید ");
    const weight = +prompt("وزن کالای خود را وارد کنید ");
    const price = +prompt("ارزش کالای خود را بدون واحد وارد کنید ");
    const obj = {
      id: i,
      product: name,
      price: price,
      weight: weight,
    };
    functionInputData.push(obj);
  }
  console.log(functionInputData);

  var asString =
    '<div class="flex items-center justify-center">ورودی های ما به صورت زیر وارد شده است </div>';
  functionInputData.forEach((row) => {
    const test = `<div class="p-3 m-3 flex items-center justify-center ">
   <span class="mx-3">id: ${row.id}</span>
   <span class="mx-3">name: ${row.product}</span>
   <span class="mx-3">price: ${row.price}</span>
   <span class="mx-3">weight:  ${row.weight}</span>
   </div>`;

    asString += test;
  });

  document.getElementById("inputPrinter").innerHTML = asString;

  document.getElementById(
    "inputPrinter"
  ).innerHTML += `        <div class="flex items-center justify-center">
  <button
    id="runKnapSack"
    class="border bg-green-400 m-4 rounded-md p-2 hover:bg-green-500"
  >
    اجرای الگوریتم
  </button>
</div>`;

  document.getElementById("runKnapSack").addEventListener("click", () => {
    const answer = knapSackZeroAndOne(functionInputData, capacity.value);

    console.log(answer);

    document.getElementById("outputPrinter").innerHTML = `
    <div class="flex items-center justify-center">خروجی ما آخرین خانه جدول میباشد که مقدار ${
      answer[count.value - 1][capacity.value - 1]
    }</div>
    <div class="flex items-center justify-center">برای مشاهده جدول داخل کنسول را بررسی کنید </div>
    `;
  });
});

function knapSackZeroAndOne(data, capacity) {
  // ساخت ماتریس برای دیتا ها و کوله پشتی

  /*

                1    2    3     4     5     6     7       8      9     10

        قالپاق

        سماور

        ۱۱۰۰

        جام بلور

        ظرف مسی
        
        شمعدانی     




    */

  const data_matrix = [];

  // ساخت ماتریس به ارتفاع تعداد کالا ها و عرض ظرفیت کوله پشتی

  data.forEach((item) => {
    const row = [];
    for (let i = 0; i < capacity; i++) {
      row.push("");
    }

    data_matrix.push(row);
  });
  // محسابات اصلی کوله پشتی

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < capacity; j++) {
      if (i === 0 && j < data[i].weight) {
        data_matrix[i][j] = 0;
      } else if (i === 0 && j >= data[i].weight) {
        data_matrix[i][j] = data[i].price;
      } else if (j < data[i].weight) {
        data_matrix[i][j] = data_matrix[i - 1][j];
      } else {
        const latestValue = data_matrix[i - 1][j];
        let newValue;
        if (data_matrix[i - 1][j - data[i].weight - 1] == undefined) {
          newValue = data[i].price;
        } else {
          newValue = data[i].price + data_matrix[i - 1][j - data[i].weight - 1];
        }

        data_matrix[i][j] = latestValue > newValue ? latestValue : newValue;
      }
    }
  }

  return data_matrix;
}
