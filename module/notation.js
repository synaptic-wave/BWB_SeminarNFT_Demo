const num34 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const num36 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const Thirty_Six = 36;

exports.notaion36 = (val, fix) => notaion36(val, fix);
exports.random36 = (fix) => notaion36(Math.floor(Math.random() * 36 ** fix), fix);

exports.make36CRC = (val) => make36CRC(val, val.length);
exports.check36CRC = (val) => make36CRC(val.substr(0, val.length - 1), val.length - 1) == val.charAt(val.length - 1);

exports.randomLower36 = (fix) => notaionLower36(Math.floor(Math.random() * 36 ** fix), fix);

const notaion36 = (v, f) => Number(v).toString(36).toUpperCase().padStart(f, '0');
const notaionLower36 = (v, f) => Number(v).toString(36).toLowerCase().padStart(f, '0');

const make36CRC = (v, l) => {
    let s = parseInt(v.charAt(0), 36);
    for (let i = 1; i < l; i++) s ^= parseInt(v.charAt(i), 36);
    s %= 36;

    return Number(s).toString(36).toUpperCase();
};
