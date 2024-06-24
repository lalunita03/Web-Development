(function () {
    "use strict";

    function init() {
        // add id if more div's are added that are not cards
        const divs = qsa("div");
        
        for (let i = 0; i < divs.length; i++) {
            divs[i].addEventListener("dblclick", easterEgg);
            divs[i].addEventListener("click", flipCard);
        }
    }

    /**
    * This function flips the skill card from the picture to the
    * description and vice versa
    */
    function flipCard() {
        const image = this.querySelector("img");
        const p = this.querySelector("p");

        if (image.classList.contains("hidden")){
            image.classList.remove("hidden");
            p.classList.add("hidden");
        }
        else {
          p.classList.remove("hidden");
          image.classList.add("hidden");
      }
    }

    /**
    * This function is an easter egg and converts the description
    * to "MEOW!!" when the text is double clicked and deletes the
    * card entirely if the image is double clicked
    */
    function easterEgg() {
        console.log(this);
        const p = this.querySelector("p");

        if (!p.classList.contains("hidden")) {
            p.textContent = "MEOW!!";
        }
        else {
            this.remove();
        }
    }

    init();
})();