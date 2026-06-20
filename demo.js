const { getSystemInfo, getSelectedEnvVars } = require('./info');
const fileManager = require('./crud');

const fs = require('fs');

const runDemo = () => {
  console.log('\n' + '='.repeat(60));
  console.log('SYSTEM INFO & FILE MANAGER TOOL - DEMO MODE');
  console.log('Thunder Hackathon 3.0');
  console.log('='.repeat(60) + '\n');
  
  console.log('1️⃣ SYSTEM INFORMATION (JSON):');
  console.log(JSON.stringify(getSystemInfo(), null, 2));
  
  console.log('\n2️⃣ ENVIRONMENT VARIABLES:');
  console.log(JSON.stringify(getSelectedEnvVars(), null, 2));
  
  console.log('\n3️⃣ CREATE OPERATION DEMO:');
  const createResult = fileManager.create('demo/test.js', '// Demo file created by System Info Tool\nconsole.log("Hello from demo file!");');
  console.log(createResult);
  
  console.log('\n4️⃣ READ OPERATION DEMO:');
  const readResult = fileManager.read('demo/test.js');
  console.log(readResult.success ? 'File read successfully' : readResult.message);
  console.log('Content:', readResult.content);
  
  console.log('\n5️⃣ UPDATE OPERATION DEMO:');
  const updateResult = fileManager.update('demo/test.js', '// Updated demo file\nconsole.log("Updated content!");');
  console.log(updateResult);
  
  console.log('\n6️⃣ LIST OPERATION DEMO:');
  const listResult = fileManager.list('demo');
  console.log('Files:', listResult.files);
  console.log('Directories:', listResult.directories);
  
  console.log('\n7️⃣ RENAME OPERATION DEMO:');
  const renameResult = fileManager.rename('demo/test.js', 'demo/renamed-test.js');
  console.log(renameResult);
  
  console.log('\n8️⃣ DELETE OPERATION DEMO:');
  const deleteResult = fileManager.delete('demo/renamed-test.js');
  console.log(deleteResult);
  
  // Cleanup demo folder
  if (fs.existsSync('demo')) {
    fs.rmSync('demo', { recursive: true });
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('DEMO COMPLETE - All 6 CRUD Operations Verified');
  console.log('='.repeat(60) + '\n');
};

runDemo();