import * as fs from 'fs';
import * as path from 'path';

interface DirectoryStructure {
  name: string;
  type: 'file' | 'directory';
  children?: DirectoryStructure[];
}

function getDirectoryStructure(dirPath: string): DirectoryStructure {
  const stats = fs.statSync(dirPath);
  const info: DirectoryStructure = {
    name: path.basename(dirPath),
    type: stats.isDirectory() ? 'directory' : 'file'
  };

  if (stats.isDirectory()) {
    info.children = fs.readdirSync(dirPath).map(child => 
      getDirectoryStructure(path.join(dirPath, child))
    );
  }

  return info;
}

const rootDir = __dirname; // Use the current directory of the script
const structure = getDirectoryStructure(rootDir);

fs.writeFileSync('directory-structure.json', JSON.stringify(structure, null, 2), 'utf-8');
console.log('Directory structure has been saved to directory-structure.json');