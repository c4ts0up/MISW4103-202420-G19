Feature: Crear una nueva publicación y programarla

@user1 @web
Scenario: E1 - Como usuario accedo a la plataforma Ghost, creo una publicación y la programo con una fecha valida
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>"
  And I wait for 2 seconds
  And I am creating a new post
  And I fill the title with "<TITLE_POST>" and the content with "<CONTENT_POST>"
  When I want to schedule the post
  And I wait for 1 seconds
  And I select the option to schedule for later
  And I enter "<POST_DATE>" and "<POST_TIME>" as publication date
  And I wait for 1 seconds
  And I press the button to finish configurating the post
  And I press the button to schedule the post
  And I wait for 1 seconds
  Then The post is correctly scheduled

@user2 @web
Scenario: E2 - Como usuario accedo a la plataforma Ghost, creo una publicación y la programo con una fecha invalida
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>"
  And I wait for 2 seconds
  And I am creating a new post
  And I fill the title with "<TITLE_POST_INVALID>" and the content with "<CONTENT_POST_INVALID>"
  When I want to schedule the post
  And I wait for 1 seconds
  And I select the option to schedule for later
  And I enter "<POST_DATE_INVALID>" and "<POST_TIME_INVALID>" as publication date
  And I wait for 1 seconds
  And I press the button to finish configurating the post
  And I wait for 1 seconds
  Then I should get a message error for invalid date