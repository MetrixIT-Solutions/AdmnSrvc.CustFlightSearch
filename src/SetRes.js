/**
 * Copyright (C) Skillworks IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Jan 2023
 */

const apiServerStatus = () => {
  return {httpStatus: 200, status: '200', resData: {message: 'IndiFly365 Admin - Customers flights search history API service is running'}};
}
const unKnownErr = (result) => {
  return {httpStatus: 500, status: '199', resData: {message: '500 - Unknown Error', result}};
}
const noData = (result) => {
  return {httpStatus: 400, status: '204', resData: {message: '204 - No Data Found', result}};
}
const tokenRequired = () => {
  return { httpStatus: 400, status: '192', resData: { message: 'Token is required' } };
}
const mandatory = () => {
  return { httpStatus: 400, status: '197', resData: { message: 'Provide required field(s) data' } };
}
const tokenInvalid = () => {
  return { httpStatus: 500, status: '191', resData: { message: 'Invalid Token' } };
}
const tokenExpired = () => {
  return { httpStatus: 400, status: '190', resData: { message: 'Token Expired' } };
}
const invalidAccess = () => {
  return { httpStatus: 400, status: '193', resData: { message: 'You do not have access' } };
}
const responseData = (result) => {
  return {httpStatus: 200, status: '200', resData: {message: 'Success', result}};
}

const deleteFailed = () => {
  return {httpStatus: 400, status: '194', resData: {message: 'Delete Trx failed'}};
}

module.exports = {
  apiServerStatus, unKnownErr, noData, tokenRequired, mandatory, tokenInvalid, tokenExpired, invalidAccess,  responseData, deleteFailed
};
