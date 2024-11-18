Feature: Crear un nuevo miembro

@user3 @web
Scenario: E3 - Como usuario accedo a la plataforma Ghost, agregó la información de un nuevo miembro valido y se crea correctamente
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E3"
  And I wait for 2 seconds
  And I go to the members page on "E3"
  When I want to add a new member on "E3"
  And I fill in the member name with "<MEMBER_NAME>" and email with "<MEMBER_EMAIL>" on "E3"
  And I press the save button to create the new member on "E3"
  And I wait for 1 seconds
  Then The member is successfully created and listed in the members page on "E3"