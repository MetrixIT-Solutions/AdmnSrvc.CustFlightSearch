/**
 * Copyright (C) Skillworks IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Jan 2023
 */

var moment = require('moment');

const currUTCObj = () => {
  const utcMoment = moment.utc();
  const currUTCDtTmStr = utcMoment.format('YYYY-MM-DD HH:mm:ss');
  const currUTCTHorStr = utcMoment.format('HH');
  const currUTCTminStr = utcMoment.format('mm');
  const currUTCTSecStr = utcMoment.format('ss');

  const currUTCDtTmNum = moment(currUTCDtTmStr, 'YYYY-MM-DD HH:mm:ss').valueOf();
  const currUTCDtTm = new Date(currUTCDtTmStr);
  const currUTCYear = utcMoment.format('YYYY');
  const currUTCMonth = utcMoment.format('MM');
  const currUTCDay = utcMoment.format('DD');

  return { currUTCDtTmStr, currUTCTHorStr, currUTCTminStr, currUTCTSecStr, currUTCYear, currUTCMonth, currUTCDay, currUTCDtTmNum, currUTCDtTm };
}

const currUTC = (type) => {
  const utcMoment = moment.utc();
  const currUTCDtTmStr = utcMoment.format('YYYY-MM-DD HH:mm:ss');
  switch (type) {
    case 'Num':
      const currUTCDtTmNum = moment(currUTCDtTmStr, 'YYYY-MM-DD HH:mm:ss').valueOf();
      return currUTCDtTmNum;
    case 'DtTm':
      const currUTCDtTm = new Date(currUTCDtTmStr);
      return currUTCDtTm;
    default:
      return currUTCDtTmStr;
  }
}

// --- Random String Generation --- //
const randomStrGen = (str, size) => {
  var result = '';
  for (let i = size; i > 0; --i) result += str[Math.floor(Math.random() * str.length)];
  return result;
};

module.exports = {
  currUTCObj, currUTC, randomStrGen
};
