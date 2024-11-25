Feature: Crear un nuevo miembro

@user10 @web
Scenario: E4.1 - Como usuario accedo a la plataforma Ghost, agregó la información de un nuevo miembro invalido, la corrijo y se crea correctamente -  Estrategia Pool A Priori
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E4.1"
  And I wait for 2 seconds
  And I go to the members page on "E4.1"
  When I want to add a new member on "E4.1"
  And I fill in the member name with "<MEMBER_2_NAME>" and email with "<MEMBER_2_EMAIL_INVALID>" on "E4.1"
  And I press the save button to create the new member on "E4.1"
  And I wait for 1 seconds
  And I fill in again the member name with "<MEMBER_2_NAME>" and email with "<MEMBER_2_EMAIL>" on "E4.1"
  And I press the save button again to create the new member on "E4.1"
  And I wait for 1 seconds
  Then I should not see a red border indicating a validation error on "E4.1"
  And The member is still successfully created and listed in members page on "E4.1"

@user11 @web
Scenario: E4.2 - Como usuario accedo a la plataforma Ghost, agregó la información de un nuevo miembro invalido, la corrijo y se crea correctamente -  Estrategia Pseudo-Aleatoria Dinámica
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E4.2"
  And I wait for 2 seconds
  And I go to the members page on "E4.2"
  When I want to add a new member on "E4.2"
  And I fill in the member name and email with pseudo-aleatory with invalid data on "E4.2"
  And I press the save button to create the new member on "E4.2"
  And I wait for 1 seconds
  And I fill in again the member name and email with pseudo-aleatory data on "E4.2"
  And I press the save button again to create the new member on "E4.2"
  And I wait for 1 seconds
  Then I should not see a red border indicating a validation error on "E4.2"
  And The member is still successfully created and listed in members page on "E4.2"

@user12 @web
Scenario: E4.3 - Como usuario accedo a la plataforma Ghost, agregó la información de un nuevo miembro invalido, la corrijo y se crea correctamente -  Estrategia Datos Aleatorios
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E4.3"
  And I wait for 2 seconds
  And I go to the members page on "E4.3"
  When I want to add a new member on "E4.3"
  And I fill in the member name with "$name_1" and email with "$string_1" on "E4.3"
  And I press the save button to create the new member on "E4.3"
  And I wait for 1 seconds
  And I fill in again the member name with "$$name_1" and email with "$email_1" on "E4.3"
  And I press the save button again to create the new member on "E4.3"
  And I wait for 1 seconds
  Then I should not see a red border indicating a validation error on "E4.3"
  And The member is still successfully created and listed in members page on "E4.3"