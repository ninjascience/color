
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};


exports.dahlia = function(req, res){
  res.render('dahlia/dahlia', { title: 'Dahlia' })
};


exports.rhone = function(req, res){
  res.render('rhone/rhone', { title: 'Rhone Street Gardens' })
};


exports.dahlia.process = function(req, res){
  res.render('dahlia/process', { title: 'Process' })
};
