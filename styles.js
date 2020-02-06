import { Circle as CircleStyle, Fill, Text, Stroke, Style } from "ol/style";
import Feature from "ol/Feature";
import Circle from "ol/geom/Circle";
var image = new CircleStyle({
    radius: 5,
    fill: null,
    stroke: new Stroke({ color: "#7b3728", width: 2 })
  });
  var image2 = new CircleStyle({
    radius: 5,
    fill: null,
    stroke: new Stroke({ color: "#2f2f30", width: 2 })
  });
  var styles = {
    Point: new Style({
      image: image
    }),
    LineString: new Style({
      stroke: new Stroke({
        color: "green",
        width: 1
      })
    }),
    MultiLineString: new Style({
      stroke: new Stroke({
        color: "green",
        width: 1
      })
    }),
    MultiPoint: new Style({
      image: image
    }),
    MultiPolygon: new Style({
      stroke: new Stroke({
        color: "yellow",
        width: 1
      }),
      fill: new Fill({
        color: "rgba(255, 255, 0, 0.1)"
      })
    }),
    Polygon: new Style({
      stroke: new Stroke({
        color: "#828373",
        lineDash: [4],
        width: 3
      }),
      fill: new Fill({
        color: "rgba(225, 226, 200, 0.4)"
      })
    }),
    GeometryCollection: new Style({
      stroke: new Stroke({
        color: "magenta",
        width: 2
      }),
      fill: new Fill({
        color: "magenta"
      }),
      image: new CircleStyle({
        radius: 10,
        fill: null,
        stroke: new Stroke({
          color: "magenta"
        })
      })
    }),
    Circle: new Style({
      stroke: new Stroke({
        color: "red",
        width: 2
      }),
      fill: new Fill({
        color: "rgba(255,0,0,0.2)"
      })
    })
  };
  var labelStyle = new Style({
    text: new Text({
      font: "10px Roboto,sans-serif",
      overflow: true,
      fill: new Fill({
        color: "#2f2f30"
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 1.5
      })
    })
  });
  var altstyles = {
    Polygon: new Style({
      stroke: new Stroke({
        color: "#7b3728",
        lineDash: [4],
        width: 3
      }),
      fill: new Fill({
        color: "rgba(97,46,22, 0.1)"
      })
    })
  };
  export var styleFunction = function(feature) {
    return styles[feature.getGeometry().getType()];
  };
  export var styleFunction2 = function(feature) {
    if (feature.get("sector") == 1) {
      styles.Point.setImage(image2);
    } else {
      styles.Point.setImage(image);
    }
  
    return styles[feature.getGeometry().getType()];
  };
 export var styleFunction3 = function(feature) {
    return altstyles[feature.getGeometry().getType()];
  };
 export var labelFunction = function(feature) {
    labelStyle.getText().setText(feature.get("NomBarrio"));
    return labelStyle;
  };
  export var labelFunction2 = function(feature) {
    labelStyle.getText().setText(feature.get("NomCol"));
    return labelStyle;
  };