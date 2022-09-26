// swagger description
let desc = process.env['npm_package_description'];
desc += '\n ticket exchange API';
desc += '\n\n[To-do]';
desc += '\n - [?] admin view API(SELECT)';
desc += '\n - [?] 호텔관련 API 분리(waffle api 쪽으로)';
desc += '\n\n[Done]';
desc += '\n - [2022-04-05] exchange code gen API(/exchange/code-gen)';
desc += '\n - [2022-04-05] exchange hotel city API(/exchange/hotel-city)';
desc += '\n - [2022-04-05] exchange hotel list API(/exchange/hotel)';
desc += '\n - [2022-04-06] exchange product duplicate check API(/exchange/product-check)';
desc += '\n - [2022-04-07] exchange hotel room list API(/exchange/hotel/:hid/room)';
desc += '\n - [2022-04-07] exchange product regist API(/exchange/product-regist)';
desc += '\n - [2022-04-07] exchange product detail API(/exchange/product/:pseq)';
desc += '\n - [2022-04-07] exchange product ticket round last number API(/exchange/product/:pseq/ticket-round-last)';
desc += '\n - [2022-04-08] exchange product list API(/exchange/product)';
desc += '\n - [2022-04-08] exchange product search type list API(/exchange/product-search-type)';
desc += '\n - [2022-04-08] exchange product market type list API(/exchange/product-market-type)';
desc += '\n - [2022-04-11] exchange product round list API(/exchange/product/:pseq/round)';
desc += '\n - [2022-04-11] exchange product round detail API(/exchange/product/:pseq/round/:rnum)';
desc += '\n - [2022-04-12] [URL change] exchange product ticket round last number API(/exchange/product/:pseq/round-last)';
desc += '\n - [2022-04-12] exchange ticket generate API(/exchange/product/:pseq/ticket-generate)';
desc += '\n - [2022-04-13] exchange ticket status type list API(/exchange/ticket-status-type)';
desc += '\n\n[Doing]';
desc += '\n - [?] 교환권 상세 관련 API';
desc += '\n - [2022-04-13] exchange ticket update API(/exchange/ticket/:tseq)';
desc += '\n\n[History]';
desc += '\n - [2022-04-04] project 생성';
desc += '\n - [2022-04-07] 상품 등록 관련 API 완료';
desc += '\n - [2022-04-08] 교환권 생성 관련 API 완료';
desc += '\n - [2022-04-12] 상품 리스트 관련 API 완료';

exports.option = (apiVersion, apiList) => {
    // swagger opion 설정
    let EXTERNAL_URL = '';
    let portVisible = true;
    if ((process.env.ADMIN_BACK_EXTERNAL_PROTOCOL == 'http' && process.env.ADMIN_BACK_EXTERNAL_PORT == 80) || (process.env.ADMIN_BACK_EXTERNAL_PROTOCOL == 'https' && process.env.ADMIN_BACK_EXTERNAL_PORT == 443)) portVisible = false;

    if (!portVisible) EXTERNAL_URL = `${process.env.ADMIN_BACK_EXTERNAL_PROTOCOL}://${process.env.ADMIN_BACK_EXTERNAL_IP}/${apiVersion}`;
    else EXTERNAL_URL = `${process.env.ADMIN_BACK_EXTERNAL_PROTOCOL}://${process.env.ADMIN_BACK_EXTERNAL_IP}:${process.env.ADMIN_BACK_EXTERNAL_PORT}/${apiVersion}`;

    let options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: process.env['npm_package_name'],
                version: process.env['npm_package_version'],
                description: desc,
                license: { name: process.env['npm_package_license'] },
                contact: { name: process.env['npm_package_author'] },
            },
            servers: [{ url: EXTERNAL_URL }],
        },
        apis: apiList,
    };

    return options;
};
