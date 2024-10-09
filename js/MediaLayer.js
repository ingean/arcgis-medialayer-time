
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js"
import VideoElement from "@arcgis/core/layers/support/VideoElement.js"
import MediaLayer from "@arcgis/core/layers/MediaLayer.js"
import ExtentAndRotationGeoreference from "@arcgis/core/layers/support/ExtentAndRotationGeoreference.js"
import Extent from "@arcgis/core/geometry/Extent.js"

const videoUrl = "https://arcgis.github.io/arcgis-samples-javascript/sample-data/media-layer/videos/hurricanes_aerosol-aug.mp4"
const videoUrl2 = "https://ts.geodata.no/video/rest/services/HurricaneHarvey/VideoServer/0/original"

const hurricaneTrackLayer = new FeatureLayer({
  url: "https://services3.arcgis.com/qIYk15xMDfmQQUsY/arcgis/rest/services/HurricaneTrack/FeatureServer",
  title: "Orkanbane",
  visible: true
});

const hurricaneCenterLayer = new FeatureLayer({
  url: "https://services.arcgis.com/2JyTvMWQSnM2Vi8q/arcgis/rest/services/Hurricane_Harvey_Point/FeatureServer/0",
  title: "Orkansenter",
  visible: true
});

const videoElement = new VideoElement({
  video: videoUrl,
  georeference: new ExtentAndRotationGeoreference({
      extent: new Extent({
          xmin: -150,
          ymin: 1,
          xmax: 20,
          ymax: 80,
          spatialReference: {
              wkid: 4326
          }
      })
  })
});

// Add the video to a MediaLayer
const mediaLayer = new MediaLayer({
  source: [videoElement],
  title: "2017 Hurricane Harvey video",
  copyright: "NASA's Goddard Space Flight Center"
});

export const addMediaLayer = (view, webMap, timeSlider) => {
  webMap.addMany([mediaLayer, hurricaneTrackLayer, hurricaneCenterLayer], 1)

  view.whenLayerView(hurricaneCenterLayer).then((lv) => {
    // around up the full time extent to full hour
    //timeSlider.fullTimeExtent = hurricaneCenterLayer.timeInfo.fullTimeExtent.expandTo("hours");
    timeSlider.fullTimeExtent = {
      start: new Date(2017, 7, 16, 8, 0, 0),
      end: new Date(2017, 7, 28, 11,0,0)
    }
    timeSlider.stops = {
      interval: {value: 1, unit: 'hours'}
    };
    timeSlider.mode = 'cumulative-from-start'
    timeSlider.loop = true
    timeSlider.playRate = 50
  });
}