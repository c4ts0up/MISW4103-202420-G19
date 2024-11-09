const { execFile } = require('child_process');
const path = require('path');

// Rutas a los archivos de pruebas
const testFiles = [
  path.join(__dirname, 'tests', 'E1.js'),
  path.join(__dirname, 'tests', 'E2.js'),
  path.join(__dirname, 'tests', 'E3.js'),
  path.join(__dirname, 'tests', 'E4.js'),
  path.join(__dirname, 'tests', 'E5.js'),
  path.join(__dirname, 'tests', 'E6.js'),
];

// Función para ejecutar cada prueba de forma secuencial
const runTestFiles = (files, index = 0) => {
  if (index >= files.length) {
    console.log('Todas las pruebas se han ejecutado.');
    return;
  }

  const filePath = files[index];
  console.log(`Ejecutando ${filePath}...`);

  execFile('node', [filePath], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar ${filePath}: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr de ${filePath}: ${stderr}`);
    }
    console.log(`stdout de ${filePath}: ${stdout}`);
    console.log(`Finalizada la ejecución de ${filePath}\n`);

    // Llamada recursiva para el siguiente archivo
    runTestFiles(files, index + 1);
  });
};

// Iniciar ejecución de archivos de prueba
runTestFiles(testFiles);
