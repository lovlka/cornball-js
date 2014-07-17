exports.config = {
   files: {
      javascripts: {
         joinTo: {
            "javascripts/app.js": /^(bower_components|app)/
         }
      },
      stylesheets: {
         joinTo: {
            'stylesheets/app.css': /^(bower_components|app)/
         }
      },
      templates: {
         joinTo: "javascripts/app.js"
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
      port: 666,
      run: true
   }
};
