import gulp from 'gulp'
import babel from 'gulp-babel'
import webpack from 'webpack-stream'
import webpackConfig from './webpack.config.babel'
import del from 'del'
// import { exec } from 'child_process'

const paths = {
  allSrcJs: 'src/**/*.js?(x)',
  clientBundle: 'dist/client-bundle.js?(.map)',
  serverSrcJs: 'src/server/**/*.js?(x)',
  sharedSrcJs: 'src/shared/**/*.js?(x)',
  clientEntryPoint: 'src/client/app.js?(x)',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  libDir: 'lib',
  distDir: 'dist'
}

gulp.task('clean', () => 
  del([paths.libDir, paths.clientBundle])
);

gulp.task('build', ['clean'], () => 
  gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir))
);

gulp.task('main', ['build'], () => {
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir));
});

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main'])
});

gulp.task('default', ['watch', 'main']);