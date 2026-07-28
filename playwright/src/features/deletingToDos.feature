@deletingToDos
Feature: Deleting todos
as a user, I want to delete a to-do item so that I can remove items I no longer need

  Background:
    Given I navigate to the todo Application
    And I am ready to delete todos
    When I type "Walk the dog" into the input field
    And I press Enter
    Then the todo "Walk the dog" should appear in the list
    And the input field is empty
    And the todo counter should show "1"

  @deleteSingleToDosByDeleteButton
  Scenario: delete a single to-do item by clicking the delete button
    When I hover over the todo item "Walk the dog"
    And I click the delete button
    Then the todo "Walk the dog" should no longer be visible
    And the footer should be hidden

  @TodoNotDeletedByEnter
  Scenario: A todo should not be deleted by clearing its text and pressing Enter
    When I double-click on the todo to enter edit mode
    And I clear all the text
    And I press Enter
    Then the todo "Walk the dog" should appear in the list
    And the todo counter should show "1"
  # This test scenario is expected to fail (confirmed bug - Bug Ticket N°3)

  @TodoNotDeletedByBlur
  Scenario: A todo should not be deleted when the edit field is cleared and blurred (without pressing Enter)
    When I double-click on the todo to enter edit mode
    And I clear all the text
    And I click outside the input field
    Then the todo "Walk the dog" should appear in the list
    And the todo counter should show "1"
    # This test scenario is expected to fail (confirmed bug - Bug Ticket N°2)

  @DeletingSpecificTodoFromMultiple
  Scenario: Delete a specific todo from multiple todos (by the delete button)
    When I type "Practice sport" into the input field
    And I press Enter
    Then the todo "Practice sport" should appear in the list
    And the input field is empty
    And the todo counter should show "2"
    When I hover over the todo "Practice sport"
    And I click the delete button
    Then the todo "Practice sport" should no longer be visible
    And the todo "Walk the dog" should appear in the list
    And the todo counter should show "1"

 