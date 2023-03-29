const cz = require("./commitizen.config.js");

module.exports = {
  extends: ["gitmoji"],
  rules: {
    // Перечислим все возможные типы коммитов (временно не используем)
    "type-enum": [0, "always", cz.types.map((type) => type.value)],

    //тип может быть только в нижнем регистре
    "type-case": [2, "always", "lower-case"],

    //тип не можетбыть пустым
    "type-empty": [2, "never"],

    // Область всегда только в нижнем регистре
    "scope-case": [2, "always", "lower-case"],

    // Перечислим все возможные области коммитов
    "scope-enum": [1, "always", cz.scopes.map((type) => type.name)],

    "subject-case": [2, "always", "sentence-case"],

    // Описание не может быть пустым
    "subject-empty": [2, "never"],

    // Описание не должно заканчиваться '.'
    "subject-full-stop": [2, "never", "."],

    //Максимальная длина заголовка
    "header-max-length": [2, "always", cz.subjectLimit],

    "header-case": [2, "always", "lower-case"],

    // Тело коммита должно начинаться с пустой строки
    "body-leading-blank": [2, "always"],

    // Нижний колонтитул коммита должен начинаться с пустой строки
    "footer-leading-blank": [2, "always"],

    // Максимальная длина нижнего колонтитула (выдаст warning)
    "footer-max-line-length": [1, "always", cz.subjectLimit],
  },
};
