const inquirer = require('inquirer');
const { displaySystemInfo, getSystemInfo, getSelectedEnvVars } = require('./info');
const fileManager = require('./crud');

const mainMenu = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View System Information',
        'View JSON System Info',
        'View Environment Variables',
        'Create File',
        'Read File',
        'Update File',
        'Delete File',
        'List Directory',
        'Rename File',
        'Exit'
      ]
    }
  ]);
  
  switch (answers.action) {
    case 'View System Information':
      displaySystemInfo();
      break;
    case 'View JSON System Info':
      console.log(JSON.stringify(getSystemInfo(), null, 2));
      break;
    case 'View Environment Variables':
      console.log(JSON.stringify(getSelectedEnvVars(), null, 2));
      break;
    case 'Create File':
      await handleCreate();
      break;
    case 'Read File':
      await handleRead();
      break;
    case 'Update File':
      await handleUpdate();
      break;
    case 'Delete File':
      await handleDelete();
      break;
    case 'List Directory':
      await handleList();
      break;
    case 'Rename File':
      await handleRename();
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit(0);
      return;
  }
  
  return mainMenu();
};

const handleCreate = async () => {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'filePath', message: 'File path:' },
    { type: 'input', name: 'content', message: 'File content:' }
  ]);
  console.log(JSON.stringify(fileManager.create(answers.filePath, answers.content), null, 2));
};

const handleRead = async () => {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'filePath', message: 'File path:' }
  ]);
  const result = fileManager.read(answers.filePath);
  if (result.success) {
    console.log(`\nContent of ${answers.filePath}:\n`);
    console.log(result.content);
  } else {
    console.log(result.message);
  }
};

const handleUpdate = async () => {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'filePath', message: 'File path:' },
    { type: 'input', name: 'content', message: 'New content:' }
  ]);
  console.log(JSON.stringify(fileManager.update(answers.filePath, answers.content), null, 2));
};

const handleDelete = async () => {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'filePath', message: 'File path to delete:' }
  ]);
  const { confirm } = await inquirer.prompt([
    { type: 'confirm', name: 'confirm', message: `Delete ${answers.filePath}?` }
  ]);
  if (confirm) {
    console.log(JSON.stringify(fileManager.delete(answers.filePath), null, 2));
  }
};

const handleList = async () => {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'directory', message: 'Directory (leave empty for current):', default: '' }
  ]);
  const result = fileManager.list(answers.directory);
  if (result.success) {
    console.log(`\nFiles in ${answers.directory || 'current'}:`);
    console.log(`  Files: ${result.files.join(', ') || 'None'}`);
    console.log(`  Directories: ${result.directories.join(', ') || 'None'}`);
  } else {
    console.log(result.message);
  }
};

const handleRename = async () => {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'oldPath', message: 'Current file path:' },
    { type: 'input', name: 'newPath', message: 'New file path:' }
  ]);
  console.log(JSON.stringify(fileManager.rename(answers.oldPath, answers.newPath), null, 2));
};

console.log(`
========================================
  SYSTEM INFO & FILE MANAGER TOOL
  Thunder Hackathon 3.0
========================================
`);

mainMenu().catch(err => {
  console.error('Error:', err.message);
});