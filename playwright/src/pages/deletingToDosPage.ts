import { Locator, Page } from "@playwright/test";

export class DeletingToDosPage {
  readonly page: Page;
  readonly todoList: Locator;
  readonly todoItem: Locator;
  readonly editInput: Locator;
  readonly deleteButton: Locator;
  readonly footerFilter: Locator;
  private currentTodoItem?: Locator;

  constructor(page: Page) {
    this.page = page;
    this.todoList = page.locator(".todo-list li");
    this.todoItem = this.todoList.first();
    this.editInput = page.locator(".todo-list li.editing .edit");
    this.deleteButton = page.locator(".destroy");
    this.footerFilter = page.locator(".footer");
  }

  // Hover over the first todo item
  async hoverOverTodoItem() {
    await this.todoItem.hover();
  }

  async hoverOverSpecificTodo(todoText: string) {
    // Find the todo item that matches the given text
    const item = this.todoList.filter({ hasText: todoText });

    // Hover over it
    await item.hover();

    // Save this item so other methods (like clickDeleteButton)
    // know which todo was targeted
    this.currentTodoItem = item;
  }

// Click the delete button of the correct todo item.
// If a specific todo was previously targeted with 
// hoverOverSpecificTodo(), use that one. Otherwise, fall back to 
// the first todo in the list by default.
  async clickDeleteButton() {
    const target = this.currentTodoItem || this.todoItem;
    await target.locator(".destroy").click();
  }

  // double-click on the todo item to enter edit mode
  async doubleClickTodoItem() {
    await this.todoItem.dblclick();
  }

  // Clear all the text in the todo item
  async clearTodoItemText() {
    await this.editInput.clear();
  }




  
}
