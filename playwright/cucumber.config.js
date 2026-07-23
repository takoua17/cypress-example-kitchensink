module.exports = {
  default: {
    paths: ['src/features/*.feature'],
    require: [
      'src/step-definitions/*.ts',
      'src/hooks/hooks.ts',
      'src/support/pageFixture.ts',
    ],
    requireModule: ['ts-node/register'], // to convert .ts files to .js files
    format: ['progress-bar', 'allure-cucumberjs/reporter'], // to generate allure report
    formatOptions: {
      resultsDir: 'allure-results', // store allure result in json file
      snippetInterface: 'async-await',
    },
  },
}
