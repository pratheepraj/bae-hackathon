var DATA = null;
var NAMES = null;
var FILTERED_DATA = [];
var FILTERED_PLOTLINES = [];

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
  return NAMES;
}

function getSeries() {
  var series = [];
  for (var i = 0; i < NAMES.length; i++) {
    series.push(getSerie(NAMES[i], false, 1, i));
  }

  return series;
}

function getSerie(name, isDetailed, size) {
  var data = [];
  var claims = _.find(DATA, { name: name }).policies[0].claims;
  for (var j = 0; j < claims.length; j++) {
    if (isDetailed) {
      data.push([claims[j].date[1], claims[j].score, size]);
    } else {
      console.log(name);
      data.push([NAMES.indexOf(name), claims[j].score, size]);
    }
  }

  return {
    name: name,
    data: data,
  };
}

function getPlotline(name) {
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
  return DATA;
}

function toggleDetailedData(name) {
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

  console.log(FILTERED_DATA);
  console.log(FILTERED_PLOTLINES);
}

function toggle(name) {
  toggleDetailedData(name);
  while (detail.series.length > 0) detail.series[0].remove(true);

  for (var i = 0; i < FILTERED_DATA.length; i++) {
    detail.addSeries(FILTERED_DATA[i]);
  }

  detail.xAxis[0].update({
    plotLines: FILTERED_PLOTLINES,
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
    console.log('========================');
    console.log('RESPONSE', response);
    DATA = response.data;
    NAMES = _.map(DATA, 'name');

    initialize();
  });
}
