const codeList = require('./code.js');

exports.result = (res, method, status, code, data) => {
    let send = {
        code: code['code'],
        message: code['message'],
    };

    if (data) send['data'] = data;

    res.status(status == '404' ? 404 : status == 'SUCCESS' ? 200 : 400).send(send);
};

exports.catchDBError = (err) => makeErrorFormat(err, 'COMMON', 'INTERNAL_SERVER_ERROR', false);
exports.catchDBErrorWithConnection = (err, connection) => makeErrorFormat2(err, 'COMMON', 'INTERNAL_SERVER_ERROR', false, connection);
exports.returnEmptyError = (err) => makeErrorFormat(err, 'COMMON', 'NO_CONTENT', false);

exports.returnNoProductError = (err) => makeErrorFormat(err, 'EXCHANGE', 'NOT_FOUND_PRODUCT_CODE', false);
exports.returnNoRoundError = (err) => makeErrorFormat(err, 'EXCHANGE', 'INVALID_ROUND', false);

const makeErrorFormat = (err, category, detail, isArray) => {
    console.error(err);
    let code = codeList.list[category][detail];

    const error = new Error(code['message']);
    error['code'] = code['code'];
    if (isArray) error['isArray'] = true;

    throw error;
};

const makeErrorFormat2 = (err, category, detail, isArray, connection) => {
    console.error(err);
    let code = codeList.list[category][detail];

    const error = new Error(code['message']);
    error['code'] = code['code'];
    if (isArray) error['isArray'] = true;

    connection.release();

    throw error;
};
