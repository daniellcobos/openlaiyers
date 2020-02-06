import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import Feature from "ol/Feature";
import TileLayer from "ol/layer/Tile";
import { OSM, TileArcGISRest, Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import GeoJSON from "ol/format/GeoJSON";
import Circle from "ol/geom/Circle";
import { Circle as CircleStyle, Fill, Text, Stroke, Style } from "ol/style";
import Colegios from "./col";
import barrios from "./barrios";
import * as styles from './styles';
const delete1 = document.getElementById("delete1");
const hidebarr = document.getElementById("hidebarrios");
const nomcol = document.getElementById("nomcol");
const listbarr = document.getElementById("listbarr");
const enviar = document.getElementById("enviarbarr");
const latbar = document.getElementById("relleno");
var firstcol= false;
var barr = barrios;
var boool2 = true;
var boool = true;
var col = Colegios;
var url =
  "http://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/educacion/infraestructuraeducativa/MapServer";
var selection = {};


var vectorSource = new VectorSource({
  features: new GeoJSON({ dataProjection: "EPSG:4326" }).readFeatures(barr)
});
var vectorSource2 = new VectorSource({
  features: new GeoJSON({ dataProjection: "EPSG:4326" }).readFeatures(col)
});

var vectorLayer = new VectorLayer({
  source: vectorSource,
  style: styles.styleFunction,
  declutter: true
});
var vectorLayer2 = new VectorLayer({
  source: vectorSource2,
  style: styles.styleFunction2,
  declutter: true
});
var vectorLayer3 = new VectorLayer({
  source: vectorSource,
  style: styles.labelFunction,
  declutter: true
});
var view2 = new View({
  projection: "EPSG:4326",
  center: [-74.08, 4.63],
  zoom: 15
});
var layers = [
  new TileLayer({
    source: new OSM()
  }),
  new TileLayer({
    source: new TileArcGISRest({
      url: url
    })
  }),
  vectorLayer,
  vectorLayer2,
  vectorLayer3
];
var map = new Map({
  layers: layers,
  target: "map",

  view: view2
});

function esconderCapa() {
  if (layers[1].values_.visible === true) {
    layers[1].values_.visible = false;
  } else {
    layers[1].values_.visible = true;
  }
  map.renderSync();
}

function esconderBarrios() {
  if (boool) {
    vectorLayer.setVisible(false);
    vectorLayer3.setVisible(false);
    boool = false;
  } else {
    vectorLayer.setVisible(true);
    vectorLayer3.setVisible(true);
    boool = true;
  }

  map.renderSync();
}

function mostrarNomCol() {
  if (boool2) {
    vectorLayer2.setStyle(styles.labelFunction2);
    boool2 = false;
  } else {
    vectorLayer2.setStyle(styles.styleFunction2);
    boool2 = true;
  }
}

var selectedFeature;
map.on("click", function(event) {
  var feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
    return feature;
  });
  vectorLayer.getFeatures(event.pixel).then(function(result) {
    const barr = result[0];
    barr.setStyle(styles.styleFunction3);
    var nombrebarr = document.createElement("li");
    nombrebarr.textContent = barr.values_.NomBarrio;
    listbarr.appendChild(nombrebarr);
  });
  if (selectedFeature) {
    selectedFeature.setStyle(styles.styleFunction);
  }
  selectedFeature = feature;
});
map.on("click", function(event) {
  var feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
    return feature;
  });
  vectorLayer2.getFeatures(event.pixel).then(function(result) {
    const col = result[0];
    const infocol = col.getProperties();
    var infocoldiv = document.createElement("div");
    infocoldiv.setAttribute("class","infocol")
    var infocolId = document.createElement("p")
    infocolId.setAttribute("id", "IdCol")
    var infocolNom = document.createElement("p")
    infocolNom.setAttribute("id", "NomCol")
    var infocolBarr = document.createElement("p")
    infocolBarr.setAttribute("id", "BarrCol")
    if (firstcol == false){

      infocolId.textContent= 'Id: ' + infocol.IdCol;
      
      infocolNom.textContent = 'Col: ' + infocol.NomCol;
      
      infocolBarr.textContent = 'Barrio: ' + infocol.Barrio;
      infocoldiv.appendChild(infocolId)
      infocoldiv.appendChild(infocolNom)
      infocoldiv.appendChild(infocolBarr)
      latbar.appendChild(infocoldiv)
      firstcol = true;
    }
   else {;
    var infocolId= document.getElementById("IdCol")
    var infocolNom= document.getElementById("NomCol")
    var infocolBarr= document.getElementById("BarrCol")
    infocolId.textContent= 'Id: ' + infocol.IdCol;
    infocolNom.textContent = 'Colegio: ' +  infocol.NomCol;
    infocolBarr.textContent = 'Barrio: ' + infocol.Barrio;
  
   }
   console.log(infocol)
  });
  
});

const searchbarrbyname = nombarr => {
  vectorSource.forEachFeature(function(feature) {
    if (feature.get("NomBarrio") == nombarr) {
      let geom = feature.getGeometry();
      var size = map.getSize();

      view2.fit(geom, { padding: [5, 5, 5, 5] }, { minResolution: 15 });
      console.log(map.getView());
      map.setView(view2);

      // add it on a temporary layer
      // and display it
      // while hiding yourVectorLayer
    }
  });
};

//center: [-8244950, 515735 ],
delete1.addEventListener("click", esconderCapa);
hidebarr.addEventListener("click", esconderBarrios);
nomcol.addEventListener("click", mostrarNomCol);
enviar.addEventListener("submit", function(evt) {
  evt.preventDefault();
  let bn = document.getElementById("barbusc").value.toUpperCase();
  searchbarrbyname(bn);
});
