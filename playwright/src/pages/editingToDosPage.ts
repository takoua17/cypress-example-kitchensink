import { Locator, Page } from "@playwright/test";

export class EditingToDosPage {
  readonly page: Page;
  readonly editInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editInput = page.locator(".todo-list li.editing .edit");
  }

  // Change the text in the edit input field
  async editText(newText: string) {
    await this.editInput.fill(newText);
  }

  // Method to press Escape
  async pressEscape() {
    await this.page.keyboard.press("Escape");
  }

  async pressEnter() {
    await this.editInput.press("Enter");
  }


  
}
