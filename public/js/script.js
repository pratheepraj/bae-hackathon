var DATA = mockData.data;
var NAMES = null;
var FILTERED_DATA = [];
var FILTERED_PLOTLINES = [];
var overview = null;
var overviewData = null;
var overviewCategories = null;
var detail = null;

function initialize() {
  overview = initOverview('overview');
  overviewData = getOverviewData();
  overviewCategories = getAllNames(overviewData);

  overview.xAxis[0].setCategories(overviewCategories);
  overviewSeries = getSeries(false, 1);
  for (var i = 0; i < overviewSeries.length; i++) {
    overview.addSeries(overviewSeries[i]);
  }
  detail = initDetails('detail');
}

function getAllNames() {
  console.log('getAllNames');
  return NAMES;
}

function getSeries() {
  console.log('getSeries');
  var series = [];
  for (var i = 0; i < NAMES.length; i++) {
    series.push(getSerie(NAMES[i], false, 1, i));
  }

  return series;
}

function getSerie(name, isDetailed, size) {
  console.log('getSerie');
  var data = [];
  var claims = _.find(DATA, { name: name }).policies[0].claims;
  for (var j = 0; j < claims.length; j++) {
    if (isDetailed) {
      data.push([claims[j].date[1], claims[j].score, size]);
    } else {
      data.push([NAMES.indexOf(name), claims[j].score, size]);
    }
  }

  return {
    name: name,
    data: data,
  };
}

function getPlotline(name) {
  console.log('getPlotline');
  for (var i = 0; i < DATA.length; i++) {
    if (DATA[i].name === name) {
      return {
        color: DATA[i].policies[0].color,
        width: 2,
        value: DATA[i].policies[0].date[1],
      };
    }
  }
}

function getOverviewData() {
  console.log('getOverviewData');
  return DATA;
}

function toggleDetailedData(name) {
  console.log('toggleDetailedData');
  var index = -1;
  for (var i = 0; i < FILTERED_DATA.length; i++) {
    if (FILTERED_DATA[i].name === name) {
      index = i;
    }
  }

  if (index === -1) {
    FILTERED_DATA[0] = getSerie(name, true, 30);
    FILTERED_PLOTLINES[0] = getPlotline(name);
  } else {
    FILTERED_DATA.splice(index, 1);
    FILTERED_PLOTLINES.splice(index, 1);
  }

  console.log('FILTERED_DATA', FILTERED_DATA);
  console.log('FILTERED_PLOTLINES', FILTERED_PLOTLINES);
}

function toggle(name) {
  console.log('toggle');
  toggleDetailedData(name);
  console.log('DETAIL', detail);
  while (detail.series.length > 0) detail.series[0].remove(true);

  for (var i = 0; i < FILTERED_DATA.length; i++) {
    detail.addSeries(FILTERED_DATA[i]);
  }

  console.log('FILTERED_DATA', FILTERED_DATA);

  detail.xAxis[0].update({
    plotLines: FILTERED_PLOTLINES,
    // min: Date.parse('2015-08-25'),
  });
}

if (DATA) {
  NAMES = _.map(DATA, 'name');
  initialize();
} else {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/data',
  }).then(response => {
    DATA = response.data;
    NAMES = _.map(DATA, 'name');

    initialize();
  });
}
