/**
 * Lea Grohmann, CS 132, this handles when questions are being asked
 * and validating input
 */

(function() {
    "use strict";

    let clicked = false;

    function init() {
        qs("button").addEventListener("click", submitQuestion);
    }


    /**
     * Submits the question if a question was entered and prompts
     * the user to enter a message otherwise
     */    
    function submitQuestion() {
        if (qs("#message").value === "" & !clicked) {
            const p = gen("p");
            p.textContent = "Please enter a message";
            qs("#main-view").insertBefore(p, qs("button"));
            clicked = true;
        } else if (qs("#message").value != "") {
            qs("#main-view").classList.toggle("hidden");
            qs("#done-view").classList.toggle("hidden");
        }
    }

    init();
})();