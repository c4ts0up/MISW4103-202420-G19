# Playwright Suite

## Funcionalidad
Suite de pruebas en Playwright + TypeScript para Ghost con toma de _screenshots_ y logging de acciones.

## Herramientas y versiones
| Herramienta | Versión |
|-------------|---------|
| Node.js     | 18.20.4 |
| NPM         | 10.7.0  |

## Formato screenshots
Los screenshots tomados durante la ejecución de las pruebas se almacenan de la siguiente forma:

```
<evidence.baseDirectory>
|   - <sut.version>
|   |   - <browserName>
|   |   |   - <test identifier>
|   |   |   |   - <evidence 1>.png
|   |   |   |   - <evidence 2>.png
|   |   |   |   ...
```

## Instalación y ejecución
1. Úbicate en el directorio base del `PlaywrightSuite` (`./PlaywrightSuite` desde la raíz del proyecto en Git)
2. ``npm install``
3. ``npx playwright install``
4. Despliega localmente Ghost en la versión deseada (x.y.z). Ten presente la URL
5. Modifica `use.baseUrl` en `playwright.config.ts` para usar la URL de tu despliegue local.
6. Modifica `sut.version` en `./tests/config/config.ts` para usar la versión de tu despliegue local (x.y.z)
7. Accede al servicio Ghost desplegado localmente a través de un navegador y haz los siguientes pasos
   1. Crea el sitio con un título, un usuario de administrador y una contraseña de administrador
   2. Crea un miembro con el nombre `test` y correo `test@mail.com`
8. Modifica `tests/data/admin.ts` e incluye el usuario de administrador del servicio Ghost y la contraseña en `adminData.username` y `adminData.password`, respectivamente.
9. ``npm run test`` para correr toda la suite de pruebas

## Configuraciones adicionales
Esta suite de pruebas cuenta con configuraciones adicionales que son útiles para distintas ejecuciones.

### Configuraciones de Playwright 
En el archivo ``playwright.config.ts`` se podrán modificar opciones como: número de _retries_ de pruebas fallidas
(actualmente en 2), si se permite completa paralelización de las pruebas (actualmente _sí_), URL base del despliegue
(actualmente ``http://localhost:3005``) y para qué navegadores se ejecutan las pruebas (actualmente, `chromium` y 
`firefox`, ambos de escritorio), entre otras.

### Configuraciones propias de la suite
En el archivo ``tests/config/config.ts`` hay opciones adicionales propias a los requerimientos planteados en el curso:
- ``evidence.*``: configuraciones de la generación de evidencias (_screenshots_).
- ``data.*``: fija la estrategia de generación de datos de prueba para cada uno de los "esquemas". Cambiar valor de enumeración para cambiar estrategia.
- ``*Page.*``: atributos necesarios para cada PageObject .