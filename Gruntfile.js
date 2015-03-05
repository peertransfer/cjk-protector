module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    coffee: {
      plugin: {
        expand: true,
        flatten: true,
        src: "src/*.coffee",
        dest: "dist",
        ext: ".js"
      },
      specs: {
        expand: true,
        flatten: true,
        src: "spec/coffeescripts/*.coffee",
        dest: "spec/javascripts",
        ext: ".js"
      }
    },

    uglify: {
      plugin: {
        files: {
          "dist/cjk_protector-min.js": ["dist/cjk_protector.js"]
        }
      }
    },

    jshint: {
      all: [
        "Gruntfile.js",
        "dist/*.js",
        "spec/javascripts/*.js"
      ],
      options: {
        jshintrc: ".jshintrc"
      }
    },

    jasmine: {
      src: "dist/*.js",
      options: {
        specs: "spec/javascripts/**/*.js",
        vendor: "vendor/**/*.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-jasmine");

  grunt.registerTask("test", ["jshint", "jasmine"]);
  grunt.registerTask("build", ["coffee", "uglify"]);
  grunt.registerTask("default", ["build", "test"]);
}
