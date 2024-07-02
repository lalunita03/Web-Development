/**
 * Lea Grohmann, CS 132, adds items selected by user to the localStorage
 */

(function() {
    "use strict";

    function init() {
        qs("#add-btn").addEventListener("click", addItem);
    }

    /**
     * Adds an item to the localStorage
     */    
    function addItem() {
        localStorage.setItem("Apple Tree", "6");
    }

    init();
})();