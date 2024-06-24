/**
 * Lea Grohmann, CS 132, inspired by hw3-spotify.js
 * fetch country data to make a game where you can guess
 * the languages spoken in that country
 * 
 * TO BE IMPLEMENTED, I ran out of time :(
 * generalize picking continents
 * let # of questions be num = min(countries in continent, # of questions selected)
 * randomize which countries get picked for questions (make a list of random indeces between 0 and # of countries)
 * implement "Not Available" - Screen for games that are not implemented yet
 * show incorrect countries with score
 * have a list of recent scores
 * move check boxes to the left of the text
 */


(function() {
    "use strict";

    const BASE_URL = "https://restcountries.com/v3.1/";

    const CONTINENT_EP = BASE_URL + "region/";

    let countries;
    let responses = [];
    let curr = null;


    /**
     * inializes the game
     */
    async function init() {

        qs("#start-btn").addEventListener("click", toggleView);
        qs("h1").addEventListener("click", toggleView);  

        // const game = qs("#select-game").value;
        const num = qs("#select-questions").value;
        // const continent = qs("#select-continent").value;

        qs("#start-btn").addEventListener("click", () => {
            fetchCountries("europe", num);
        });

        qs("#next-btn").addEventListener("click", nextQuestion);
        qs("#back-btn").addEventListener("click", prevQuestion);
        qs("#save-btn").addEventListener("click", saveQuestion);
        qs("#submit-btn").addEventListener("click", finishGame);
    }

    /**
     * Toggles the view from home to game and back
     */
    function toggleView() {
        qs("#home-view").classList.toggle("hidden");
        qs("#game-view").classList.toggle("hidden");
    }


    /**
     * Fetches the countries and their languages from the given
     * continent
     @param {string} continent - name of the continent
     @param {Number} num - number of questions
     */
     async function fetchCountries(continent, num) {
        /* make sure country is a stirng not a number */
        continent = encodeURIComponent(continent);
        const url = CONTINENT_EP + continent + "?fields=name,languages";

        try {
            let resp = await fetch(url);
            resp = checkStatus(resp);
            const data = await resp.json();
            populateCountryResults(data, num);
        } catch(err) {
            handleError(err);
        }
    }

    /**
     * Populates the country results and checks for any errors
     @param {JSON} data - json data containing country information
     @param {Number} num - number of questions
     */
    function populateCountryResults(data, num) {
        const noCountryErr = "The search didn't return any countries on Country API; please try again.";

        if (data.length == 0) {
            handleError(noCountryErr);
        } else {
            qs("#message-area").classList.add("hidden");
            initializeCountries(data, num);
        }
    }

    /**
     * Initializes the countries list using the json data. Populates
     * #options and #questions
     @param {JSON} selector - json data containing country information
     @param {num} first - number of questions
     */
    function initializeCountries(data, num) {
        // Apply a map function to process the name and languages of the countries 
        countries = data.map((country) => {
            return {
                name: country.name.common,
                languages: Object.values(country.languages)
            };
        });

        const questions = qs("#questions");
        questions.innerHTML = "";

        let languages = [];
        
        for (let i = 0; i < countries.length; i++) {
            // populate question
            const name = gen("li");
            name.textContent = "Q" + (i + 1) + ": " + countries[i].name;
            questions.appendChild(name);

            // initialize responses list
            const entry = {name: countries[i].name, languages: []};
            responses.push(entry);


            if (i === 0) {
                name.classList.add("current");
                curr = 0;
                qs("#back-btn").disabled = true;
            }

            // add languages to list without repition
            const lang = countries[i].languages;
            for (let j = 0; j < lang.length; j++) {
                if (languages.indexOf(lang[j]) === -1) {
                    languages.push(lang[j])
                }
            }
        }

        // randomize order of languages
        languages.sort(() => Math.random() - 0.5);
        populateOptions(languages);
    }

    /**
     * Populates #options
     @param {String[]} selector - list of language options
     */
    function populateOptions(languages) {
        const options = qs("#options");
        options.innerHTML = "";
        
        for (let i = 0; i < languages.length; i++) {
            const label = gen("label");
            const input = gen("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("name", "language");
            input.setAttribute("id", languages[i].toLowerCase().replace(" ", "-"));
            label.textContent = languages[i];

            label.appendChild(input);
            options.appendChild(label);
        }
    }


    /**
     * moves on to the next question, unchecking all boxes checked
     * in the previous question, and checks any boxes that were selected
     * for the current question
     */
    function nextQuestion() {
        const questions = qsa("#questions li");
        questions[curr].classList.remove("current");
        curr++;
        questions[curr].classList.add("current");

        if (curr === 1) {
            qs("#back-btn").disabled = false;
        }
        if (curr === questions.length - 1) {
            qs("#next-btn").disabled = true;
        }

        uncheckBoxes();
        checkBoxes();
    }

    /**
     * moves on to the previous question, unchecking all boxes checked in the
     * next question, and checks all boxes that were selected for the
     * current question
     */
    function prevQuestion() {
        const questions = qsa("#questions li");
        questions[curr].classList.remove("current");
        curr--;
        questions[curr].classList.add("current");

        if (curr === 0) {
            qs("#back-btn").disabled = true;
        }
        if (curr === questions.length - 2) {
            qs("#next-btn").disabled = false;
        }

        uncheckBoxes();
        checkBoxes();
    }

    /**
     * uncheck all boxes
     */
    function uncheckBoxes() {
        const boxes = qsa("#options input");
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].checked = false;
        }
    }

    /**
     * check the languages that were selected previously for the
     * current question
     */
    function checkBoxes() {
        const selected = responses[curr].languages;

        for (let i = 0; i < selected.length; i++) {
            const boxID = "#" + selected[i].toLowerCase().replace(" ", "-");
            qs(boxID).checked = true;
        }
    }

    /**
     * Saves the selection of languages for the current question
     * in responses
     */
    function saveQuestion() {
        const boxes = qsa("#options input");
        responses[curr].languages = [];

        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].checked) {
                const lang = boxes[i].id.replace("-", " ");
                responses[curr].languages.push(lang);
            }
        }
    }

    /**
     * Calls the score function and prints the score, resets all variables
     * and empties the #questions and #options containers
     */
    function finishGame() {
        const p = gen("p");
        const score = calculateScore().toFixed(2);
        p.textContent = "Your Most Recent Score is: " + score.toString() + "%";
        qs("#home-view").appendChild(p);
        toggleView();

        qs("#questions").innerHTML = "";
        qs("#options").innerHTML = "";

        responses = [];
        curr = null;
        countries = null;
    }

    /**
     * Calculates the score after finishing the game, deducts a point
     * for each wrong answer and adds a point for each correct answer
     @returns {Number} the final score as a percentage
     */
    function calculateScore() {
        let score = 0;
        let n = responses.length;

        for (let i = 0; i < n; i++) {
            let temp = 0;
            let original = countries[i].languages;
            const input = responses[i].languages;

            // make all languages lower case
            for (let j = 0; j < original.length; j++) {
                original[j] = original[j].toLowerCase();
            }

            for (let j = 0; j < input.length; j++) {
    
                if (original.includes(input[i])) {
                    temp++;
                } else {
                    temp--;
                }
            }

            if (temp < 0) {
                temp = 0;
            }
            score += temp / original.length;
        }
        return score * 100 / n;
    }



    /* -------------------- Custom Error-handling -------------------- */  

    /**
     * Displays an error message on the page, hiding any previous results.
     * If errMsg is passed as a string, the string is used to customize an error message.
     * Otherwise (the errMsg is an object or missing), a generic message is displayed.
     * @param {String} errMsg - optional specific error message to display on page.
     */
     function handleError(errMsg) {
        if (typeof errMsg === "string") {
            qs("#message-area").textContent = errMsg;
        } else {
            // the err object was passed, don't want to show it on the page;
            // instead use generic error message.
            qs("#message-area").textContent =
                "An error ocurred fetching the Country data. Please try again later.";
        }
        qs("#message-area").classList.remove("hidden");
    }

    init();
})();
