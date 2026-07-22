Feature: Login automation for DemoQA Books

  Scenario: Successful login with valid credentials
    Given the user is on the DemoQA Books login page
    When the user submits valid credentials
    Then the user should be redirected to the profile page

  Scenario: Failed login with invalid credentials
    Given the user is on the DemoQA Books login page
    When the user submits invalid credentials
    Then an authentication error message should be visible
