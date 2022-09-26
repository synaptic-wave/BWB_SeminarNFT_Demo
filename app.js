const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mysql2 = require('mysql2');
const dotenv = require('dotenv');
var expressSession = require('express-session');
var serveStatic = require('serve-static');
const bodyParser = require('body-parser');
var http = require('http');
const nodemailer = require('nodemailer');

const codeList = require('./module/code.js');
const resulter = require('./module/resulter.js');

const passport = require('passport');
const passportConfig = require('./routes/passport/passport');
const passportRouter = require('./routes/passport/route');

const app = express();

//const { host, port, user, password } = require('./config/mysql.js');
// env 설정
if (process.env.NODE_ENV === 'production') dotenv.config({ path: './.env.prod' });
if (process.env.NODE_ENV === 'development') dotenv.config({ path: './.env.dev' });
if (process.env.NODE_ENV === 'testing') dotenv.config({ path: './.env.test' });

//쿠키와 세션을 미들웨어로 등록한다
app.use(cookieParser());
app.use(
    expressSession({
        secret: 'sessionKey', //이때의 옵션은 세션에 세이브 정보를 저장할때 할때 파일을 만들꺼냐
        //아니면 미리 만들어 놓을꺼냐 등에 대한 옵션들임
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    })
);

app.get('/account/loginCheck', (req, res) => {
    res.cookie('cookie', 'value', { sameSite: 'none' });
    res.send(req.cookies);
    //res.end();
});

app.use(passport.initialize());
app.use(passport.session()); // 세션 연결
passportConfig(); // 이 부분 추가

app.disable('x-powered-by');

app.use(cors());

// mysql 설정
global.mysqlPool = mysql2.createPool(require('./config/mysql.js')).promise();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

logger.token('ko-time', () => new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
app.use(
    logger([':method', ':url', ':status', ':remote-addr', ':ko-time'].join('\t| '), {
        skip: (req) => req.originalUrl.includes('/static/') || req.originalUrl.includes('/assets/') || req.originalUrl.includes('/public/'),
    })
);

// 사용자 session setting
app.use((req, res, next) => {
    res.locals.userInfo = req.session.user;
    res.locals.socialUser = req.user;
    // console.log(res.locals);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/robots.txt', (req, res, next) => {
    res.type('text/plain');
    res.send(`
  User-agent: Googlebot
  Disallow:
  
  User-agent: Googlebot-image
  Disallow:
  `);
});

app.use('/static', express.static(path.resolve('public')));

app.use('/', require('./routes/index/indexRouter.js'));
app.use('/index', require('./routes/index/indexRouter.js'));
app.use('/account', require('./routes/account/accountRouter.js'));
app.use('/hotel', require('./routes/hotel/hotelRouter.js'));
app.use('/booking', require('./routes/booking/bookingRouter.js'));
app.use('/common', require('./routes/common/commonRouter.js'));

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use('/bwb', require('./routes/bwb/bwbRouter.js'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
