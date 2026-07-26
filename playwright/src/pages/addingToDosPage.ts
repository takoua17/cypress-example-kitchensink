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
    this.todoList = page.locator('.todo-list li');
    this.todoCounter = page.locator(".todo-count strong");
  }
  // Methode to navigate to the home page
  async navigateToHomePage() {
    await this.page.goto("/todo#/");

    await this.page.evaluate(() => {
      localStorage.clear();
      window.location.reload();
    });

  }

  // Method to add a new todo item
  async addTodo(todoText: string) {
    await this.inputField.fill(todoText);
  }

  // Method to press Enter
  async pressEnter() {
    await this.inputField.press("Enter");
  }

  // Method to get the text of the todo item
  async getTodoText(): Promise<string> {
    return (await this.todoList.first().textContent()) || "";
  }

  // Method to get the todo counter text
  async getTodoCounterText(): Promise<string> {
    return (await this.todoCounter.textContent()) || "";
  }

  // Methode to generate a string of 225 characters
  generateLongText(length: number = 225): string {
    return "a".repeat(length);
  }
}
