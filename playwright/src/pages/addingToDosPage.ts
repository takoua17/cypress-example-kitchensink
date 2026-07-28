import { Locator, Page } from "@playwright/test";

export class addingToDosPage {
  // Declare property for the page object
  readonly page: Page;
  readonly inputField: Locator;
  readonly todoList: Locator;
  readonly todoCounter: Locator;

  // Initialize page object in the constructor
  constructor(page: Page) {
    this.page = page;
    this.inputField = page.locator('[data-test="new-todo"]');
    this.todoList = page.locator(".todo-list li");
    this.todoCounter = page.locator(".todo-count strong");
  }
  // Methode to navigate to the home page
  async navigateToHomePage() {
    await this.page.goto("/todo#/");

    // Clear localStorage to remove any previously saved todos
    await this.page.evaluate(() => localStorage.clear());

    //Reload the page so the app reflects the cleared localStorage
    await this.page.reload();

    // Remove any default todos injected by the app after reload
    const count = await this.todoList.count();
    for (let i = 0; i < count; i++) {
      //Always target the first remaining item
      const firstItem = this.todoList.first();
      //Hover is required to reveal the delete button
      await firstItem.hover();
      // Click the delete button to remove this default todo
      await firstItem.locator(".destroy").click();
    }
  }

  // Method to add a new todo item
  async addTodo(todoText: string) {
    await this.inputField.fill(todoText);
  }

  // Method to press Enter
  async pressEnter() {
    await this.inputField.press("Enter");
  }

  // Method to get the todo counter text
  async getTodoCounterText(): Promise<string> {
    return (await this.todoCounter.textContent()) || "";
  }

  // Methode to generate a string of 225 characters
  generateLongText(length: number = 225): string {
    return "a".repeat(length);
  }

  // Simulate a real user click outside the input field, at a neutral
  // area of the page (top-left corner), to trigger a blur event
  async clickOutsideInputField() {
    await this.page.mouse.click(0, 0);
  }

  // Method to click on the input field
  async ClickOnInputField() {
    await this.inputField.click();
  }
}
