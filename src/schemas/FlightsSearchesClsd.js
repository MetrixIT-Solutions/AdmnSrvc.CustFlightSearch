/**
 * Copyright (C) Skillworks IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Jan 2023
 */

var config = require('config');
var mongoose = require('mongoose');
var {v4: uuidv4} = require('uuid');

mongoose.createConnection(config.mongoDBConnection);
const Schema = mongoose.Schema;

// --- Begin: Flights Searches Closed Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},

  cabinClass: {type: String, required: true}, // "ECONOMY",
  paxInfo: {
    adult: {type: String, required: true}, // "1",
    child: {type: String, required: true}, // "0",
    infant: {type: String, required: true}, // "0"
  },

  user: { type: String, required: false }, // User Id
  refUID: { type: String, required: false }, // User Refuid
  name: { type: String, required: false }, // User Name
  mobCcNum: { type: String, required: false }, // User Mobile Number With CC
  email: { type: String, required: false }, // User Email

  routeInfos: [{
    _id: {type: String, default: uuidv4()},
    fCity: {type: String, required: true}, //From City
    tCity: {type: String, required: true}, // To City
    fAirportCode: {type: String, required: true}, //From City Code
    tAirportCode: {type: String, required: true}, //To City Code
    fAirportName: {type: String, required: true}, // From City Name
    tAirportName: {type: String, required: true}, // To City Name
    fCountry: {type: String, required: true}, // From City Country
    tCountry: {type: String, required: true}, // To City Country
    tDate: {type: String, required: false},  // Travel Date
  }],

  st: {type: String, required: true}, // Search Type: Regular, Student, IT Serve
  travelType: {type: String, required: true}, //One Way, Round Trip, Multicity

  delFlag: {type: Boolean, default: false}, // Deleted Flag
  cuType: {type: String, required: true}, // Created User Type
  cUser: {type: String, required: true, trim: true}, // Created Users._id
  cuName: {type: String, required: true}, // Created Users.pName
  cDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
  cDtNum: {type: Number, required: true}, // Date & Time Number
  uuType: {type: String, required: true}, // Updated User Type
  uUser: {type: String, required: true, trim: true}, // Updated Users._id
  uuName: {type: String, required: true}, // Updated Users.pName
  uDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
  uDtNum: {type: Number, required: true}, // Date & Time Number
}, {collection: config.collFlightsSearchesClsd});

schema.index({name: 'text', mobCcNum: 'text', email: 'text', cabinClass: 'text', travelType: 'text'});
schema.index({delFlag: -1, email: 1, mobCcNum: 1, cDtStr: -1});
schema.index({cDtStr: -1, uDtStr: -1});

module.exports = mongoose.model(config.collFlightsSearchesClsd, schema);
// --- End: Flights Searches Closed Schema --- //
