import ActionBar from './components/ActionBar.js'
//import MapTheme from './components/MapTheme.js'
import { authenticate } from './utils/OAuth2.js'
import { addMediaLayer } from './MediaLayer.js'

const appId = 'xG2kkVesAXGRx5t1' // AppId for arcgis-calcite-template (Dev folder at geodata.maps.arcgis.com) 

const portal = await authenticate(appId) //Authenticate with named user using OAuth2
const mapComp = document.getElementById("viewDiv")
const timeComp = document.getElementById("timeslider")

const actionBar = new ActionBar(mapComp.view, 'layers')
//const theme = new MapTheme(webmap.view) // Contains light and dark basemap

mapComp.addEventListener("arcgisViewReadyChange", (event) => {
  const { portalItem } = event.target.map
  const navigationLogo = document.querySelector("calcite-navigation-logo")
  navigationLogo.heading = portalItem.title
  navigationLogo.description = portalItem.snippet
  navigationLogo.thumbnail = portalItem.thumbnailUrl
  navigationLogo.href = portalItem.itemPageUrl
  navigationLogo.label = "Thumbnail of map"
  
  document.querySelector("calcite-loader").hidden = true
  addMediaLayer(mapComp.view, mapComp.map, timeComp)
})