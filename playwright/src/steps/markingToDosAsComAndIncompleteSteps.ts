import { Given, Then, When } from "@cucumber/cucumber";
import { pageFixture } from "../support/pageFixture";
import { MarkingTodosPage } from "../pages/markingToDosAsComAndIncompletePage";
import { DeletingToDosPage } from "../pages/deletingToDosPage";
import { expect } from "@playwright/test";

/* Create a new instance of MarkingTodosPage and store it in pageFixture.
Also instantiate DeletingToDosPage, since MarkingTodosPage reuses its 
todoList locator instead of duplicating it.
*/
Given('I am ready to mark todos', async function () {
  pageFixture.markingTodos = new MarkingTodosPage(pageFixture.page);
  pageFixture.deletingToDos = new DeletingToDosPage(pageFixture.page);
});

// ************TC-17: Complete a single todo by the checkbox
// Check the checkbox of a specific todo, identified by its text
When('I check the checkbox of the todo {string}', async function (todoText: string) {
  await pageFixture.markingTodos.checkTodo(todoText);
});

// Verify that a specific todo's checkbox is checked
Then('the todo {string} should be checked', async function (todoText: string) {
  const checkbox = pageFixture.markingTodos.getCheckboxLocator(todoText);
  await expect(checkbox).toBeChecked();
});

// Verify that the "Clear completed" button is visible
Then('the clear completed button should be visible', async function () {
  await expect(pageFixture.markingTodos.clearCompletedButton).toBeVisible();
});

// Click the "Completed" filter
When('I click the Completed filter', async function () {
  await pageFixture.markingTodos.clickCompletedFilter();
});

// Click the "Active" filter
When('I click the Active filter', async function () {
  await pageFixture.markingTodos.clickActiveFilter();
});

// Verify that the todo list is currently empty
Then('the todo list should be empty', async function () {
  const isEmpty = await pageFixture.markingTodos.isTodoListEmpty();
  expect(isEmpty).toBeTruthy();
});


//****************TC-18: Uncomplete a completed todo by the checkbox
// Uncheck the checkbox of a specific todo
When('I uncheck the checkbox of the todo {string}', async function (todoText: string) {
  await pageFixture.markingTodos.uncheckTodo(todoText);
});

// Verify that a specific todo's checkbox is unchecked
Then('the todo {string} should be unchecked', async function (todoText: string) {
  const checkbox = pageFixture.markingTodos.getCheckboxLocator(todoText);
  await expect(checkbox).not.toBeChecked();
});

// Verify that the "Clear completed" button is hidden
Then('the clear completed button should be hidden', async function () {
  await expect(pageFixture.markingTodos.clearCompletedButton).not.toBeVisible();
});

// **************TC-19: Clear all completed todo by check buttons
// Click the "Clear completed" button
When('I click the clear completed button', async function () {
  await pageFixture.markingTodos.clickClearCompletedButton();
});


// ************TC-20: Toggle all todos and mark them as completed
// Click the toggle-all button
When('I click the toggle-all button', async function () {
  await pageFixture.markingTodos.clickToggleAll();
});