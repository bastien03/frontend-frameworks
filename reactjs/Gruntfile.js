module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-connect-proxy');

  // Project configuration.
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9001,
          // base: 'public',
          // hostname: 'localhost',
          middleware: function (connect, options) {
             var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
             return [
                // Include the proxy first
                proxy,
                // Serve static files.
                connect.static(options.base[0]),
                // Make empty directories browsable.
                connect.directory(options.base[0])
             ];
          }
        },
        proxies: [
          {
              context: '/books',
              host: '127.0.0.1',
              port: 8080,
              https: false,
              changeOrigin: false,
              xforward: false,
          }
        ]
      },
    },

    watch: {
      scripts: {
        files: [
          'index.html',
          'src/**/*.js'
        ]
      }
    }
  });

  grunt.registerTask('serve', [
    'configureProxies:server',
    'connect:server',
    'watch'
  ]);
};
