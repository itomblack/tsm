// Drawing
function drawCircle(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fill();
}

function drawGeoJSON(ctx, geojson, projection) {
  // Rough and ready geojson plotting

  ctx.strokeStyle = '#666';
  ctx.lineWidth = '0.5';
  geojson.features.forEach(function(feature) {
    var geometry = feature.geometry;
    var polygons = [];

    if(geometry.type === 'Polygon')
      polygons.push(geometry.coordinates[0]);
    else if(geometry.type == 'MultiPolygon') {
      geometry.coordinates.forEach(function(polygon) {
        polygons.push(polygon[0]);
      });
    }

    polygons.forEach(function(polygon) {
      ctx.beginPath();
      polygon.forEach(function(pt) {
        var pt = projection(pt);
        ctx.lineTo(pt[0], pt[1]);
      });
      ctx.stroke();
      ctx.closePath();
    });
  });
}


function drawPolarDayGrid(ctx, r) {
  var days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  for(var i=0; i<7; i++) {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, 1, -r);
    ctx.fillStyle = '#ccc';
    ctx.fillText(days[i], -4, -(r + 10))
    ctx.rotate(2 * Math.PI / 7);
  }    
}
