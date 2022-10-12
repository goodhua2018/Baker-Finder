function showBakerDetails(bakerId) {

  const baker = state.bakers.find(baker => baker.id === bakerId)

  // console.log(baker)
  var bingApiKey = "apiKey"
 
  fetch('/bingMapsKey') 
    .then(res => res.json())
    .then(apiKey => {
      bingApiKey = apiKey;
       return fetch(`https://dev.virtualearth.net/REST/v1/Locations?CountryRegion=AU&addressLine=${baker.address}&key=${apiKey}`)
    })
    .then(res => res.json())
    .then(res => {
      // get lat, long from maps api
      const geo = res.resourceSets[0].resources[0].point.coordinates.join(',');
      const map = `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${geo}/18?mapSize=1000,1000&pp=${geo};66&mapLayer=Basemap,Buildings&key=${bingApiKey}`
      
      renderViewBakerDetails(baker, map)
    })
}
  
function renderViewBakerDetails(baker, map) {
  document.querySelector('#page').innerHTML = `
  <section class='baker-details container align-conter-center mx-auto'>
  <a onClick = "renderBakerList()">◀︎ Back to Home</a>
      <h2>${baker.name}</h2>
      <p>${baker.address}</p>
      <p>${baker.postcode}</p>
      <img class="map" src="${map}">
    </secction>
    `
}
