/**
 * Copyright (C) Skillworks IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Jan 2023
 */

const fsc = require('../../controllers/FlightsSearchCtrl');

module.exports.controller = (app) => {

  app.get('/', fsc.apiServerStatus);

  app.post('/inf365/admin/cust/flight/search/list', fsc.getFlightSrcList)
  app.post('/inf365/admin/cust/flight/search/calender/list', fsc.getFlightSrcCldrList)

};
