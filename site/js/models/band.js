'use strict';
/* global Backbone */

var app = app || {};

app.Band = Backbone.Model.extend({
  defaults: {
    coverImage: 'img/placeholder.png',
    artist: 'Artist Unknown',
    album: 'Unknown',
    song: 'Unknown',
    genre: 'None'
  },

  idAttribute: '_id'
});
