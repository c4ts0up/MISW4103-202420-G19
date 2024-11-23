Feature: Crear un nuevo miembro

@user7 @web
Scenario: E3.1 - Como usuario accedo a la plataforma Ghost, agregó la información de un nuevo miembro valido y se crea correctamente -  Estrategia Pool a Priori
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E3.1"
  And I wait for 2 seconds
  And I go to the members page on "E3.1"
  When I want to add a new member on "E3.1"
  And I fill in the member name with "<MEMBER_NAME>" and email with "<MEMBER_EMAIL>" on "E3.1"
  And I press the save button to create the new member on "E3.1"
  And I wait for 1 seconds
  Then The member is successfully created and listed in members page on "E3.1"

@user8 @web
Scenario: E3.2 - Como usuario accedo a la plataforma Ghost, agregó la información de un nuevo miembro valido y se crea correctamente -  Estrategia Pseudo-Aleatoria Dinámica
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E3.2"
  And I wait for 2 seconds
  And I go to the members page on "E3.2"
  When I want to add a new member on "E3.2"
  And I fill in the member name and email with pseudo-aleatory data on "E3.2"
  And I press the save button to create the new member on "E3.2"
  And I wait for 1 seconds
  Then The member is successfully created and listed in members page on "E3.2"

@user9 @web
Scenario: E3.3 - Como usuario accedo a la plataforma Ghost, agregó la información de un nuevo miembro valido y se crea correctamente -  Estrategia Datos Aleatorios
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E3.3"
  And I wait for 2 seconds
  And I go to the members page on "E3.3"
  When I want to add a new member on "E3.3"
  And I fill in the member name with "$name_1" and email with "$email_1" on "E3.3"
  And I press the save button to create the new member on "E3.3"
  And I wait for 1 seconds
  Then The member is successfully created and listed in members page on "E3.3"