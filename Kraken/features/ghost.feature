Feature: Configurar lenguaje de publicación

@user5 @web
Scenario: E5 - Como usuario accedo a la plataforma Ghost, voy a la configuración y cambio el idioma por un codigo valido
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>"
  And I wait for 2 seconds
  And I navigate to the settings page
  And I wait for 2 seconds
  And I navigate to the language settings page
  And I wait for 2 seconds
  When I click the Edit button for language settings
  And I change the site language to "<LANGUAGE_VALID>"
  And I wait for 1 seconds
  Then The language is updated successfully

@user6 @web
Scenario: E6 - Como usuario accedo a la plataforma Ghost, voy a la configuración y cambio el idioma por un codigo invalido
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>"
  And I wait for 2 seconds
  And I navigate to the settings page
  And I wait for 2 seconds
  And I navigate to the language settings page
  And I wait for 2 seconds
  When I click the Edit button for language settings
  And I change the site language to "<LANGUAGE_INVALID>"
  And I wait for 1 seconds
  Then The update should fail due to invalid language