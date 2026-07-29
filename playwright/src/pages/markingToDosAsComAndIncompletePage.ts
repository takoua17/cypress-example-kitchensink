
import { Locator, Page } from "@playwright/test";
import { pageFixture } from "../support/pageFixture";

export class MarkingTodosPage {
  readonly page: Page;
  readonly activeFilter: Locator;
  readonly completedFilter: Locator;
  readonly clearCompletedButton: Locator;
  readonly toggleAllButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.activeFilter = page.locator(".filters").getByText("Active", { exact: true });
    this.completedFilter = page.locator(".filters").getByText("Completed", { exact: true });
    this.clearCompletedButton = page.locator(".clear-completed");
    this.toggleAllButton = page.locator('label[for="toggle-all"]');

  }

  // Check the checkbox of a specific todo, identified by its text
  async checkTodo(todoText: string) {
    const item = pageFixture.deletingToDos.todoList.filter({ hasText: todoText });
    await item.locator(".toggle").check();
  }
 // Uncheck the checkbox of a specific todo, identified by its text
  async uncheckTodo(todoText: string) {
    const item = pageFixture.deletingToDos.todoList.filter({ hasText: todoText });
    await item.locator(".toggle").uncheck();
  }

  // Get the checkbox locator of a specific todo, identified by its text
  getCheckboxLocator(todoText: string): Locator {
    const item = pageFixture.deletingToDos.todoList.filter({ hasText: todoText });
    return item.locator(".toggle");
  }

  // Click the Active filter
  async clickActiveFilter() {
    await this.activeFilter.click();
  }

  // Click the Completed filter
  async clickCompletedFilter() {
    await this.completedFilter.click();
  }

  // Check if the todo list is currently empty
  async isTodoListEmpty(): Promise<boolean> {
    const count = await pageFixture.deletingToDos.todoList.count();
    return count === 0;
  }

 //Click Clear Completed Button
async clickClearCompletedButton() {
  await this.clearCompletedButton.click();
}

// Click the toggle-all button to check/uncheck all todos at once
  async clickToggleAll() {
    await this.toggleAllButton.click();
  }




}