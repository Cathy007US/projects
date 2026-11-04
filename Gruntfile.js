/**
 * Grunt 构建配置 — Cathy Portfolio
 *
 * 源码结构            构建产物 (dist/)
 * ├── index.html  →   ├── index.html        (引用替换为压缩版资源)
 * ├── css/style.css → ├── css/style.min.css
 * ├── js/main.js   →  ├── js/main.min.js
 * └── images/      →  └── images/           (原样拷贝)
 *
 * 命令:
 *   npx grunt          首次构建
 *   npx grunt watch    开发时监听 css/js/html 变化并自动构建
 *   npm run build      同 npx grunt
 */
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // 1. 清空旧的 dist
    clean: {
      dist: ['dist/']
    },

    // 2. 拷贝 index.html 与 images/ 到 dist
    copy: {
      html: {
        src: 'index.html',
        dest: 'dist/index.html'
      },
      images: {
        expand: true,
        cwd: 'images/',
        src: '**/*',
        dest: 'dist/images/'
      }
    },

    // 3. 压缩 CSS → dist/css/style.min.css
    cssmin: {
      build: {
        files: {
          'dist/css/style.min.css': ['css/style.css']
        }
      }
    },

    // 4. 压缩混淆 JS → dist/js/main.min.js
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        compress: true,
        mangle: true
      },
      build: {
        files: {
          'dist/js/main.min.js': ['js/main.js']
        }
      }
    },

    // 5. 替换 dist/index.html 里的资源引用为压缩版
    replace: {
      dist: {
        src: 'dist/index.html',
        overwrite: true,
        replacements: [
          { from: 'css/style.css', to: 'css/style.min.css' },
          { from: 'js/main.js', to: 'js/main.min.js' }
        ]
      }
    },

    // 开发时监听文件变化自动构建
    watch: {
      html: { files: ['index.html'], tasks: ['build'] },
      css: { files: ['css/**/*.css'], tasks: ['build'] },
      js: { files: ['js/**/*.js'], tasks: ['build'] },
      images: { files: ['images/**/*'], tasks: ['build'] }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['clean', 'copy', 'cssmin', 'uglify', 'replace']);
  grunt.registerTask('default', ['build']);
};
