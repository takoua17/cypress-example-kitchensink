@editingToDos
Feature: Editingtodos
As a user I want to edit a to-do item so that I can change the text of an existing item

  Background:
    Given I navigate to the todo Application
    And I am ready to edit todos
    When I type "Walk the dog" into the input field
    And I press Enter
    Then the todo "Walk the dog" should appear in the list
    And the input field is empty
    And the todo counter should show "1"

  @CancelEditByEscape
  Scenario: Cancel editing a todo by pressing escape
    When I double-click on the todo to enter edit mode
    And I clear all the text
    And I edit the text to "Walk the cat"
    And I press Escape
    Then the todo "Walk the dog" should appear in the list
    And the todo counter should show "1"

  @EditTodoByDoubleClickAndEnter
  Scenario: Edit a todo by double-clicking and confirm with Enter
    When I double-click on the todo to enter edit mode
    Then the textbox should be visible with "Walk the dog"
    When I change the text to "Walk the cat"
    And I confirm the edit by pressing Enter
    Then the new todo "Walk the cat" should be visible

  @SaveEditOnBlur
  Scenario: Save edit when clicking outside the input (blur) with new text
    When I double-click on the todo to enter edit mode
    Then the textbox should be visible with "Walk the dog"
    When I change the text to "Walk the cat"
    And I click outside the input field
    Then the new todo "Walk the cat" should be visible
    And the todo "Walk the dog" should no longer be visible
