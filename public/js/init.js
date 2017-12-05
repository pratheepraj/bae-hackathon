function initDetails(id) {
  return Highcharts.chart(id, {
    chart: {
      type: 'bubble',
      plotBorderWidth: 1,
      zoomType: 'xy'
    },

    title: {
      text: 'Detailed view of selected policies.'
    },

    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date'
      }
    },

    yAxis: {
      startOnTick: false,
      endOnTick: false
    }
  });
}

function initOverview(id) {
  return Highcharts.chart(id, {

    chart: {
      type: 'bubble',
      plotBorderWidth: 1,
      zoomType: 'xy'
    },

    title: {
      text: 'Overview of all clients'
    },

    yAxis: {
      startOnTick: false,
      endOnTick: false
    },

    plotOptions: {
      bubble: {
        events: {
          click: function (e) {
            toggle(e.point.category);
          }
        }
      }
    }
  });
}
