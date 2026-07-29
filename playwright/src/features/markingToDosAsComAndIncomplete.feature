@markingTodos
Feature: Marking todos as complete or incomplete
as a user, I want to mark todos as complete or incomplete so that 
I can track my progress

  Background:
    Given I navigate to the todo Application
    And I am ready to mark todos
    When I type "Walk the dog" into the input field
    And I press Enter
    Then the todo "Walk the dog" should appear in the list

  @CompleteSingleTodoByCheckbox
  Scenario: Complete a single todo by the checkbox
    When I check the checkbox of the todo "Walk the dog"
    Then the todo "Walk the dog" should be checked
    And the todo counter should show "0"
    And the clear completed button should be visible
    When I click the Completed filter
    Then the todo "Walk the dog" should appear in the list
    When I click the Active filter
    Then the todo list should be empty

  @UncompleteATodoByCheckbox
  Scenario: Uncomplete a completed todo by the checkbox
    When I check the checkbox of the todo "Walk the dog"
    Then the todo "Walk the dog" should be checked
    And the todo counter should show "0"
    When I uncheck the checkbox of the todo "Walk the dog"
    Then the todo "Walk the dog" should be unchecked
    And the todo counter should show "1"
    And the clear completed button should be hidden

  @ClearAllCompletedTodosByCheckButtons
  Scenario: Clear all completed todo by check buttons (marking them completed)
    When I type "Practice sport" into the input field
    And I press Enter
    Then the todo "Practice sport" should appear in the list
    And the input field is empty
    When I check the checkbox of the todo "Walk the dog"
    Then the todo "Walk the dog" should be checked
    When I check the checkbox of the todo "Practice sport"
    Then the todo "Practice sport" should be checked
    And the todo counter should show "0"
    And the clear completed button should be visible
    When I click the clear completed button
    Then the todo "Walk the dog" should no longer be visible
    And the todo "Practice sport" should no longer be visible

  @ToggleAllTodosAsCompleted
  Scenario: Toggle all todos and mark them as completed
    When I type "Practice sport" into the input field
    And I press Enter
    Then the todo "Practice sport" should appear in the list
    When I click the toggle-all button
    Then the todo "Walk the dog" should be checked
    And the todo "Practice sport" should be checked
    And the todo counter should show "0"
    And the clear completed button should be visible
    When I click the Active filter
    Then the todo list should be empty

@ToggleAllTodosBackToIncomplete
Scenario: Toggle all todos back to incomplete status
  When I type "Practice sport" into the input field
  And I press Enter
  Then the todo "Practice sport" should appear in the list
  When I click the toggle-all button
  Then the todo "Walk the dog" should be checked
  And the todo "Practice sport" should be checked
  And the todo counter should show "0"
  When I click the toggle-all button
  Then the todo "Walk the dog" should be unchecked
  And the todo "Practice sport" should be unchecked
  And the todo counter should show "2"
  And the clear completed button should be hidden
