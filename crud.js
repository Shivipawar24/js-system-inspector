const fs = require('fs');
const path = require('path');

const CodeFileManager = {
  basePath: process.cwd(),
  
  create(filePath, content) {
    try {
      const fullPath = path.join(this.basePath, filePath);
      const dir = path.dirname(fullPath);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(fullPath, content, 'utf8');
      return { success: true, message: `File created: ${filePath}`, path: fullPath };
    } catch (error) {
      return { success: false, message: `Error creating file: ${error.message}` };
    }
  },
  
  read(filePath) {
    try {
      const fullPath = path.join(this.basePath, filePath);
      
      if (!fs.existsSync(fullPath)) {
        return { success: false, message: `File not found: ${filePath}` };
      }
      
      const content = fs.readFileSync(fullPath, 'utf8');
      return { success: true, content, path: fullPath };
    } catch (error) {
      return { success: false, message: `Error reading file: ${error.message}` };
    }
  },
  
  update(filePath, content) {
    try {
      const fullPath = path.join(this.basePath, filePath);
      
      if (!fs.existsSync(fullPath)) {
        return { success: false, message: `File not found: ${filePath}` };
      }
      
      fs.writeFileSync(fullPath, content, 'utf8');
      return { success: true, message: `File updated: ${filePath}`, path: fullPath };
    } catch (error) {
      return { success: false, message: `Error updating file: ${error.message}` };
    }
  },
  
  delete(filePath) {
    try {
      const fullPath = path.join(this.basePath, filePath);
      
      if (!fs.existsSync(fullPath)) {
        return { success: false, message: `File not found: ${filePath}` };
      }
      
      fs.unlinkSync(fullPath);
      return { success: true, message: `File deleted: ${filePath}` };
    } catch (error) {
      return { success: false, message: `Error deleting file: ${error.message}` };
    }
  },
  
  list(directory = '') {
    try {
      const fullPath = path.join(this.basePath, directory);
      
      if (!fs.existsSync(fullPath)) {
        return { success: false, message: `Directory not found: ${directory}` };
      }
      
      const items = fs.readdirSync(fullPath, { withFileTypes: true });
      const result = {
        files: [],
        directories: []
      };
      
      items.forEach(item => {
        if (item.isDirectory()) {
          result.directories.push(item.name);
        } else {
          result.files.push(item.name);
        }
      });
      
      return { success: true, ...result };
    } catch (error) {
      return { success: false, message: `Error listing directory: ${error.message}` };
    }
  },
  
  rename(oldPath, newPath) {
    try {
      const fullOldPath = path.join(this.basePath, oldPath);
      const fullNewPath = path.join(this.basePath, newPath);
      
      if (!fs.existsSync(fullOldPath)) {
        return { success: false, message: `File not found: ${oldPath}` };
      }
      
      const newDir = path.dirname(fullNewPath);
      if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir, { recursive: true });
      }
      
      fs.renameSync(fullOldPath, fullNewPath);
      return { success: true, message: `File renamed from ${oldPath} to ${newPath}` };
    } catch (error) {
      return { success: false, message: `Error renaming file: ${error.message}` };
    }
  }
};

if (require.main === module) {
  console.log('Code File Manager (CRUD Operations)');
  console.log('Usage:');
  console.log('  const manager = require("./crud");');
  console.log('  manager.create("test.js", "code")');
  console.log('  manager.read("test.js")');
  console.log('  manager.update("test.js", "new code")');
  console.log('  manager.delete("test.js")');
  console.log('  manager.list("")');
}

module.exports = CodeFileManager;