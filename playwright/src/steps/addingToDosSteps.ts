import { Given, Then, When } from "@cucumber/cucumber";
import { addingToDosPage } from "../pages/addingToDosPage";
import { pageFixture } from "../support/pageFixture";
import { expect } from "@playwright/test";

let addingToDos: addingToDosPage;

Given("I navigate to the todo Application", async function () {
  // instantiate the page object
  pageFixture.addingToDos = new addingToDosPage(pageFixture.page);
  // navigate to the home page
  await  pageFixture.addingToDos.navigateToHomePage();
});

// ************TC-01-02-03-04: Add a valid todo and display it correctly
// adding a new todo item
When("I type {string} into the input field", async function (todotext) {
  // check if the input text is "LONG_TEXT_225" and generate 
  // a long text of 225 characters if it is
    let text= todotext;
   if (todotext === "LONG_TEXT_225") {
    text =  pageFixture.addingToDos.generateLongText();
   }
  
    await  pageFixture.addingToDos.addTodo(text);

});
// pressing Enter to add the todo item
When("I press Enter", async function () {
  await pageFixture.addingToDos.pressEnter();
});
// verifying that the todo item appears in the list
Then("the todo {string} should appear in the list", async function (todotext) {
  const count = await  pageFixture.addingToDos.todoList.filter({ hasText: todotext }).count();
  expect(count).toBeGreaterThan(0);
});
// verifying that the input field is empty after adding a todo item
Then("the input field is empty", async function () {
  expect(await  pageFixture.addingToDos.inputField.textContent()).toBe("");
});
// verifying that the todo counter shows the correct number of items
Then("the todo counter should show {string}", async function (counterText) {
  expect(await  pageFixture.addingToDos.getTodoCounterText()).toBe(counterText);
});

// ************TC-05: A todo should not be added by blurring the input (without pressing Enter)
// Click outside the input field
When('I click outside the input field', async function () {
  await  pageFixture.addingToDos.clickOutsideInputField();
});

// verifying that the todo item does not appear in the list after clicking outside the input field
Then("the todo {string} should not appear in the list", async function (todotext: string) {
 await (expect( pageFixture.addingToDos.todoList.filter({ hasText: todotext })).toHaveCount(0));
});

Then("the input field should still contain {string}", async function (inputText: string) {
  await expect( pageFixture.addingToDos.inputField).toHaveValue(inputText);
});


//************TC-06: ddingmultipleTodos: Add multiple todos and display them correctly
//No new steps needed here : reuses steps already defined above

//************TC-07: A todo should not be added when the input field is empty
// Click on the input field
When('I click on the input field', async function () {
  await  pageFixture.addingToDos.ClickOnInputField();
});
// Verify that no todo is added to the list
Then('no todo should be added to the list', async function () {
  const todoCount = await  pageFixture.addingToDos.todoList.count();
  expect(todoCount).toBe(0);
});


//************TC-08: Add a duplicate todo
// verifying that two todos with the same text appear as separate entries
Then('both todos {string} should appear in the list as two separate entries', async function (todo) {
  const todos = await  pageFixture.addingToDos.todoList.filter({ hasText: todo });
  expect(await todos.count()).toBe(2);
});



// ************TC-09: Trim whitespace from a new todo
//No new steps needed here :reuses steps already defined above

