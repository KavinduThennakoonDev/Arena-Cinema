let port = 8080;
let express = require('express');
let app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(port, () => {
  console.log('Running on port: ' + port);
});
