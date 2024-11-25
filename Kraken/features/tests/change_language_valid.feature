Feature: Configurar lenguaje de publicación

@user13 @web
Scenario: E5.1 - Como usuario accedo a la plataforma Ghost, voy a la configuración y cambio el idioma por un codigo valido -  Estrategia Pool A Priori
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E5.1"
  And I wait for 2 seconds
  And I navigate to the settings page on "E5.1"
  And I wait for 2 seconds
  And I navigate to the language settings page on "E5.1"
  And I wait for 2 seconds
  When I click the Edit button for language settings on "E5.1"
  And I change the site language to "<LANGUAGE_VALID>" on "E5.1"
  And I save the configuration with the new language on "E5.1"
  And I wait for 1 seconds
  Then The language is updated successfully on "E5.1"

@user14 @web
Scenario: E5.2 - Como usuario accedo a la plataforma Ghost, voy a la configuración y cambio el idioma por un codigo valido -  Estrategia Pseudo-Aleatoria Dinámica
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E5.2"
  And I wait for 2 seconds
  And I navigate to the settings page on "E5.2"
  And I wait for 2 seconds
  And I navigate to the language settings page on "E5.2"
  And I wait for 2 seconds
  When I click the Edit button for language settings on "E5.2"
  And I change the site language with pseudo-aleatory data on "E5.2"
  And I save the configuration with the new language on "E5.2"
  And I wait for 1 seconds
  Then The language is updated successfully on "E5.2"

@user15 @web
Scenario: E5.3 - Como usuario accedo a la plataforma Ghost, voy a la configuración y cambio el idioma por un codigo valido -  Estrategia Datos Aleatorios
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E5.3"
  And I wait for 2 seconds
  And I navigate to the settings page on "E5.3"
  And I wait for 2 seconds
  And I navigate to the language settings page on "E5.3"
  And I wait for 2 seconds
  When I click the Edit button for language settings on "E5.3"
  And I change the site language to "$string_1" on "E5.3"
  And I save the configuration with the new language on "E5.3"
  And I wait for 1 seconds
  Then The language is updated successfully on "E5.3"