const submitInputBtn = document.getElementById("submitInputBtn");
const nodeCountInput = document.getElementById("nodeCountInput");

const data = [];

submitInputBtn.addEventListener("click", () => {
  for (let i = 1; i <= nodeCountInput.value; i++) {
    const row = [];
    for (let j = 1; j <= nodeCountInput.value; j++) {
      const input = prompt(`edge between v${i} and v${j} : (1 , 0 , Infinity)`);

      if (input == "infinity" || input == "Infinity") {
        row.push(Infinity);
      } else {
        row.push(Number(input));
      }
    }
    data.push(row);
  }
  var asString =
    '<div class="flex items-center justify-center">ورودی های ما به صورت زیر وارد شده است </div>';
  data.forEach((row) => {
    var cells = "";
    row.forEach((cel) => {
      cells += `<span class="mx-3">${cel}</span>`;
    });
    test = `
    <div class="p-3 m-3 flex items-center justify-center ">
    ${cells}
    </div>
    `;

    asString += test;
  });

  document.getElementById("inputPrinter").innerHTML = asString;

  document.getElementById(
    "inputPrinter"
  ).innerHTML += `        <div class="flex items-center justify-center">
  <button
    id="runFloyd"
    class="border bg-green-400 m-4 rounded-md p-2 hover:bg-green-500"
  >
    اجرای الگوریتم
  </button>
</div>`;

  document.getElementById("runFloyd").addEventListener("click", () => {
    const answer = floyd(data);

    var asString =
      '<div class="flex items-center justify-center"> حالا میتوانیم مسیر های کوتاه شده را ببینیم</div>';
    data.forEach((row) => {
      var cells = "";
      row.forEach((cel) => {
        cells += `<span class="mx-3">${cel}</span>`;
      });
      test = `
    <div class="p-3 m-3 flex items-center justify-center ">
    ${cells}
    </div>
    `;

      asString += test;
    });

    document.getElementById("outputPrinter").innerHTML = asString;
  });
});

// main algorithem

function floyd(matrix) {
  const n = matrix.length;
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const newValue = matrix[i][k] + matrix[k][j];
        if (matrix[i][j] > newValue) {
          matrix[i][j] = newValue;
        }
      }
    }
  }
  return matrix;
}
