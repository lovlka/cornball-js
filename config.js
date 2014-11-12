exports.config = {
   files: {
      javascripts: {
         joinTo: {
            "javascripts/cornball.js": /^(bower_components|app)/
         }
      },
      stylesheets: {
         joinTo: {
            'stylesheets/cornball.css': /^(bower_components|app)/
         }
      },
      templates: {
         joinTo: "javascripts/cornball.js"
      }
   },
   plugins: {
      jshint: {
         pattern: /^app\/.*\.js$/,
         options: {
            bitwise: true,
            curly: true
         },
         globals: {
            jQuery: true
         }
      }
   },
   server: {
      port: 8080,
      run: true
   }
};
