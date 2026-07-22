Feature: Search automation for DemoQA Books

  Scenario: Search for an existing keyword
    Given the user is on the DemoQA Books books page
    When the user searches for an existing keyword
    Then related results should be displayed

  Scenario: Search for a non-existing keyword
    Given the user is on the DemoQA Books books page
    When the user searches for a non-existing keyword
    Then no search results should be displayed
