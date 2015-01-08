(function() {
  var main, _ref2;

  console.log("**************\n* automation *\n**************\n");

  _ref2 = require("./../lib/shell-helper");

  main = function() {
    _ref2.series(["node ./../app/app"], function(err) {
      console.log(err);
      main();
    });
  };

  main();

}).call(this);
