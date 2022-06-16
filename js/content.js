document.addEventListener("selectionchange", () => {
  let selection = window.getSelection();
  if (selection.toString().length > 0 && selection.toString().length < 5) {
    let url =
      "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" +
      selection.toString() +
      "&to_currency=USD&apikey=KTCN1C6O2BQFWOXQ";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (
          data["Realtime Currency Exchange Rate"]["2. From_Currency Name"] !=
          null
        ) {
          let price =
            data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
          let name =
            data["Realtime Currency Exchange Rate"]["2. From_Currency Name"];
          //limit price to two decimal places
          price = Number(price).toFixed(2);
          console.log(name + ": $" + price);
          var options = {
            title: name + ": $" + price,
          };
          chrome.runtime.sendMessage({
            type: "selection",
            price: price,
            name: name,
            options: options,
          });
        } else {
          console.log("Invalid currency");
        }
      })
      .catch((error) => console.log(error));
  }
});
