var es = require('event-stream');

module.exports = function(opts){

  function modifyFile(file, cb){
    if (file.isNull()) return cb(null, file); 

    var str = file.contents.toString('utf8');
    file.contents = new Buffer(str);
    cb(null, file);
  }

  return es.map(modifyFile);
};