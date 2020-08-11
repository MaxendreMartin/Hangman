const words_to_find = [
    "ALGORITHME",
    "COMPTEUR",
    "ARGUMENT",
    "DECLARATION",
    "BALISE",
    "CHECKPOINT",
    "ASSIGNATION",
    "COMMENTER",
    "PYTHON",
    "JAVASCRIPT",
    "HTML",
    "CONSOLE",
    "DEFINIR",
    "JSON",
    "CARACTERE",
    "DEVELOPPER",
    "PROGRAMMATION",
    "AJAX",
    "BIBLIOTHEQUE",
    "BOUCLE",
];

new Hangman({
    parent_element: document.body.querySelector("main"),
    list_of_words: words_to_find,
});
