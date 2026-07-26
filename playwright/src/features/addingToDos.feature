@AddingTodos
Feature: Adding todos
as a user i want to add todos to the list 

  @AddingASingleTodo
  Scenario Outline: Add a valid todo and display it correctly
    Given I navigate to the todo Application
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
