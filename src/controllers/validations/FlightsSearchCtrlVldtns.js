/**
 * Copyright (C) Skillworks IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Jan 2023
 */

const SetRes = require('../../SetRes');

const tokenValidation = (tData) => {
  if (!tData) {
    const it = SetRes.tokenInvalid();
    return { flag: false, result: it };
  } else if (tData.isExpired) {
    const te = SetRes.tokenExpired();
    return { flag: false, result: te };
  } else return { flag: true };
}

const listValidation = (req) => {
  const reqBody = req.body;
  if (!req.headers.infadatoken) {
    const tr = SetRes.tokenRequired();
    return { flag: false, result: tr };
  } else if (!reqBody.actPgNum || !reqBody.rLimit) {
    const ma = SetRes.mandatory();
    return { flag: false, result: ma };
  } else {
    return { flag: true };
  }
}

const clndrListValidation = (req) => {
  const reqBody = req.body;
  if (!req.headers.infadatoken) {
    const tr = SetRes.tokenRequired();
    return { flag: false, result: tr };
  } else if (!reqBody.actPgNum || !reqBody.rLimit || !reqBody.fromDate || !reqBody.toDate) {
    const ma = SetRes.mandatory();
    return { flag: false, result: ma };
  } else {
    return { flag: true };
  }
}

module.exports = {
  tokenValidation, listValidation, clndrListValidation
};
