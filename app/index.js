'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var LibraGenerator = yeoman.generators.Base.extend({
    init: function() {
      this.pkg = require('../package.json');

      this.on('end', function() {
        if (!this.options['skip-install']) {
          this.installDependencies();
        }
      });
    },

    askFor: function() {
      var done = this.async();

      // have Yeoman greet the user
      this.log(this.yeoman);

      // replace it with a short and sweet description of your generator
      this.log(chalk.magenta('::LIBRA::'));



      var prompts = [{
          name: 'libraryName',
          message: 'Would you like your library to be called?',
          default: "MyLibrary"
        }, {
          type: 'checkbox',
          name: 'features',
          message: 'What would you like to include in your library?',
          choices: [{
            name: 'Underscore',
            value: 'includeUnderscore',
            checked: true
          }, {
            name: 'jQuery',
            value: 'jQuery',
            checked: false
          }]
        }];

        this.prompt(prompts, function(props) {
          this.someOption = props.someOption;


          function hasFeature(feat) {
            return features.indexOf(feat) !== -1;
          }


          var features = props.features;
          this.includeUnderscore = hasFeature('includeUnderscore');

          done();
        }.bind(this));
      },

        app: function() {
          this.mkdir('js');

          this.copy('gruntfile.js', 'gruntfile.js');
          this.directory('src/js', 'js');

          this.copy('_package.json', 'package.json');
          this.copy('_bower.json', 'bower.json');

          // var grunt = require('grunt');

        },

        projectfiles: function() {
          this.copy('editorconfig', '.editorconfig');
          this.copy('jshintrc', '.jshintrc');
        }
    });

  module.exports = LibraGenerator;
