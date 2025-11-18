import { readdir, rename } from 'fs/promises';
import { join } from 'path';

const gamesDir = './public/games';

const shuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const main = async () => {
  const files = await readdir(gamesDir);
  const jsonFiles = files.filter(f => f.endsWith('.json')).sort();
  
  const numbers = jsonFiles.map(f => parseInt(f.replace('.json', ''), 10));
  const shuffled = shuffle(numbers);
  
  const tempPrefix = 'temp_';
  
  for (let i = 0; i < jsonFiles.length; i++) {
    const oldName = jsonFiles[i];
    const tempName = `${tempPrefix}${oldName}`;
    await rename(join(gamesDir, oldName), join(gamesDir, tempName));
  }
  
  const tempFiles = await readdir(gamesDir);
  const tempJsonFiles = tempFiles.filter(f => f.startsWith(tempPrefix) && f.endsWith('.json')).sort();
  
  for (let i = 0; i < tempJsonFiles.length; i++) {
    const tempName = tempJsonFiles[i];
    const newNumber = shuffled[i].toString().padStart(3, '0');
    const newName = `${newNumber}.json`;
    await rename(join(gamesDir, tempName), join(gamesDir, newName));
  }
  
  console.log(`Randomized ${jsonFiles.length} files`);
};

main().catch(console.error);

