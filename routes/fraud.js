const _ = require('lodash');

const fraudClaims1 = [
  { date: '2015-08-25', score: 15 },
  { date: '2015-08-31', score: 35 },
  { date: '2015-10-25', score: 68 },
  { date: '2015-11-15', score: 75 },
];

const fraud1 = {
  name: 'Bobbette Higinbotham',
  policies: [
    {
      color: '#7cb5ec',
      date: ['2015-07-25', Date.parse('2015-07-25')],
      claims: [],
    },
  ],
};

fraudClaims1.forEach(fraud => {
  fraud1.policies[0].claims.push({
    score: fraud.score,
    date: [fraud.date, Date.parse(fraud.date)],
  });
});

const fraudClaims2 = [
  { date: '2015-05-15', score: 60 },
  { date: '2015-05-25', score: 30 },
  { date: '2015-06-01', score: 47 },
  { date: '2015-06-15', score: 80 },
  { date: '2015-06-30', score: 70 },
];

const fraud2 = {
  name: 'Stesha Graff',
  policies: [
    {
      color: '#7cb5ec',
      date: ['2015-05-01', Date.parse('2015-05-01')],
      claims: [],
    },
  ],
};

fraudClaims2.forEach(fraud => {
  fraud2.policies[0].claims.push({
    score: fraud.score,
    date: [fraud.date, Date.parse(fraud.date)],
  });
});

const fraudClaims3 = [
  { date: '2015-12-15', score: 60 },
  { date: '2016-07-25', score: 30 },
  { date: '2017-02-01', score: 47 },
  { date: '2017-11-15', score: 80 },
];

const fraud3 = {
  name: 'Leony Verdkha',
  policies: [
    {
      color: '#7cb5ec',
      date: ['2015-04-01', Date.parse('2015-04-01')],
      claims: [],
    },
  ],
};

fraudClaims3.forEach(fraud => {
  fraud3.policies[0].claims.push({
    score: fraud.score,
    date: [fraud.date, Date.parse(fraud.date)],
  });
});

module.exports = { fraud1, fraud2, fraud3 };
