(async () => {
  const fetch = require('node-fetch');
  const moment = require('moment');
  const colors = require('colors');

  var timeInterval = 100;
  var myFunction = async () => {
    const res = await fetch('https://api.etherscan.io/api?module=proxy&action=eth_call&to=0x8a883a20940870dc055f2070ac8ec847ed2d9918&data=0xc7e284b8707c54872b29498540b8761f562eea7be56ee7ab8cac943ac318be5d');
    const json = await res.json();
    const second = parseInt(json.result, 16);
    const result = moment.utc(second * 1000).format('HH:mm:ss');

    if (second >= 180) {
      // up 3 minutes
      console.log(colors.green(result));
    } else if (second >= 100 && second < 180) {
      // 1:40 to 3:00 minutes
      console.log(colors.yellow(result));
    } else {
      // below 1:40 minutes
      console.log(colors.red(result));
    }

    if (second > 180) {
      timeInterval = 5000;
    } else {
      timeInterval = 1000;
    }

    setTimeout(myFunction, timeInterval);
  }

  setTimeout(myFunction, timeInterval);
})()