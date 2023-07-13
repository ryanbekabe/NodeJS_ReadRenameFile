const fs = require('fs');
const path = require('path');

const notifDir = 'notif';

fs.readdir(notifDir, (err, files) => {
  if (err) throw err;

  const txtFiles = files.filter(f => f.endsWith('.txt'));

  // Get oldest modified .txt file
  const oldestFile = txtFiles.sort((a, b) => {
    return fs.statSync(path.join(notifDir, a)).mtimeMs - 
           fs.statSync(path.join(notifDir, b)).mtimeMs;
  })[0];

  if (oldestFile) {
    const filePath = path.join(notifDir, oldestFile);

    // Read and print file contents
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err;
      console.log(data);

      // Rename .txt to .log  
      fs.rename(filePath, filePath.replace('.txt', '.log'), err => {
        if (err) throw err;
      });
    });
  }
});
