let productArray = [];
let productCount = 0;
let totalSum = 0;

function getButton(text, classList) {
  let button = document.createElement("button");
  button.textContent = text;
  button.classList.add(classList);
  return button;
}

function getInput(type, placeholder) {
  let input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  input.min = 1;
  return input;
}

function checkEmpty() {
  if (productCount === 0) {
    emptyMessage.style.display = "block";
    emptyImage.style.display = "block";
    return;
  }
  emptyMessage.style.display = "none";
  emptyImage.style.display = "none";
}

function getItem(i, product, amount, price) {
  let numberItem = document.createElement("span");
  numberItem.classList.add("item__number");
  numberItem.textContent = i + 1;

  let productContainer = document.createElement("div");
  productContainer.classList.add("product__container");

  let productProp = document.createElement("div");
  productProp.classList.add("product__prop", "product__name");

  let productInnerLeft = document.createElement("div");
  productInnerLeft.classList.add("product__inner-left");
  let productInnerRight = document.createElement("div");
  productInnerRight.classList.add("product__inner-right");

  // name
  let nameLabel = document.createElement("p");
  nameLabel.classList.add("product__name-label");
  nameLabel.textContent = "Name";

  let nameValue = document.createElement("p");
  nameValue.classList.add("product__name-value");
  nameValue.textContent = product;

  // amount
  let productAmount = document.createElement("div");
  productAmount.classList.add("product__prop", "product__amount");

  let amountLabel = document.createElement("p");
  amountLabel.classList.add("product__amount-label");
  amountLabel.textContent = "Amount";

  let amountValue = document.createElement("p");
  amountValue.classList.add("product__amount-value");
  amountValue.textContent = amount;

  // price
  let productPrice = document.createElement("div");
  productPrice.classList.add("product__prop", "product__price");

  let priceLabel = document.createElement("p");
  priceLabel.classList.add("product__price-label");
  priceLabel.textContent = "Price";

  let priceValue = document.createElement("p");
  priceValue.classList.add("product__price-value");
  priceValue.textContent = price;

  // total price
  let totalPrice = document.createElement("div");
  totalPrice.classList.add("product__prop", "total__price");

  let totalLabel = document.createElement("p");
  totalLabel.classList.add("total__price-label");
  totalLabel.textContent = "Total";

  let totalValue = document.createElement("p");
  totalValue.classList.add("product__total-value");
  totalValue.textContent = `${amount * price}$`;

  // buttons
  let productButtons = document.createElement("div");
  productButtons.classList.add("product__buttons");

  let editButton = getButton("Edit", "edit__button");
  editButton.textContent = "Edit";

  editButton.onclick = function () {
    let oldAmount = amount;
    let oldPrice = price;

    let updateProduct = prompt("Type product name", product);
    if (updateProduct) nameValue.textContent = updateProduct;

    let updateAmount = prompt("Type amount", amount);
    if (updateAmount) {
      amountValue.textContent = updateAmount;
      amount = Number(updateAmount);
    }

    let updatePrice = prompt("Type price", price);
    if (updatePrice) {
      priceValue.textContent = updatePrice;
      price = Number(updatePrice);
    }

    let newTotal = amount * price;
    totalValue.textContent = `${newTotal}$`;
    totalSum += newTotal - oldAmount * oldPrice;
    totalPriceDisplay.textContent = `${totalSum}$`;
  };

  let deleteButton = getButton("Remove", "delete__button");
  deleteButton.textContent = "Remove";

  deleteButton.onclick = function () {
    let itemTotalPrice = amount * price;
    productContainer.classList.add("delete");

    setTimeout(() => {
      productContainer.remove();
    }, 500);

    totalSum -= itemTotalPrice;
    totalPriceDisplay.textContent = `${totalSum}$`;

    productCount--;
    checkEmpty();
  };

  productProp.append(nameLabel, nameValue);
  productInnerLeft.append(numberItem, productProp);
  productButtons.append(editButton, deleteButton);
  productInnerRight.append(
    productAmount,
    productPrice,
    totalPrice,
    productButtons
  );

  productAmount.append(amountLabel, amountValue);
  productPrice.append(priceLabel, priceValue);
  totalPrice.append(totalLabel, totalValue);

  productContainer.append(productInnerLeft, productInnerRight);

  return productContainer;
}

let addButton = getButton("Add", "add__button");
let editButton = getButton("Edit", "edit__button");
let removeButton = getButton("Remove", "remove__button");

let productInput = getInput("text", "Product name");
let amountInput = getInput("number", "Amount");
let priceInput = getInput("number", "Price");

let header = document.createElement("h1");
header.textContent = "Shopping list";

let container = document.createElement("div");
container.classList.add("container");

addButton.addEventListener("click", function () {
  let product = productInput.value;
  let amount = Number(amountInput.value);
  let price = Number(priceInput.value);

  if (product == "") product = "Unnamed";

  let newItem = getItem(productCount, product, amount, price);
  container.append(newItem);

  setTimeout(() => {
    newItem.classList.add("visible");
  }, 5);

  productArray.push({ product, amount, price });

  productCount++;

  checkEmpty();

  totalSum += amount * price;
  totalPriceDisplay.textContent = `${totalSum}$`;

  productInput.value = "";
  amountInput.value = "";
  priceInput.value = "";
});

let emptyMessage = document.createElement("p");
emptyMessage.classList.add("empty__message");
emptyMessage.textContent = "No products were found";

let emptyImage = document.createElement("img");
emptyImage.classList.add("empty__image");
emptyImage.src = "images/question.svg";

let input__section = document.createElement("div");
input__section.classList.add("input__section");
input__section.append(productInput, amountInput, priceInput, addButton);

let productTotalPrice = document.createElement("div");
productTotalPrice.classList.add("product-total__price");

let totalPriceHeader = document.createElement("h3");
totalPriceHeader.textContent = "Total products price:";

let totalPriceDisplay = document.createElement("p");
totalPriceDisplay.textContent = `${totalSum}$`;

productTotalPrice.append(totalPriceHeader, totalPriceDisplay);

container.append(input__section, productTotalPrice, emptyMessage, emptyImage);
document.body.append(header, container);
