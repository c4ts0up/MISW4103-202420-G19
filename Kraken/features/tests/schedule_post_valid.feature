Feature: Crear una nueva publicación y programarla

@user1 @web
Scenario: E1.1 - Como usuario accedo a la plataforma Ghost, creo una publicación y la programo con una fecha valida - Estrategia Pool a priori
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E1.1"
  And I wait for 2 seconds
  And I am creating a new post on "E1.1"
  And I fill the title with "<TITLE_POST>" and the content with "<CONTENT_POST>" on "E1.1"
  When I want to schedule the post on "E1.1"
  And I wait for 1 seconds
  And I select the option to schedule for later on "E1.1"
  And I enter "<POST_DATE>" and "<POST_TIME>" as publication date on "E1.1"
  And I wait for 1 seconds
  And I press the button to finish configurating the post on "E1.1"
  And I press the button to schedule the post on "E1.1"
  And I wait for 1 seconds
  Then The post is correctly scheduled on "E1.1"

@user2 @web
Scenario: E1.2 - Como usuario accedo a la plataforma Ghost, creo una publicación y la programo con una fecha valida - Estrategia Pseudo-Aleatoria Dinámica
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E1.2"
  And I wait for 2 seconds
  And I am creating a new post on "E1.2"
  And I fill the title and the content with pseudo-aleatory data on "E1.2"
  When I want to schedule the post on "E1.2"
  And I wait for 1 seconds
  And I select the option to schedule for later on "E1.2"
  And I enter a publication date with pseudo-aleatory data on "E1.2"
  And I press the button to finish configurating the post on "E1.2"
  And I press the button to schedule the post on "E1.2"
  Then The post is correctly scheduled on "E1.2"

@user3 @web
Scenario: E1.3 - Como usuario accedo a la plataforma Ghost, creo una publicación y la programo con una fecha valida - Estrategia Datos Aleatorios
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E1.3"
  And I wait for 2 seconds
  And I am creating a new post on "E1.3"
  And I fill the title with "$name_1" and the content with "$string_1" on "E1.3"
  When I want to schedule the post on "E1.3"
  And I wait for 1 seconds
  And I select the option to schedule for later on "E1.3"
  And I enter "$stringDate_1" and "$stringDate_2" as publication date on "E1.3"
  And I press the button to finish configurating the post on "E1.3"
  And I press the button to schedule the post on "E1.3"
  Then The post is correctly scheduled on "E1.3"