/* Fixture for managing the Playwright page instance across tests. 
 This allows for sharing the same page instance between different test files,
 */
import { Page } from "@playwright/test";
import { addingToDosPage } from "../pages/addingToDosPage";
import { DeletingToDosPage } from "../pages/deletingToDosPage";
import { EditingToDosPage } from "../pages/editingToDosPage";
import { MarkingTodosPage } from "../pages/markingToDosAsComAndIncompletePage";

export const pageFixture = {
  //@ts-ignore
  page: undefined as Page,
  //@ts-ignore
  addingToDos: undefined as addingToDosPage,
  //@ts-ignore
  deletingToDos: undefined as DeletingToDosPage,
  //@ts-ignore
  editingToDos: undefined as EditingToDosPage,
  //@ts-ignore
  markingTodos: undefined as MarkingTodosPage,
};
