import { Given, Then, When } from "@cucumber/cucumber";
import { addingToDosPage } from "../pages/addingToDosPage";
import { pageFixture } from "../support/pageFixture";
import { expect } from "@playwright/test";

let addingToDos: addingToDosPage;

Given("I navigate to the todo Application", async function () {
  // instantiate the page object
  addingToDos = new addingToDosPage(pageFixture.page);
  // navigate to the home page
  await addingToDos.navigateToHomePage();
});
// adding a new todo item
When("I type {string} into the input field", async function (todotext) {
  // check if the input text is "LONG_TEXT_225" and generate 
  // a long text of 225 characters if it is
    let text= todotext;
   if (todotext === "LONG_TEXT_225") {
    text = addingToDos.generateLongText();
   }
  
    await addingToDos.addTodo(text);

});
// pressing Enter to add the todo item
When("I press Enter", async function () {
  await addingToDos.pressEnter();
});
// verifying that the todo item appears in the list
Then("the todo {string} should appear in the list", async function (todotext) {
  expect(await addingToDos.getTodoText()).toBe(todotext);
});
// verifying that the input field is empty after adding a todo item
Then("the input field is empty", async function () {
  expect(await addingToDos.inputField.textContent()).toBe("");
});
// verifying that the todo counter shows the correct number of items
Then("the todo counter should show {string}", async function (counterText) {
  expect(await addingToDos.getTodoCounterText()).toBe(counterText);
});
