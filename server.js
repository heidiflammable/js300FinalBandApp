'use strict';
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */


// Module dependencies.
var application_root = __dirname,
  express = require( 'express' ), //Web framework
  bodyParser = require('body-parser'), //Parser for reading request body
  path = require( 'path' ), //Utilities for dealing with file paths
  mongoose = require( 'mongoose' );

//Create server
var app = express();

///Connect to database
mongoose.connect( 'mongodb://localhost/group_database' );


//Where to serve static content
app.use( express.static( path.join( application_root, 'site') ) );

app.use( bodyParser.urlencoded({ extended: false }));


//Schemas
var Band = new mongoose.Schema({
  artist: String,
  album: String,
  song: String,
  genre: String
});

//Models
var BandModel = mongoose.model( 'Band', Band );

// Configure server
app.configure( function() {
  //parses request body and populates request.body
  app.use( express.bodyParser() );

  //checks request.body for HTTP method overrides
  app.use( express.methodOverride() );

  //perform route lookup based on url and HTTP method
  app.use( app.router );

  //Where to serve static content
  app.use( express.static( path.join( application_root, 'site') ) );

  //Show all errors in development
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
//this function take url as first param and a func and sedond
app.get( '/api', function( request, response ) {
  response.send( 'The API is running' );
});

//Get a list of all bands
app.get( '/api/bands', function( request, response ) {
  return BandModel.find( function( err, bands ) {
    if( !err ) {
      return response.send( bands );
    } else {
      return console.error( err );
    }
  });
});

//Backbone route to get a single band by id
app.get( '/api/bands/:id', function( request, response ) {
  return BandModel.findById( request.params.id, function( err, band ) {
    if( !err ) {
      return response.send( band );
    } else {
      return console.error( err );
    }
  });
});

//Insert a new band
app.post( '/api/bands', function( request, response ) {
  var band = new BandModel({
    artist: request.body.artist,
    album: request.body.album,
    song: request.body.song,
    genre: request.body.genre
  });

  band.save( function( err ) {
    if( !err ) {
      return console.warn( 'created' );
    } else {
      return response.send( band );
    }
  });
});

//Update a band with the put function
app.put( '/api/bands/:id', function( request, response ) {
  console.warn( 'Updating band data' + request.body.artist );

  return BandModel.findById( request.params.id, function( err, band ) {
    band.artist = request.body.artist;
    band.album = request.body.album;
    band.song = request.body.song;
    band.genre = request.body.genre;

    return band.save( function( err ) {
      if( !err ) {
        console.warn( 'band updated' );
      } else {
        console.error( err );
      }

      return response.send( band );
    });
  });
});

//Delete a band
app.delete( '/api/bands/:id', function( request, response ) {
  console.warn( 'Deleting band with id: ' + request.params.id );

  return BandModel.findById( request.params.id, function( err, band ) {
    return band.remove( function( err ) {
      if( !err ) {
        console.warn( 'Band removed' );

        return response.send( '' );
      } else {
        console.error( err );
      }
    });
  });
});

//Start server
app.listen(3000, function () {
  console.warn('server started on port 3000');
});

