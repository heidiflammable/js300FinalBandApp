'use strict';
/* global Backbone */


var app = app || {};

app.Group = Backbone.Collection.extend({
  model: app.Band,
  url: '/api/bands'
});