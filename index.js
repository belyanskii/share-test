// index.js start of file
var express = require('express');
var multer = require('multer'),
    bodyParser = require('body-parser'),
    path = require('path'),
    storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './uploads/')
      },
      filename: function (req, file, cb) {
          cb(null, file.originalname);
      }
    }),
    upload = multer({ storage: storage });

var app = new express();
app.set('port', (process.env.PORT || 5000));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/sssss', function(req, res){
  res.render('pindex');
});

app.post('/', upload.single('avatar'), function(req, res) {
    console.log(req.body); //form fields
    /* example output:
     { title: 'abc' }
     */
    console.log(req.file); //form files
    /* example output:
     { fieldname: 'upl',
     originalname: 'grumpy.png',
     encoding: '7bit',
     mimetype: 'image/png',
     destination: './uploads/',
     filename: '436ec561793aa4dc475a88e84776b1b9',
     path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
     size: 277056 }
     */
    res.status(204).end();
});

app.listen(app.get('port'), function(){
    console.log('listening on port ' + app.get('port'));
} );
