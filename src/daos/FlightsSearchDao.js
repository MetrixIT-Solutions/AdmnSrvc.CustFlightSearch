/**
 * Copyright (C) Skillworks IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Jan 2023
 */

const SetRes = require('../SetRes');
const logger = require('../lib/logger');
const FlightsSearches = require('../schemas/FlightsSearches');
const FlightsSearchesClsd = require('../schemas/FlightsSearchesClsd');

const flightSearchDeleteMany = (query, callback) => {
  FlightsSearches.deleteMany(query).then((resObj) => {
    if (resObj && resObj.deletedCount > 0) {
      const result = SetRes.responseData(resObj);
      callback(result);
    } else {
      const df = SetRes.deleteFailed();
      callback(df);
    }
  }).catch((error) => {
    logger.error('Un-konwn Error in service/FlightsSearchDao.js, at flightSearchDeleteMany:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
}

const getFlightSrcList = (crntPgNum, pageLimit, obj, callback) => {
  let resultObj = { flightSearchListCount: 0, fightSearchList: [] };
  FlightsSearches.find(obj.query).sort(obj.sort).skip((crntPgNum - 1) * pageLimit).limit(pageLimit).then((resObj) => {
    if (resObj && resObj.length > 0) {
      resultObj = { flightSearchListCount: resObj.length, fightSearchList: resObj };
      FlightsSearches.countDocuments(obj.query).then((resultCount) => {
        if (resultCount) {
          resultObj = { flightSearchListCount: resultCount, fightSearchList: resObj };
          const result = SetRes.responseData(resultObj);
          callback(result);
        } else {
          const result = SetRes.noData(resultObj);
          callback(result);
        }
      }).catch((errorCount) => {
        logger.error('Unknown Error in daos/FlightsSearchDao.js, at getFlightSrcList(countDocuments):' + errorCount);
        const result = SetRes.unKnownErr(resultObj);
        callback(result);
      })
    } else {
      const result = SetRes.noData(resultObj);
      callback(result);
    }
  }).catch((error) => {
    logger.error('Unknown Error in daos/FlightsSearchDao.js, at getFlightSrcList:' + error);
    const uke = SetRes.unKnownErr(resultObj);
    callback(uke);
  })
};

const getFlightSrcCldrList = (crntPgNum, pageLimit, obj, callback) => {
  let resultObj = { flightSearchListCount: 0, fightSearchList: [] };
  FlightsSearchesClsd.find(obj.query).sort(obj.sort).skip((crntPgNum - 1) * pageLimit).limit(pageLimit).then((resObj) => {
    if (resObj && resObj.length > 0) {
      resultObj = { flightSearchListCount: resObj.length, fightSearchList: resObj };
      FlightsSearchesClsd.countDocuments(obj.query).then((resultCount) => {
        if (resultCount) {
          resultObj = { flightSearchListCount: resultCount, fightSearchList: resObj };
          const result = SetRes.responseData(resultObj);
          callback(result);
        } else {
          const result = SetRes.noData(resultObj);
          callback(result);
        }
      }).catch((errorCount) => {
        logger.error('Unknown Error in daos/FlightsSearchDao.js, at getFlightSrcCldrList(countDocuments):' + errorCount);
        const result = SetRes.unKnownErr(resultObj);
        callback(result);
      })
    } else {
      const result = SetRes.noData(resultObj);
      callback(result);
    }
  }).catch((error) => {
    logger.error('Unknown Error in daos/FlightsSearchDao.js, at getFlightSrcCldrList:' + error);
    const uke = SetRes.unKnownErr(resultObj);
    callback(uke);
  })
};

module.exports = {
 flightSearchDeleteMany, getFlightSrcList, getFlightSrcCldrList
};
