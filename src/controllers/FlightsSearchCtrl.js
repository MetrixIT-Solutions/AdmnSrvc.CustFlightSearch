/**
 * Copyright (C) Skillworks IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Jan 2023
 */

var cron = require('node-cron');

const util = require('../lib/util');
const SetRes = require('../SetRes');
const token = require('../tokens');
const FSCntrlrVldns = require('../controllers/validations/FlightsSearchCtrlVldtns');
const FlightsSearchSrvc = require('../services/FlightsSearchSrvc');

const apiServerStatus = (req, res) => {
  const resObj = SetRes.apiServerStatus();
  util.sendApiResponse(res, resObj);
}

// --- Begin: CronJob for delete searches
cron.schedule('0 6 * * *', () => {
  FlightsSearchSrvc.getPastWeekSearchResultsData();
});
// --- End: CronJob for delete searches

const getFlightSrcList = (req, res, next) => {
  const listValidation = FSCntrlrVldns.listValidation(req);
  if (listValidation.flag) {
    const decodedData = token.adminUserRefreshToken(req.headers.infadatoken, res);
    const tokenValidation = FSCntrlrVldns.tokenValidation(decodedData);
    if (tokenValidation.flag) {
      FlightsSearchSrvc.getAdminFlightSrcsList(req.body, decodedData.tokenData, (resObj) => {
        util.sendApiResponse(res, resObj);
      });
    } else {
      const tokenRes = tokenValidation.result;
      util.sendApiResponse(res, tokenRes);
    }
  } else {
    const reqRes = listValidation.result;
    util.sendApiResponse(res, reqRes);
  }
}

const  getFlightSrcCldrList = (req, res, next) => {
  const listValidation = FSCntrlrVldns.clndrListValidation(req);
  if (listValidation.flag) {
    const decodedData = token.adminUserRefreshToken(req.headers.infadatoken, res);
    const tokenValidation = FSCntrlrVldns.tokenValidation(decodedData);
    if (tokenValidation.flag) {
      FlightsSearchSrvc.getFlightSrcCldrList(req.body, decodedData.tokenData, (resObj) => {
        util.sendApiResponse(res, resObj);
      });
    } else {
      const tokenRes = tokenValidation.result;
      util.sendApiResponse(res, tokenRes);
    }
  } else {
    const reqRes = listValidation.result;
    util.sendApiResponse(res, reqRes);
  }
}

module.exports = { apiServerStatus, getFlightSrcList, getFlightSrcCldrList };
