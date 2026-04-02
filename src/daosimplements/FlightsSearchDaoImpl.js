/**
 * Copyright (C) Skillworks IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Jan 2023
 */

const moment = require('moment');

const deleteSearchQuery = () => {
  let endWeek = moment.utc().subtract(16, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss');
  return { delFlag: false, cDtStr: { $lte: endWeek } } 
}

const getFlightSrcList = (reqBody, tokenData) => {
  const data = { delFlag: false, email: { $nin: ['', null] }, mobCcNum: { $nin: ['', null] } };
  const searchStr = reqBody.searchStr || '';
  let dateFilterQuery = dateTypeFilterQuery(reqBody);
  const query = {
    ...data,
    ...dateFilterQuery,
    $or: [
      { 'name': { $regex: searchStr, $options: 'i' } },
      { 'mobCcNum': { $regex: searchStr, $options: 'i' } },
      { 'email': { $regex: searchStr, $options: 'i' } },
    ],
  };
  const sort = reqBody.sortBy || { cDtStr: -1 };
  return { query, sort };
}

const getFlightSrcCldrList = (reqBody, tokenData) => {
  const data = { delFlag: false, email: { $nin: ['', null] }, mobCcNum: { $nin: ['', null] } };
  const searchStr = reqBody.searchStr || '';
  let calenderQuery = calDtFilterQuery(reqBody);
  const query = {
    ...data,
    ...calenderQuery,
    $or: [
      { 'name': { $regex: searchStr, $options: 'i' } },
      { 'mobCcNum': { $regex: searchStr, $options: 'i' } },
      { 'email': { $regex: searchStr, $options: 'i' } },
    ],
  }
  const sort = reqBody.sortBy || { cDtStr: -1 };
  return { query, sort };
}

module.exports = {
   deleteSearchQuery, getFlightSrcList, getFlightSrcCldrList
};

const dateTypeFilterQuery = (reqBody) => {
  switch (reqBody.dateType) {
    case 'Today':
      let startDay = moment.utc().startOf('day').format('YYYY-MM-DD HH:mm:ss');
      return { cDtStr: { $gte: startDay } }
    case 'Yesterday':
      let startLastDay = moment.utc().subtract(1, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
      let endDt = moment.utc().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
      return { cDtStr: { $gte: startLastDay, $lte: endDt } }
    case 'Week':
      let startWeek = moment.utc().startOf('week').format('YYYY-MM-DD HH:mm:ss');
      return { cDtStr: { $gte: startWeek } }
    case 'seven':
      let startLastSevenDay = moment.utc().subtract(7, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
      return { cDtStr: { $gte: startLastSevenDay } }
    case 'fifteen':
      let startLasFifttenDay = moment.utc().subtract(15, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
      return { cDtStr: { $gte: startLasFifttenDay } }
  }
}

const calDtFilterQuery = (reqBody) => {
  const fDate = reqBody.fromDate+' 00:00:00'; 
  const tDate = reqBody.toDate+' 23:59:59';
  return { cDtStr: { $gte: fDate, $lte: tDate } };
}
