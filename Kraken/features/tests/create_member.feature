Feature: Crear un nuevo miembro

@user3 @web
Scenario: E3 - Como usuario accedo a la plataforma Ghost, agregó la información de un nuevo miembro valido y se crea correctamente
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>"
  And I wait for 2 seconds
  And I go to the members page
  When I want to add a new member
  And I fill in the member name with "<MEMBER_NAME>" and email with "<MEMBER_EMAIL>"
  And I press the save button to create the new member
  And I wait for 1 seconds
  Then The member is successfully created and listed in the members page

@user4 @web
Scenario: E4 - Como usuario accedo a la plataforma Ghost, agregó la información de un nuevo miembro invalido, la corrijo y se crea correctamente
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>"
  And I wait for 2 seconds
  And I go to the members page
  When I want to add a new member
  And I fill in the member name with "<MEMBER_2_NAME>" and email with "<MEMBER_2_EMAIL_INVALID>"
  And I press the save button to create the new member
  And I wait for 1 seconds
  And I fill in the member name with "<MEMBER_2_NAME>" and email with "<MEMBER_2_EMAIL>"
  And I press the save button to create the new member
  And I wait for 1 seconds
  Then I should not see a red border indicating a validation error
  And The members is successfully created and listed in members page