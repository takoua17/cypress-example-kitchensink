import { Given, Then, When } from "@cucumber/cucumber";

import { pageFixture } from "../support/pageFixture";
import { expect } from "@playwright/test";
import { DeletingToDosPage } from "../pages/deletingToDosPage";

let DeletingToDos: DeletingToDosPage;

/* Create a new instance of the DeletingToDosPage class and store it 
in pageFixture.deletingToDos. Storing it in the shared pageFixture 
(instead of a local variable) allows this instance to be reused 
across different step definition files, not just within this one.
*/
Given("I am ready to delete todos", async function () {
  pageFixture.deletingToDos = new DeletingToDosPage(pageFixture.page);
});

When("I hover over the todo item {string}", async function (todoItem) {
  // Hover over the todo item
  await pageFixture.deletingToDos.hoverOverTodoItem();
  // Ensure the delete button is visible
  await expect(pageFixture.deletingToDos.deleteButton).toBeVisible();
});

When("I click the delete button", async function () {
  // Click the delete button
  await pageFixture.deletingToDos.clickDeleteButton();
});

Then(
  "the todo {string} should no longer be visible",
  async function (todoText) {
    // Filter the todo list to find any item matching the deleted text.
    // If the count is 0, it confirms the todo has been successfully
    // removed and is no longer visible.
    await expect(
      pageFixture.deletingToDos.todoList.filter({ hasText: todoText }),
    ).toHaveCount(0);
  },
);

Then("the footer should be hidden", async function () {
  // Check that the footer Locator has a count of 0, indicating it is hidden
  await expect(pageFixture.deletingToDos.footerFilter).not.toBeVisible();
});

// Double-click on the todo item to enter edit mode
When("I double-click on the todo to enter edit mode", async function () {
  await pageFixture.deletingToDos.doubleClickTodoItem();
});

// clearing the text in the todo item
When("I clear all the text", async function () {
  await pageFixture.deletingToDos.clearTodoItemText();
});

When("I hover over the todo {string}", async function (todoText: string) {
  await pageFixture.deletingToDos.hoverOverSpecificTodo(todoText); 
});

