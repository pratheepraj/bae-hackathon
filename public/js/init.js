function initOverview(id) {
  return Highcharts.chart(id, {
    chart: {
      type: 'bubble',
      plotBorderWidth: 1,
      zoomType: 'xy',
    },

    title: {
      text: 'Overview of all claims <br>Period: <b>1st Jan 2015</b> to <b>31st Dec 2017</b>',
    },

    yAxis: {
      startOnTick: false,
      endOnTick: false,
    },

    plotOptions: {
      bubble: {
        events: {
          click: function(e) {
            toggle(e.point.category, e.point.color);
          },
        },
      },
    },
  });
}

function initDetails(id) {
  return Highcharts.chart(id, {
    chart: {
      type: 'bubble',
      plotBorderWidth: 1,
      zoomType: 'xy',
    },

    title: {
      text: 'Detailed view of selected claims',
    },

    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
      min: Date.parse('2015-01-01'),
      max: Date.parse('2017-12-30'),
    },

    yAxis: {
      startOnTick: false,
      endOnTick: false,
    },
  });
}
