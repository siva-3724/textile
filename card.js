
const cartButton = document.getElementById("cartButton");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartProducts = document.getElementById("cartProducts");
const cartBottom = document.getElementById("cartBottom");
const emptyCart = document.getElementById("emptyCart");

const cartCount = document.getElementById("cartCount");
const subtotal = document.getElementById("subtotal");


/* OPEN CART */

cartButton.addEventListener("click", function(e) {

    e.preventDefault();

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

});


/* CLOSE CART */

function closeCartPanel() {

    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


closeCart.addEventListener(
    "click",
    closeCartPanel
);


/* CLICK OUTSIDE */

cartOverlay.addEventListener("click", function(e) {

    if (e.target === cartOverlay) {

        closeCartPanel();

    }

});


/* ESCAPE KEY */

document.addEventListener("keydown", function(e) {

    if (e.key === "Escape") {

        closeCartPanel();

    }

});


/* QUANTITY */

function changeQuantity(button, amount) {

    const quantity =
        button.parentElement.querySelector("span");

    let value =
        parseInt(quantity.textContent);

    value += amount;

    if (value < 1) {
        value = 1;
    }

    quantity.textContent = value;

    updateCart();

}


/* REMOVE */

function removeProduct(button) {

    const product =
        button.closest(".cart-product");

    product.style.opacity = "0";
    product.style.transform = "translateX(30px)";

    setTimeout(function() {

        product.remove();

        updateCart();

    }, 300);

}


/* UPDATE CART */

function updateCart() {

    const products =
        document.querySelectorAll(".cart-product");

    let totalQuantity = 0;
    let totalPrice = 0;


    products.forEach(function(product) {

        const quantity =
            parseInt(
                product
                .querySelector(".quantity span")
                .textContent
            );


        const price =
            parseInt(
                product
                .querySelector(".product-details strong")
                .textContent
                .replace("₹", "")
                .replace(/,/g, "")
            );


        totalQuantity += quantity;

        totalPrice += quantity * price;

    });


    /* UPDATE BADGE */

    cartCount.textContent =
        totalQuantity;


    /* UPDATE PRICE */

    subtotal.textContent =
        "₹" + totalPrice.toLocaleString("en-IN");


    /* EMPTY */

    if (products.length === 0) {

        cartProducts.style.display = "none";

        cartBottom.style.display = "none";

        emptyCart.classList.add("show");

        cartCount.textContent = "0";

    }

}

