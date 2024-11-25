Feature: Configurar lenguaje de publicación

@user16 @web
Scenario: E6.1 - Como usuario accedo a la plataforma Ghost, voy a la configuración y cambio el idioma por un codigo invalido - Estrategia Pool A Priori
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E6.1"
  And I wait for 2 seconds
  And I navigate to the settings page on "E6.1"
  And I wait for 2 seconds
  And I navigate to the language settings page on "E6.1"
  And I wait for 2 seconds
  When I click the Edit button for language settings on "E6.1"
  And I change the site language to "<LANGUAGE_INVALID>" on "E6.1"
  And I save the configuration with the new language on "E6.1"
  And I wait for 1 seconds
  Then The update should fail due to invalid language on "E6.1"

@user17 @web
Scenario: E6.2 - Como usuario accedo a la plataforma Ghost, voy a la configuración y cambio el idioma por un codigo invalido - Estrategia Pseudo-Aleatoria Dinámica
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E6.2"
  And I wait for 2 seconds
  And I navigate to the settings page on "E6.2"
  And I wait for 2 seconds
  And I navigate to the language settings page on "E6.2"
  And I wait for 2 seconds
  When I click the Edit button for language settings on "E6.2"
  And I change the site language with pseudo-aleatory invalid data on "E6.2"
  And I save the configuration with the new language on "E6.2"
  And I wait for 1 seconds
  Then The update should fail due to invalid language on "E6.2"

@user18 @web
Scenario: E6.3 - Como usuario accedo a la plataforma Ghost, voy a la configuración y cambio el idioma por un codigo invalido - Estrategia Datos Aleatorios
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E6.3"
  And I wait for 2 seconds
  And I navigate to the settings page on "E6.3"
  And I wait for 2 seconds
  And I navigate to the language settings page on "E6.3"
  And I wait for 2 seconds
  When I click the Edit button for language settings on "E6.3"
  And I change the site language to "$string_1" on "E6.3"
  And I save the configuration with the new language on "E6.3"
  And I wait for 1 seconds
  Then The update should fail due to invalid language on "E6.3"