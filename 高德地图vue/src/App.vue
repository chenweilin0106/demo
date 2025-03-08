<template>
  <div id="app">
    <MapContainer />
  </div>
</template>

<script>
import MapContainer from './components/MapContainer.vue'
export default {
  name: 'App',
  components: { MapContainer }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body,
#container {
  width: 100%;
  height: 100%;
}
</style>
