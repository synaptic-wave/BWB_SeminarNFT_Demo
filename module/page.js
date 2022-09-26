class Pagination {
    // max: 총수 / now: 현재 / count: 개수 / start: 시작 / end: 마지막 / offset: 가져올 개수 / limit: limit함수 사용하는 쿼리 전용
    // INPUT: rowMax: row 총수 / pageNow: page 현재 / rowCount: row 개수(페이지당)
    constructor(rowMax, pageNow, rowCount) {
        this.rowCount = rowCount;
        this.rowMax = parseInt(rowMax);
        this.pageMax = Math.ceil(this.rowMax / this.rowCount);
        this.pageNow = parseInt(pageNow) < 1 ? 1 : parseInt(pageNow) > this.pageMax ? this.pageMax : parseInt(pageNow);
        this.rowStart = this.pageNow == 1 ? 0 : (this.pageNow - 1) * this.rowCount;
        this.rowEnd = this.pageMax == this.pageNow ? this.rowMax : this.pageNow * this.rowCount;
        this.rowOffset = pageNow == this.pageMax ? this.rowEnd - this.rowStart : rowCount;
        this.rowLimit = this.rowStart + ',' + this.rowOffset;
    }

    getPageList(pageCount) {
        this.pagePrev = this.pageNow <= pageCount ? 1 : parseInt((this.pageNow - 1 - pageCount) / pageCount) * pageCount + pageCount;
        this.pageNext = parseInt((this.pageNow - 1 + pageCount) / pageCount) * pageCount + 1;
        if (parseInt((this.pageNow - 1 + pageCount) / pageCount) == parseInt((this.pageMax - 1 + pageCount) / pageCount) && this.pageMax - this.pageNow < pageCount) this.pageNext = this.pageMax;

        this.pageList = [];
        let moc = this.pageMax % pageCount == 0 ? parseInt(this.pageMax / pageCount) : parseInt(this.pageMax / pageCount) + 1;
        let pageNum = 0;
        for (let i = 0; i < moc; i++) {
            let resRow = [];
            for (let y = 0; y < pageCount; y++) {
                pageNum++;
                resRow.push(pageNum);
                if (pageNum >= this.pageMax) break;
            }
            this.pageList = resRow;
        }
        // this.page = Math.ceil(this.pageNow / pageCount);

        this.pageThree = {
            pagePrev: this.pagePrev,
            pageNow: this.pageNow,
            pageNext: this.pageNext,
            pageMax: this.pageMax,
            pageCount: pageCount,
            rowCount: this.rowCount,
        };
    }
}

module.exports = Pagination;