var DATA = [
  {
    name: 'Younes',
    policies: [
      {
        date: Date.UTC(2016, 0, 21),
        color: '#7cb5ec',
        claims: [
          {
            score: 30,
            date: Date.UTC(2016, 3, 21)
          },

          {
            score: 50,
            date: Date.UTC(2016, 6, 21)
          },

          {
            score: 70,
            date: Date.UTC(2017, 2, 21)
          },

          {
            score: 10,
            date: Date.UTC(2017, 11, 21)
          }
        ]
      }
    ]
  },
  {
    name: 'Allen',
    policies: [
      {
        date: Date.UTC(2016, 1, 21),
        color: '#222',
        claims: [
          {
            score: 20,
            date: Date.UTC(2016, 8, 21)
          },

          {
            score: 20,
            date: Date.UTC(2016, 11, 21)
          },

          {
            score: 90,
            date: Date.UTC(2017, 5, 21)
          },

          {
            score: 50,
            date: Date.UTC(2017, 9, 21)
          }
        ]
      }
    ]
  }
];

var NAMES = _.map(DATA, 'name');
var FILTERED_DATA = [];
var FILTERED_PLOTLINES = [];

function getAllNames() {
  return NAMES;
}

function getSeries() {
  var series = [];
  for (var i = 0; i < NAMES.length; i++) {
    series.push(getSerie(NAMES[i], false, 1, i))
  }

  return series;
}

function getSerie(name, isDetailed, size) {
  var data = [];
  var claims = _.find(DATA, {name: name}).policies[0].claims;
  for (var j = 0; j < claims.length; j++) {
    if (isDetailed) {
      data.push([claims[j].date, claims[j].score, size]);
    } else {
      console.log(name);
      data.push([NAMES.indexOf(name), claims[j].score, size]);
    }
  }

  return {
    name: name,
    data: data
  };
}

function getPlotline(name) {
  for (var i = 0 ; i < DATA.length ; i++) {
    if (DATA[i].name === name) {
      return {
           color: DATA[i].policies[0].color,
           width: 2,
           value: DATA[i].policies[0].date
       };
    }
  }
}

function getOverviewData() {
  return DATA;
}

function toggleDetailedData(name) {
  var index = -1;
  for (var i = 0 ; i < FILTERED_DATA.length ; i++) {
    if (FILTERED_DATA[i].name === name) {
      index = i;
    }
  }

  if (index === -1) {
    FILTERED_DATA.push(getSerie(name, true, 30));
    FILTERED_PLOTLINES.push(getPlotline(name));
  } else {
    FILTERED_DATA.splice(index, 1);
    FILTERED_PLOTLINES.splice(index, 1);
  }

  console.log(FILTERED_DATA);
  console.log(FILTERED_PLOTLINES);
}
