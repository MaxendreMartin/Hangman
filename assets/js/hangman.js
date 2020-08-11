class Hangman {
    constructor({ parent_element, list_of_words }) {
        this.parent_element = parent_element;
        this.list_of_words = list_of_words;
        this.errors = 0;
        this.attempts = 0;
        this.letters_found = 0;
        this.random_word;
        this.hidden_letters_arrays;
        this.init();
    }

    init() {
        this.random_word = this.getRandomWord(this.list_of_words);
        //console.log(this.random_word);

        const word_section_element = document.createElement("section");
        word_section_element.id = "word_to_find";

        word_section_element.innerHTML = `
        <figure>
            <img src="assets/images/base.gif" alt="support de pendaison">
            <figcaption>Nombre de lettres à trouver : ${this.random_word.length}<hr>Lettres trouvées : ${this.letters_found}<hr>
            Tentatives : ${this.attempts}<hr>Erreurs : ${this.errors}/6 </figcaption>
        </figure>`;

        const letters_section_element = document.createElement("section");
        letters_section_element.id = "letters";

        this.generateLetterButton(letters_section_element);

        this.parent_element.appendChild(word_section_element);
        this.parent_element.appendChild(letters_section_element);

        this.hidden_letters_arrays = this.displayHiddenWord(this.random_word);
        //console.log(this.hidden_letters_arrays);
    }

    getRandomWord(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array[0];
    }

    generateLetterButton(letters_section_element) {
        let ul_element = document.createElement("ul");
        let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            .split("")
            .forEach((letter) => {
                let li_element = document.createElement("li");
                li_element.textContent = letter;

                li_element.addEventListener("click", () => this.check(event), {
                    once: true,
                });

                ul_element.appendChild(li_element);
            });

        letters_section_element.appendChild(ul_element);
    }

    displayHiddenWord() {
        let hidden_word = this.random_word.slice().replace(/[A-Z]/g, "_");

        let paragraph_element = document.createElement("p");

        paragraph_element.textContent = hidden_word;

        document.body
            .querySelector('section[id="word_to_find"] ')
            .appendChild(paragraph_element);

        return hidden_word.split("");
    }

    check(event) {
        this.attempts++;

        let selected_letter = event.target.textContent;

        if (this.random_word.includes(selected_letter)) {
            event.target.classList.add("good");
            this.random_word.split("").forEach((letter, index) => {
                if (letter === selected_letter) {
                    this.letters_found++;
                    this.hidden_letters_arrays[index] = selected_letter;
                }
            });

            document.body.querySelector(
                'section[id="word_to_find"]>p '
            ).textContent = this.hidden_letters_arrays.join("");
        } else {
            this.errors++;
            event.target.classList.add("wrong");
            document.body.querySelector(
                "img"
            ).src = `assets/images/error${this.errors}.gif `;
        }

        document.body.querySelector(
            "figcaption"
        ).innerHTML = `Nombre de lettres à trouver : ${this.random_word.length}<hr>Lettres trouvées : ${this.letters_found}<hr>
        Tentatives : ${this.attempts}<hr>Erreurs : ${this.errors}/6`;

        this.checkWinOrLoose();
    }

    checkWinOrLoose() {
        let word_paragraph = document.body.querySelector(
            'section[id="word_to_find"]>p '
        );

        if (this.errors === 6) {
            this.gameOver(word_paragraph);
            word_paragraph.classList.add("Perdu");
            word_paragraph.textContent = this.random_word;
        }

        if (this.letters_found === this.random_word.length) {
            this.gameOver(word_paragraph);
            word_paragraph.classList.add("Gagner");
        }
    }

    gameOver(word_paragraph) {
        word_paragraph.classList.add("gameover");
        document.body
            .querySelectorAll("li")
            .forEach((letter) => (letter.className = "disabled"));

        let button_element = document.createElement("button");
        button_element.textContent = "Recharger la page";

        button_element.addEventListener("click", () =>
            window.location.reload(false)
        );
        document.body
            .querySelector('section[id="letters"] ')
            .appendChild(button_element);
    }
}
