const express = require('express');
const router = express.Router();
const name = require('random-name');
const moment = require('moment');
const _ = require('lodash');
const fs = require('fs');
const frauds = require('./fraud.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const colors = ['#7cb5ec', '#222'];

function getRandomDate(lowEnd = '2015-01-01', highEnd = '2015-12-30') {
  const lowEndTimestamp = Date.parse(lowEnd);
  const highEndTimestamp = Date.parse(highEnd);

  randomTimestamp = _.random(lowEndTimestamp, highEndTimestamp);
  randomDate = new Date(randomTimestamp);
  // return moment(randomDate).format('YYYY-MM-DD');
  return [randomDate, randomTimestamp];
}

function getRandomClaimDate(lowEnd = '2016-01-01', highEnd = '2017-12-30') {
  const lowEndTimestamp = Date.parse(lowEnd);
  const highEndTimestamp = Date.parse(highEnd);

  randomTimestamp = _.random(lowEndTimestamp, highEndTimestamp);
  randomDate = new Date(randomTimestamp);
  // return moment(randomDate).format('YYYY-MM-DD');
  return [randomDate, randomTimestamp];
}

const policyHolders = 50;
const minPolicies = 1;
const maxPolicies = 1;
const minClaims = 1;
const maxClaims = 4;

router.get('/data', function(req, res, next) {
  const policyHoldersCount = policyHolders;
  const data = [];

  for (let index = 0; index < policyHoldersCount; index++) {
    if (index === 10) data.push(frauds.fraud1);
    if (index === 17) data.push(frauds.fraud2);
    if (index === 27) data.push(frauds.fraud3);

    const policyHolder = {
      name: name.first() + ' ' + name.last(),
    };

    const policyCount = _.random(minPolicies, maxPolicies);
    const policies = [];

    for (let idx = 0; idx < policyCount; idx++) {
      const policy = {
        color: colors[_.random(0, 1)],
        date: getRandomDate(),
        claims: [],
      };

      const claimsCount = _.random(minClaims, _.random(1, 4) % 4 === 0 ? maxClaims : 2);

      for (let i = 0; i < claimsCount; i++) {
        policy.claims.push({
          score: _.random(1, 100),
          date: getRandomClaimDate(policy.date),
        });
      }

      policies.push(policy);
    }

    policyHolder.policies = policies;
    data.push(policyHolder);
  }

  fs.writeFile('./public/js/data-mock.js', data, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File has been created');
  });

  res.json({ data });
});

module.exports = router;
