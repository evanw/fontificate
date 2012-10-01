/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', 
					'<file_strip_banner:src/intro.js>',
					'<file_strip_banner:src/<%= pkg.name %>.util.js>',
					'<file_strip_banner:src/<%= pkg.name %>.core.js>',
					'<file_strip_banner:src/<%= pkg.name %>.keyset.js>',
					'<file_strip_banner:src/outro.js>'],
		        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    qunit: {
      all: ['http://localhost:8000/test/fontificate.html']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
		smarttabs: true,
		strict: false
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {},
	server: {
	  port: 8000,
	  base: '.'
	}
  });

  // Default task.
  grunt.registerTask('default', 'concat min');

};
