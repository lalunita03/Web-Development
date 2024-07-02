/**
 * Lea Grohmann, CS 132, handles adding and removing items
 * from the cart, submitting an order and clearing the cart
 */

(function() {
    "use strict";

    let totalPrice;

    function init() {
        totalPrice = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const tree = localStorage.key(i);
            addItem(tree, localStorage[tree], i);
        }
        qs("#price").textContent = totalPrice;

        if (localStorage.length > 0) {
            qs("#full").classList.toggle("hidden");
            qs("#empty").classList.toggle("hidden");
        }

        const removeButtons = qsa("article button");
        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].addEventListener("click", removeItem);
        }
        
        qs("#clear-btn").addEventListener("click", clearCart);
        qs("#submit-btn").addEventListener("click", submitOrder);

    }

    /**
     * Adds an item to the cart
     @param {String} tree - name of the tree
     @param {Number} quantity - quantity of trees to be ordered
     @param {Number} i - index of the item in the cart
     */
    function addItem(tree, quantity, i) {
        // look up price from api and calculate total price using quantity
        const img = gen("img");
        img.src = "imgs/" + tree.toLowerCase().replace(" ", "-");
        img.alt = tree;

        const figcaption = gen("figcaption");
        figcaption.textContent = tree;

        const figure = gen("figure");
        figure.appendChild(img);
        figure.appendChild(figcaption);

        const li1 = gen("li");
        li1.textContent = "Quantity: " + quantity;
        const li2 = gen("li");

        // look up price
        li2.textContent = "Price: $" + "x.xx";
        const button = gen("button");
        button.textContent = "Remove Item";
        button.id = "remove-btn" + i;
        const li3 = gen("li");
        li3.appendChild(button);

        const ul = gen("ul");
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);

        const article = gen("article");
        article.id = "item" + i;
        article.appendChild(figure);
        article.appendChild(ul);

        qs("#full section").appendChild(article);

        // update the totalPrice
    }

    /**
     * Removes an item from the cart
     */
    function removeItem() {
        const idx = this.id.replace("remove-btn", "");
        qs("#item" + idx).remove();

        if (qs("article") == null) {
            qs("#full").classList.toggle("hidden");
            qs("#empty").classList.toggle("hidden");
        }
    }

    /**
     * Clears the cart and localStorage
     */
    function clearCart() {
        qs("#full section").innerHTML = "";
        qs("#full").classList.toggle("hidden");
        qs("#empty").classList.toggle("hidden");
        localStorage.clear();
    }

    /**
     * Submits the order and clears localStorage
     */
    function submitOrder() {
        qs("#full").classList.toggle("hidden");
        qs("#ordered").classList.toggle("hidden");
        localStorage.clear();
    }

    init();
})();