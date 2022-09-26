const codeList = {
    // common
    COMMON: {
        SUCCESS: { code: 0, message: '성공' },
        FAIL: { code: 1, message: '실패' },
        INVALID_PARAM: { code: 2, message: '잘못된 파라미터 입니다.' },
        NOT_FOUND_PARAM: { code: 3, message: '파라미터를 다시 확인해 주세요.' },
        EXTERNAL_API_FAIL: { code: 4, message: '외부 API 통신 에러가 발생했습니다.' },
        NO_CONTENT: { code: 5, message: '결과가 없습니다.' },
        INTERNAL_SERVER_ERROR: { code: 6, message: '내부 서버 오류가 발생했습니다.' },
        WRONG_APPROACH: { code: 7, message: '잘못된 접근입니다.' },
    },
    // exchange(20000 ~ 25999)
    EXCHANGE: {
        NOT_FOUND_PRODUCT: { code: 20000, message: '해당 상품을 찾을 수 없습니다.' },
        NOT_FOUND_PRODUCT_CODE: { code: 20001, message: '해당 상품코드를 찾을 수 없습니다.' },
        INVALID_ROUND: { code: 20002, message: '유효하지 않은 회차 번호입니다.' },
        DUPLICATE_PRODUCT_CODE: { code: 20003, message: '동일한 상품코드가 있습니다.' },
    },
};

exports.list = codeList;