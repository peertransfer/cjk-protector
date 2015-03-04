module.exports = function(grunt) {
  grunt.initConfig({
    pkg : '<json:package.json>',
    coffee : {
      plugin: {
        expand: true,
        flatten: true,
        src: 'src/*.coffee',
        dest: 'dist',
        ext: '.js'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('default', 'coffee');
}
