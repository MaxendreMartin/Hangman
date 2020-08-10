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
    }
}
