
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};


exports.dahlia = function(req, res){
  res.render('dahlia/dahlia', { title: 'Dahlia' })
};
