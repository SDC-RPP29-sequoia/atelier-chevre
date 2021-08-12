const path = require('path');

require( 'ignore-styles' );
require( '@babel/register')( {
  configFile: path.resolve( __dirname, '../.babelrc' ),
});

require('./express.js');
