module.exports = {
  types: [
    { value: ":sparkles: feat", name: "✨ feat:\tAdding a new feature" },
    { value: ":bug: fix", name: "🐛 fix:\tFixing a bug" },
    { value: ":memo: docs", name: "📝 docs:\tAdd or update documentation" },
    { value: ":tada: begin:", name: "🎉 begin: \tBegin a project" },
    {
      value: ":lipstick: style",
      name: "💄 style:\tAdd or update styles, ui or ux",
    },
    {
      value: ":recycle: refactor",
      name: "♻️  refactor:\tCode change that neither fixes a bug nor adds a feature",
    },
    {
      value: ":zap: perf",
      name: "⚡️ perf:\tCode change that improves performance",
    },
    {
      value: ":white_check_mark: test",
      name: "✅ test:\tAdding tests cases",
    },
    {
      value: ":truck: chore",
      name: "🚚 chore:\tChanges to the build process or auxiliary tools\n\t\tand libraries such as documentation generation",
    },
    { value: ":rewind: revert", name: "⏪️ revert:\tRevert to a commit" },
    { value: ":construction: wip", name: "🚧 wip:\tWork in progress" },
    {
      value: ":construction_worker: build",
      name: "👷 build:\tAdd or update regards to build process",
    },
    {
      value: ":rotating_light: fix",
      name: "🚨 fix:\tFix compiler / linter warnings.",
    },
    {
      value: ":green_heart: ci",
      name: "💚 ci:\tAdd or update regards to build process",
    },
    {
      value: ":twisted_rightwards_arrows: merge",
      name: "🔀 merge:\tMerge branches",
    },
  ],

  scopes: [{ name: "ui" }, { name: "settings" }],

  scopeOverrides: {
    fix: [
      { name: "merge" },
      { name: "style" },
      { name: "test" },
      { name: "hotfix" },
    ],
  },

  messages: {
    type: "Выберите ТИП изменения, которое вы вносите",
    scope: "Выберите ОБЛАСТЬ, для которой вы вносите изменения",
    customScope: "Укажите свою ОБЛАСТЬ",
    subject: "Напишите котороткое описание в ПОВЕЛИТЕЛЬНОМ наклонении: \n",
    body:
      "Напишите ПОДРОБНОЕ описание (опционально). Используйте " |
      " для новой строки:\n",
    breaking: "Список BREAKING CHANGES (опционально):\n",
    footer:
      "Перечислите все ПРОБЛЕМЫ, ЗАКРЫТЫЕ этим изменением (опционально). Например: #31, #34:\n",
    confirmCommit:
      "Вы уверены, что хотите продолжить выполнение описанного выше коммита?",
  },

  //Добавляем собственные области
  allowCustomScopes: true,

  // Запрет на нарушение правил
  allowBreakingChanges: false,

  //skipQuestions: [], //мы можем скипнуть вопросы

  //Максимальная длина строки короткого описания
  subjectLimit: 100,
};
