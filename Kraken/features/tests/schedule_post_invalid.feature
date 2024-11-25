Feature: Crear una nueva publicación y programarla

@user4 @web
Scenario: E2.1 - Como usuario accedo a la plataforma Ghost, creo una publicación y la programo con una fecha invalida - Estrategia Pool a Priori
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E2.1"
  And I wait for 2 seconds
  And I am creating a new post on "E2.1"
  And I fill the title with "<TITLE_POST_INVALID>" and the content with "<CONTENT_POST_INVALID>" on "E2.1"
  When I want to schedule the post on "E2.1"
  And I wait for 1 seconds
  And I select the option to schedule for later on "E2.1"
  And I enter "<POST_DATE_INVALID>" and "<POST_TIME_INVALID>" as publication date on "E2.1"
  And I wait for 1 seconds
  And I press the button to finish configurating the post on "E2.1"
  And I wait for 1 seconds
  Then I should get a message error for invalid date on "E2.1"

@user5 @web
Scenario: E2.2 - Como usuario accedo a la plataforma Ghost, creo una publicación y la programo con una fecha invalida - Estrategia Pseudo-Aleatoria Dinámica
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E2.2"
  And I wait for 2 seconds
  And I am creating a new post on "E2.2"
  And I fill the title and the content with pseudo-aleatory data on "E2.2"
  When I want to schedule the post on "E2.2"
  And I wait for 1 seconds
  And I select the option to schedule for later on "E2.2"
  And I enter an invalid publication date with pseudo-aleatory data on "E2.2"
  And I wait for 1 seconds
  And I press the button to finish configurating the post on "E2.2"
  And I wait for 1 seconds
  Then I should get a message error for invalid date on "E2.2"

@user6 @web
Scenario: E2.3 - Como usuario accedo a la plataforma Ghost, creo una publicación y la programo con una fecha valida - Estrategia Datos Aleatorios
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E2.3"
  And I wait for 2 seconds
  And I am creating a new post on "E2.3"
  And I fill the title with "$name_1" and the content with "$string_1" on "E2.3"
  When I want to schedule the post on "E2.3"
  And I wait for 1 seconds
  And I select the option to schedule for later on "E2.3"
  And I enter "$stringDate_1" and "$stringDate_2" as publication date on "E2.3"
  And I wait for 1 seconds
  And I press the button to finish configurating the post on "E2.3"
  And I wait for 1 seconds
  Then I should get a message error for invalid date on "E2.3"