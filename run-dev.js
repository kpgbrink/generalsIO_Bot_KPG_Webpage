const child_process = require('child_process');

child_process.exec('nodemon --ignore app/ server.js', {stdio: 'inherit',});
child_process.exec('webpack-dev-server -el-progress --history-api-fallback', {stdio: 'inherit',});
