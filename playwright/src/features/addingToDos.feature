@AddingTodos
Feature: Adding todos
as a user i want to add todos to the list 

  Background:
    Given I navigate to the todo Application

  @AddingASingleTodo
  Scenario Outline: Add a valid todo and display it correctly
    When I type "<input>" into the input field
    And I press Enter
    Then the todo "<input>" should appear in the list
    And the input field is empty
    And the todo counter should show "1"

    Examples:
      | input                     | description            |
      | Walk the dog              | normal text            |
      | Walking the @dog & (cat)! | special characters     |
      | A                         | single character (min) |
      | LONG_TEXT_225             | long text (225 chars)  |

  @ShouldNotAddSingleTodoWithClickOutside
  # This test scenario is expected to fail (confirmed bug - Bug Ticket N°1)
  Scenario:  A todo should not be added by blurring the input (without pressing Enter)
    When I type "Walk the dog" into the input field
    And I click outside the input field
    Then the todo "Walk the dog" should not appear in the list
    And the input field should still contain "Walk the dog"
    And the todo counter should show "0"

  @AddingmultipleTodos
  Scenario: Add multiple todos and display them correctly
    When I type "Walk the dog" into the input field
    And I press Enter
    And I type "Practice sport" into the input field
    And I press Enter
    Then the todo "Walk the dog" should appear in the list
    And the todo "Practice sport" should appear in the list
    And the input field is empty
    And the todo counter should show "2"

  @AddingEmptyTodos
  Scenario: Attempt to add an empty todo
    When I click on the input field
    And I press Enter
    Then no todo should be added to the list

  @AddingDuplicateTodo
  Scenario: Add a duplicate todo
    When I type "Go to the GYM" into the input field
    And I press Enter
    And I type "Go to the GYM" into the input field
    And I press Enter
    Then both todos "Go to the GYM" should appear in the list as two separate entries
    And the todo counter should show "2"

  @AddingTodoWithWhitespace
  Scenario: Trim whitespace from a new todo
    When I type "   Todo with spaces   " into the input field
    And I press Enter
    Then the todo "Todo with spaces" should appear in the list
    And the todo counter should show "1"
