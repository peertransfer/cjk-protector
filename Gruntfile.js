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

    jasmine: {
      src: "dist/*.js",
      options: {
        specs: "spec/javascripts/**/*.js",
        vendor: "vendor/**/*.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-contrib-jasmine")

  grunt.registerTask("default", ["coffee", "jasmine"]);
}
