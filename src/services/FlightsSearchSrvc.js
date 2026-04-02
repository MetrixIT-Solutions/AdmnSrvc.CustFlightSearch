/**
 * Copyright (C) Skillworks IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Jan 2023
 */

const FlightsSearchDaoImpl = require('../daosimplements/FlightsSearchDaoImpl');
const flightSrcDao = require('../daos/FlightsSearchDao');


const getPastWeekSearchResultsData = () => {
  const deleteObj = FlightsSearchDaoImpl.deleteSearchQuery();
  flightSrcDao.flightSearchDeleteMany(deleteObj, (resObj) => { })
}

const getAdminFlightSrcsList = (reqBody, tokenData, callback) => {
  const obj = FlightsSearchDaoImpl.getFlightSrcList(reqBody, tokenData);
  flightSrcDao.getFlightSrcList(reqBody.actPgNum, reqBody.rLimit, obj, callback);
}

const getFlightSrcCldrList = (reqBody, tokenData, callback) => {
  const obj = FlightsSearchDaoImpl.getFlightSrcCldrList(reqBody, tokenData);
  flightSrcDao.getFlightSrcCldrList(reqBody.actPgNum, reqBody.rLimit, obj, callback);
}

module.exports = {
  getPastWeekSearchResultsData, getAdminFlightSrcsList, getFlightSrcCldrList
};
