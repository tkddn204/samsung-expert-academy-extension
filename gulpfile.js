const fs = require('fs');
const os = require('os');
const path = require('path');
const map = require('map-stream');
const merge = require('merge-stream');
const {
    spawn
} = require('child_process');
const replaceExt = require('replace-ext');
const argv = require('minimist')(process.argv.slice(2));
const through2 = require('through2');
const {
    src,
    dest,
    series,
    watch
} = require('gulp');
const gclean = require('gulp-clean');
const plumber = require('gulp-plumber');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const zip = require('gulp-zip');
const replace = require('gulp-replace');
const crxPack = require('gulp-crx-pack');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const preprocess = require('gulp-preprocess');
const uglify = require('gulp-uglify-es').default;

// Tasks
function clean() {
    return src('./tmp', {
        allowEmpty: true
    }).pipe(gclean());
}

function watches() {
    return watch(['./libs/**/*', './src/**/*', './package.json'], defaultTask);
}

function test(cb) {
    const ps = spawn('./node_modules/.bin/mocha', [
        '--harmony',
        '--reporter',
        'spec',
        '--bail',
        '--recursive',
        '--timeout',
        '-1'
    ]);
    ps.stdout.pipe(process.stdout);
    ps.stderr.pipe(process.stderr);
    ps.on('close', cb);
}

function styles() {
    return src('./src/styles/samsungext.less')
        .pipe(plumber())
        .pipe(less({
            relativeUrls: true
        }))
        .pipe(autoprefixer({
            cascade: true
        }))
        .pipe(argv.production ? cssmin() : through2.obj())
        .pipe(dest('./tmp'));
}

// Chrome
function chromeTemplate() {
    return buildTemplate({
        SUPPORT_FILE_ICONS: true,
        SUPPORT_GHE: true
    });
}

function chromeJS() {
    return buildJs(['./src/config/chrome/overrides.js'], {
        SUPPORT_FILE_ICONS: true,
        SUPPORT_GHE: true
    });
}

// Chrome
function chrome() {
    const destPath = './tmp/chrome';
    const extRoot = 'chrome-extension://__MSG_@@extension_id__';
    return merge(
        src('./icons/**/*')
        .pipe(dest(`${destPath}/icons`)),
        src(['./libs/**/*', './tmp/samsungext.*'])
        .pipe(dest(destPath)),
        src('./src/config/chrome/background.js')
        .pipe(argv.production ? uglify() : through2.obj())
        .pipe(dest(destPath)),
        src('./src/config/chrome/manifest.json')
        .pipe(replace('$VERSION', getVersion()))
        .pipe(dest(destPath))
    );
}

function chromeZIP() {
    return src('./tmp/chrome/**/*')
        .pipe(zip('chrome.zip'))
        .pipe(dest('./dist'));
}

function chromeCRX() {
    // This will package the crx using a private key.
    // For the convenience of people who want to build locally without having to
    // Manage their own Chrome key, this code will use the bundled test key if
    // A real key is not found in ~/.ssh.
    let real;
    if (fs.existsSync(path.join(os.homedir() + '/.ssh/chrome.pem'))) {
        real = path.join(os.homedir() + '/.ssh/chrome.pem');
    } else {
        real = './ssh/chrome.pem';
    }
    if (argv.production && !fs.existsSync(real)) {
        console.error('Chrome Key Not Found!!');
        return null;
    }
    const test = './chrome_test_key.pem';
    const privateKey = fs.existsSync(real) ? fs.readFileSync(real) : fs.readFileSync(test);
    return src('./tmp/chrome')
        .pipe(crxPack({
            privateKey: privateKey,
            filename: 'chrome.crx'
        }))
        .pipe(dest('./dist'));
}

// Helpers
function html2js(template) {
    return map(escape);

    function escape(file, cb) {
        const path = replaceExt(file.path, '.js');
        const content = file.contents.toString();
        /* eslint-disable quotes */
        const escaped = content
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/\r?\n/g, "\\n' +\n    '");
        /* eslint-enable */
        const body = template.replace('$$', escaped);

        file.path = path;
        file.contents = new Buffer(body);
        cb(null, file);
    }
}

function buildJs(overrides, ctx) {
    const cores = fs.readdirSync('./src/core').map((name) => './src/core/' + name);
    const features = fs.readdirSync('./src/features').map((name) => './src/features/' + name);
    const utils = fs.readdirSync('./src/util').map((name) => './src/util/' + name);
    const srcPaths = [
            './tmp/template.js'
        ]
        .concat(cores)
        .concat(features)
        .concat(utils)
        .concat(overrides)
        .concat('./src/samsungext.js');
    return src(srcPaths)
        .pipe(concat('samsungext.js'))
        .pipe(preprocess({
            context: ctx
        }))
        .pipe(argv.production ? uglify() : through2.obj())
        .pipe(dest('./tmp'));
}

function buildTemplate(ctx) {
    const LOTS_OF_SPACES = new Array(500).join(' ');

    return src('./src/template.html')
        .pipe(preprocess({
            context: ctx
        }))
        .pipe(replace('__SPACES__', LOTS_OF_SPACES))
        .pipe(html2js('const TEMPLATE = \'$$\';'))
        .pipe(dest('./tmp'));
}

function getVersion() {
    delete require.cache[require.resolve('./package.json')];
    return require('./package.json').version;
}

const chromeTask = series(chromeTemplate, chromeJS, chrome);
const build = series(clean, styles, chromeTask);
const defaultTask = series(build, watches);

exports.clean = clean;
exports.build = build;
exports.default = defaultTask;
exports.dist = series(build, chromeZIP, chromeCRX);
exports.test = series(build, test);
exports.chrome = chromeTask;