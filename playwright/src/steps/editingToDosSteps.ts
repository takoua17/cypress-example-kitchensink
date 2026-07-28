import { Given, Then, When } from "@cucumber/cucumber";
import { pageFixture } from "../support/pageFixture";
import { EditingToDosPage } from "../pages/editingToDosPage";
import { expect } from "@playwright/test";
import { DeletingToDosPage } from "../pages/deletingToDosPage";

let EditingToDos: EditingToDosPage;

Given("I am ready to edit todos", async function () {
  pageFixture.editingToDos = new EditingToDosPage(pageFixture.page);

  // Also instantiate deletingToDos and stor it in pageFixture.editingToDos
  //since some steps used here(double-click, clear text) are defined in deletingToDosSteps.ts
  pageFixture.deletingToDos = new DeletingToDosPage(pageFixture.page);
});

// Type the new text into the edit input field
When("I edit the text to {string}", async function (newEditText: string) {
  await pageFixture.editingToDos.editText(newEditText);
  // Verify that the edit input now contains the new text
  const currentValue = await pageFixture.editingToDos.editInput.inputValue();
  expect(currentValue).toBe(newEditText);
});

// Press Escape to cancel the edit
When("I press Escape", async function () {
  await pageFixture.editingToDos.pressEscape();
});

// Verify that the edit textbox is visible with the expected text
Then(
  "the textbox should be visible with {string}",
  async function (expectedText: string) {
    await expect(pageFixture.deletingToDos.editInput).toHaveValue(expectedText);
  },
);

//Type the new text into the edit input field (used before confirming with Enter)
When("I change the text to {string}", async function (newText: string) {
  await pageFixture.editingToDos.editText(newText);
});

/// Press Enter on the edit input field to confirm the edit
When("I confirm the edit by pressing Enter", async function () {
  await pageFixture.editingToDos.pressEnter();
});

/// Verify that the todo with the updated text now appears in the list
Then(
  "the new todo {string} should be visible",
  async function (todoText: string) {
    const found = await pageFixture.deletingToDos.todoList
      .filter({ hasText: todoText })
      .count();
    expect(found).toBeGreaterThan(0);
  },
);
