const fs = require('fs');
const path = require('path');

const notifDir = 'notif';

fs.readdir(notifDir, (err, files) => {
  if (err) throw err;

  const txtFiles = files.filter(f => f.endsWith('.txt'));

  // Check if there is a new .txt file
  const newFile = txtFiles.sort((a, b) => {
    return fs.statSync(path.join(notifDir, b)).mtimeMs - fs.statSync(path.join(notifDir, a)).mtimeMs;
  })[0];

  if (newFile) {
    const filePath = path.join(notifDir, newFile);
    
    // Read and print file contents
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err;
      console.log(data);
      
      // Rename file to .log
      fs.rename(filePath, filePath.replace('.txt', '.log'), err => {
        if (err) throw err; 
      });
    });
  }
});
