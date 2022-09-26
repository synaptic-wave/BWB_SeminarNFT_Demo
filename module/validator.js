const validator = require('express-validator');
const moment = require('moment');

const codeList = require('./code.js');
const resulter = require('./resulter.js');

exports.checkCodeGen = [validator.check('pcode').isLength({ min: 4, max: 4 }), validator.check('round').isInt({ min: 1, max: 1155 }), validator.check('cnt').isInt({ min: 1, max: 39304 }), validatorFunction];

exports.checkTicketUpdate = [validator.check('tseq').isNumeric({ min: 1 }), validator.check('market').isIn(['AUC', 'CUP', 'NAV']), validator.check('uname').isString(), validator.check('uphone').isString(), validator.check('tstatus').isIn(['C', 'PN', 'PC', 'UY', 'UN', 'D', 'S']), validatorFunction];

exports.checkProductDuplicate = [validator.check('pcode').isLength({ min: 4, max: 4 }), validatorFunction];
exports.checkProductRegist = [
    validator.check('hseq').isNumeric({ min: 1 }),
    validator.check('hid').isNumeric({ min: 1 }),
    validator.check('hname').isString(),
    validator.check('rseq').isNumeric({ min: -1 }),
    validator.check('pname').isString(),
    validator.check('pcode').isLength({ min: 4, max: 4 }),
    validator.check('vcode').isIn(['AUC', 'CUP', 'NAV']),
    validator.check('pprice').isNumeric({ min: 0 }),
    validator.check('sdate').custom((val) => moment(val, 'YYYY-MM-DD', true).isValid()),
    validator.check('edate').custom((val) => moment(val, 'YYYY-MM-DD', true).isValid()),
    validator.check('stay').isLength({ min: 0 }),
    validatorFunction,
];
exports.checkProductList = [validator.check('page').isLength({ min: 1 }), validator.check('stype').isIn(['ALL', 'PNAME', 'PCODE', 'HNAME', 'HID']), validator.check('sword').isString(), validatorFunction];
exports.checkProductDetail = [validator.check('pseq').isLength({ min: -1 }), validatorFunction];
exports.checkProductRoundList = [validator.check('pseq').isLength({ min: -1 }), validator.check('page').isLength({ min: 1 }), validatorFunction];
exports.checkProductRoundDetail = [validator.check('pseq').isLength({ min: -1 }), validator.check('rnum').isLength({ min: 0 }), validatorFunction];

exports.checkProductRoundLast = [validator.check('pseq').isLength({ min: -1 }), validatorFunction];
exports.checkProductTicketGenerate = [validator.check('pseq').isNumeric({ min: -1 }), validator.check('tcount').isNumeric({ min: 1 }), validatorFunction];

exports.checkHotelRoom = [validator.check('hid').isNumeric({ min: 1 }), validatorFunction];


//push
exports.checkPushList = [validator.check('page').isLength({ min: 1 }), validator.check('stype').isIn(['ALL', 'MTITLE', 'MSTATUS']), validator.check('sword').isString(), validatorFunction];

// exports.checkHotel = [validator.check('hname'), validatorFunction];

function validatorFunction(req, res, next) {
    const errors = validator.validationResult(req);

    if (errors.isEmpty()) return next();

    let errorLog = errors.errors.map((e) => `${e['param']}: ${e['msg']}(${e['value'] ? e['value'] : 'undefined'})`).join(' | ');
    console.log(`[Validation Error]\n${errorLog}`);

    if (errors.errors[0].msg == 'Invalid value') return resulter.result(res, req['method'], 'FAIL', codeList.list['COMMON']['INVALID_PARAM'], null);

    return resulter.result(res, req['method'], 'FAIL', codeList.list['COMMON']['NOT_FOUND_PARAM'], null);
}
