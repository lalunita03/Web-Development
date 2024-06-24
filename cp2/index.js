(function () {
    "use strict";
    const PASSWORD = "tuna";

    // Implement "Show Love" button given moore time

    function init() {
       // qs("button").addEventListener("click", addSticker);
        qs("#keyword").addEventListener("input", revealInfo);
    }

    /**
    * This function reveals the hidden information and hides the
    * password input element
    */
    function revealInfo() {
        if (this.value === PASSWORD){
            qs("#secret-info").classList.remove("hidden");
            qs("#secret-password").classList.add("hidden");
        }
    }

    // function addSticker() {
    //     console.log("In addSticker");
    // }

    init();
})();