export function timeFix(IsoDate) {
    var d = new Date(IsoDate);
    return d.setHours(d.getHours() - 8);
}
//# sourceMappingURL=../../../../../src/app/shared/utils/timeFix.js.map