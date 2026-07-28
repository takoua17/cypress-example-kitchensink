module.exports = {
  default: {
    paths: ['src/features/*.feature'],
    require: [
      'src/steps/*.ts',
      'src/hooks/hooks.ts',
      'src/support/pageFixture.ts',
    ],
    requireModule: ['ts-node/register'], // to convert .ts files to .js files
    format: ['summary', 'allure-cucumberjs/reporter'], // to generate allure report
    formatOptions: {
      resultsDir: 'allure-results', // store allure result in json file
      snippetInterface: 'async-await',
    },
    tags: "@SaveEditOnBlur", 
  },
};
