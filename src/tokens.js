/**
 * Copyright (C) Skillworks IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Jan 2023
 */

var config = require('config');
var jwt = require('jsonwebtoken');
var moment = require('moment');

'use strict';
var crypto = require('crypto');

var logger = require('./lib/logger');

const ENCRYPTION_KEY = config.criptoEncryptKey; // process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

const decodeApiKey = (apiKey) => {
  const voStr = decrypt(apiKey);
  const vndrObj = voStr ? JSON.parse(voStr) : {};
  return vndrObj;
}
/**
 * Begin: adminUserRefreshToken
 * @param {string} reqToken string
 * @param {object} res
 * @return {function} callback function
 */
const adminUserRefreshToken = (reqToken, res) => {
  try {
    const currentDtNum = moment().valueOf();
    const jwtToken = decrypt(reqToken);
    const tokenData = jwt.verify(jwtToken, config.jwtSecretKey);
    const exp = (tokenData.tt === 'Mobile') ? moment().add(config.mobSessionExpire, config.mobSessionExpireType).valueOf() : (moment().add(config.webSessionExpire, config.webSessionExpireType).valueOf());
    if(tokenData.exp >= currentDtNum) {
      const payload = {
        iss: tokenData.iss,
        uid: tokenData.uid,
        mp: tokenData.mp,
        mpt: tokenData.mpt,
        mpv: tokenData.mpv,
        pn: tokenData.pn,
        sn: tokenData.sn,
        mn: tokenData.mn,
        eid: tokenData.eid,
        ur: tokenData.ur,
        up: tokenData.up,
        us: tokenData.us,
        exp
      };

      const jwtNewToken = jwt.sign(payload, config.jwtSecretKey);
      const token = encrypt(jwtNewToken);
      res.header('infadatoken', token);
      return {tokenData, isExpired: false};
    } else {
      res.header('infadatoken', reqToken);
      return {tokenData, isExpired: true};
    }
  } catch(error) {
    logger.error('src/tokens.js - adminUserRefreshToken: Un-Known Error: ' + error);
    return null;
  }
}
// --- End: adminUserRefreshToken

// --- Begin: adminUserTokenDecode
const adminUserTokenDecode = (reqToken) => {
  try {
    const currentDtNum = moment().valueOf();
    const jwtToken = decrypt(reqToken);
    const tokenData = jwt.decode(jwtToken, config.jwtSecretKey);
    if(tokenData.exp >= currentDtNum) {
      return {tokenData, isExpired: false};
    } else {
      return {tokenData, isExpired: true};
    }
  } catch(error) {
    logger.error('src/tokens.js - adminUserTokenDecode: Un-Known Error: ' + error);
    return null;
  }
}
// --- End: adminUserTokenDecode

// --- Begin: accessTokenValidation
const accessTokenValidation = (reqToken, res, tokenType, callback) => {
  try {
    if(reqToken) {
      const tokenObj = adminUserRefreshToken(reqToken, res, tokenType);
      if (tokenObj && !tokenObj.isExpired) {
        callback({httpStatus: 200, status: '200', tokenData: tokenObj.tokenData});
      } else if (tokenObj && tokenObj.isExpired) {
        logger.error('src/tokens.js - accessTokenValidation: Error: Access token has been expired');
        callback({httpStatus: 400, status: '190', tokenData: {}});
      } else {
        logger.error('src/tokens.js - accessTokenValidation: Error: Access token decode failed');
        callback({httpStatus: 400, status: '191', tokenData: {}});
      }
    } else {
      logger.error('src/tokens.js - accessTokenValidation: Error: Access token is required');
      callback({httpStatus: 400, status: '192', tokenData: {}});
    }
  } catch(error) {
    logger.error('src/tokens.js - accessTokenValidation: Un-Known Error: ' + error);
    callback({httpStatus: 500, status: '199', tokenData: {}});
  }
}
// --- End: accessTokenValidation

/**
 * @param {string} text string
 * @return {string}
 */
const encrypt = (text) => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * @param {string} text string
 * @return {string}
 */
const decrypt = (text) => {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = {
  decodeApiKey, adminUserRefreshToken, adminUserTokenDecode,
  accessTokenValidation, decrypt, encrypt
};
