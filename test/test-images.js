const assert = require('assert');
const urlExists = require('url-exists');

let cases = require('../data/cases.json').cases;
let totalCount = 0;
let avaliableCount = 0;

let timer = setTimeout(function () {
  assert.ok(avaliableCount === totalCount, `Failed: Checking QR code time out, ${avaliableCount}/${totalCount} avaliable`);
}, 5000);
cases.forEach(item => {
  if (item.qrcode) {
    totalCount++;
    urlExists(item.qrcode, function (err, exists) {
      assert.ok(exists, `"${item.name}" is not avaliable.`);
      // console.log(`"${item.name}" QR code avaliable.`);
      avaliableCount++;

      if (avaliableCount === totalCount) {
        console.log('Pass: All QR code is avaliable.');
        clearInterval(timer);
      }
    });
  }
});

