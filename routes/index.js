const express = require('express');
const router = express.Router();
const name = require('random-name');
const moment = require('moment');
const _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const colors = ['red', 'blue'];

function getRandomDate(lowEnd = '2000-01-01', highEnd = '2018-01-01') {
  const lowEndTimestamp = Date.parse(lowEnd);
  const highEndTimestamp = Date.parse(highEnd);

  randomTimestamp = _.random(lowEndTimestamp, highEndTimestamp);
  randomDate = new Date(randomTimestamp);
  return moment(randomDate).format('YYYY-MM-DD');
}

const policyHolders = 50;
const minPolicies = 2;
const maxPolicies = 5;
const minClaims = 2;
const maxClaims = 10;

router.get('/data', function(req, res, next) {
  const policyHoldersCount = policyHolders;
  const data = [];

  for (let index = 0; index < policyHoldersCount; index++) {
    const policyHolder = {
      id: _.uniqueId(),
      name: name.first() + ' ' + name.last(),
    };

    const policyCount = _.random(minPolicies, maxPolicies);
    const policies = [];

    for (let idx = 0; idx < policyCount; idx++) {
      const policy = {
        id: _.uniqueId(),
        color: colors[_.random(0, 1)],
        date: getRandomDate(),
        claims: [],
      };

      const claimsCount = _.random(minClaims, maxClaims);

      for (let i = 0; i < claimsCount; i++) {
        policy.claims.push({
          id: _.uniqueId(),
          score: _.random(1, 100),
          date: getRandomDate(policy.date),
        });
      }

      policies.push(policy);
    }

    policyHolder.policies = policies;
    data.push(policyHolder);
  }

  res.json({ data });
});

module.exports = router;
