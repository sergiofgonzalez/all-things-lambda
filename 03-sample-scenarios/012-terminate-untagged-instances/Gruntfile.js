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
      lambda: {
        src: ["public/**/*.js"]
      },
      build: {
        src: ["Gruntfile.js"]
      }
    },
    copy: {
      build_to_host: {
        expand: true,
        cwd: "build/",
        src: "<%= pkg.name %>-<%= pkg.version %>.zip",
        dest: "/media/sf_Spark-share/"
      }
    },
    compress: {
      build: {
        options: {
          archive: "build/<%= pkg.name %>-<%= pkg.version %>.zip"
        },
        files: [
          { cwd: "public/", expand: true, src: ["**/*.js"] } ,
          { cwd: "node_modules/", expand: true, src: ["async/**"], dest: "node_modules" },
        ]
      }
    },
    watch: {
      cfg: {
        files: ["package.json"],
        tasks: ["build", "copy:to-host"]
      },
      lambda: {
        files: ["public/**/*.js"],
        tasks: ["jshint:lambda", "build", "copy:to-host"]
      },
      rebuild: {
        files: ["Gruntfile.js"],
        tasks: ["jshint:build", "build", "copy:to-host"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("build", "Prepares a zipped release build in `build/`", ["clean:build", "jshint", "compress:build"]);
  grunt.registerTask("copy:to-host", "Copies the zipped release to host", "copy:build_to_host");
  grunt.registerTask("dev", "Continuous development mode", function() {
    grunt.log.ok("running `watch` task...");
    grunt.task.run(["build", "copy:to-host", "watch"]);
  });
};
