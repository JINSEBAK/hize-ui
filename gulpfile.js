var gulp = require("gulp");
var scss = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var nodemon = require("gulp-nodemon");
var browserSync = require("browser-sync");
var concat = require("gulp-concat");
var fileinclude = require("gulp-file-include");
var del = require("del");


// 소스 파일 경로
var PATH = {
    HTML: "./workspace/html",
    ASSETS: {
      FONTS: "./workspace/assets/fonts",
      IMAGES: "./workspace/assets/images",
      STYLE: "./workspace/assets/css",
      SCRIPTS: "./workspace/assets/js",
    },
  },
  // 산출물 경로
  DEST_PATH = {
    HTML: "./dist",
    ASSETS: {
      FONTS: "./dist/assets/fonts",
      IMAGES: "./dist/assets/images",
      STYLE: "./dist/assets/css",
      SCRIPTS: "./dist/assets/js"
    },
  };


gulp.task("clean", () => {
  return new Promise((resolve) => {
    del.sync(DEST_PATH.HTML);

    resolve();
  });
});

gulp.task("scss:compile", () => {
  return new Promise((resolve) => {
    var options = {
      outputStyle: "expanded", // nested, expanded, compact, compressed
      indentType: "space", // space, tab
      indentWidth: 4, //
      precision: 8,
      sourceComments: false, // 코멘트 제거 여부
    };
    gulp
      .src(PATH.ASSETS.STYLE + "/style.scss")
      .pipe(sourcemaps.init())
      .pipe(scss(options))
      .pipe(sourcemaps.write())
      .pipe(concat("style.css"))
      .pipe(gulp.dest(DEST_PATH.ASSETS.STYLE))
      .pipe(browserSync.reload({ stream: true }));
    resolve();
  });
});

gulp.task("scss:webview", () => {
  return new Promise((resolve) => {
    var options = {
      outputStyle: "expanded", // nested, expanded, compact, compressed
      indentType: "space", // space, tab
      indentWidth: 4, //
      precision: 8,
      sourceComments: false, // 코멘트 제거 여부
    };
    gulp
      .src(PATH.ASSETS.STYLE + "/wv.scss")
      .pipe(sourcemaps.init())
      .pipe(scss(options))
      .pipe(sourcemaps.write())
      .pipe(concat("wv.css"))
      .pipe(gulp.dest(DEST_PATH.ASSETS.STYLE))
      .pipe(browserSync.reload({ stream: true }));
    resolve();
  });
});

gulp.task("css:copy", () => {
  return new Promise((resolve) => {
    gulp
    .src(PATH.ASSETS.STYLE + "/**/*.css")
    .pipe(gulp.dest(DEST_PATH.ASSETS.STYLE));

    resolve();
  });
});

gulp.task("font:copy", () => {
  return new Promise((resolve) => {
    gulp
      .src(PATH.ASSETS.FONTS + "/*.*")
      .pipe(gulp.dest(DEST_PATH.ASSETS.FONTS));

    resolve();
  });
});

gulp.task("js:copy", () => {
  return new Promise((resolve) => {
    gulp
      .src(PATH.ASSETS.SCRIPTS + "/*.*")
      .pipe(gulp.dest(DEST_PATH.ASSETS.SCRIPTS));

    resolve();
  });
});

gulp.task("image:copy", () => {
  return new Promise((resolve) => {
    gulp
      .src(PATH.ASSETS.IMAGES + "/**/*.*")
      .pipe(gulp.dest(DEST_PATH.ASSETS.IMAGES));

    resolve();
  });
});

gulp.task("fileinclude", () => {
  return new Promise((resolve) => {
    gulp
      .src([PATH.HTML + "/**/*.html", PATH.HTML + "/common/*.html"])
      .pipe(
        fileinclude({
          prefix: "@@",
          basepath: "@file",
        })
      )
      .pipe(gulp.dest(DEST_PATH.HTML));

    resolve();
  });
});

gulp.task("html", () => {
  return new Promise((resolve) => {
    gulp
      .src(PATH.HTML + "/*.html")
      .pipe(gulp.dest(DEST_PATH.HTML))
      .pipe(browserSync.reload({ stream: true }));
    resolve();
  });
});

gulp.task("nodemon:start", () => {
  return new Promise((resolve) => {
    nodemon({ script: "app.js", watch: DEST_PATH.HTML });
    resolve();
  });
});

gulp.task("watch", () => {
  return new Promise((resolve) => {
    gulp.watch(PATH.HTML + "/**/*.html", gulp.series(["html"]));
    gulp.watch(PATH.ASSETS.STYLE + "/**/*.scss", gulp.series(["scss:compile"]));
    gulp.watch(PATH.ASSETS.STYLE + "/**/*.scss", gulp.series(["scss:webview"]));
    resolve();
  });
});

gulp.task("browserSync", () => {
  return new Promise((resolve) => {
    browserSync.init(null, { proxy: "http://localhost:8006", port: 8003 });
    resolve();
  });
});

gulp.task(
  "default",
  gulp.series(["clean", "scss:compile", "scss:webview", "css:copy", "font:copy", "js:copy", "image:copy", "html", "fileinclude",  "nodemon:start", "watch", "browserSync",])
);
