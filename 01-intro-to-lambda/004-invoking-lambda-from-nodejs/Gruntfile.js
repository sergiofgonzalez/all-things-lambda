"use strict";

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: {
      build: ["build"]
    },
    jshint: {
      options: {
        jshintrc: true, // search for .jshintrc files relative to the files being linted
        reporter: require("jshint-stylish")
      },
      node: {
        src: ["public/*.js"]
      },
      build: {
        src: ["Gruntfile.js"]
      }
    },
    copy: {
      build: {
        expand: true,
        cwd: "public/",
        src: ["**/*.js"],
        dest: "build/"
      }
    },
    watch: {
      node: {
        files: ["public/**/*.js"],
        tasks: ["jshint:node", "copy:build"]
      },
      rebuild: {
        files: ["Gruntfile.js"],
        tasks: ["jshint:build", "copy:build"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("build", "Prepares a zipped release build in `build/`", ["clean:build", "jshint", "copy:build"]);
  grunt.registerTask("dev", "Continuous development mode", function() {
    grunt.log.ok("running `watch` task...");
    grunt.task.run(["build", "watch"]);
  });
};
