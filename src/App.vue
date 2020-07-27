<template>
  <div id="app">
    <md-tabs>
      <md-tab id="tab-dtr" md-label="DTR Summary" md-icon="people">
        <DTRSummary />
      </md-tab>
      <md-tab id="tab-settings" md-label="Settings" md-icon="settings">

      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import DTRSummary from "./components/DTRSummary.vue";

export default {
  name: "App",
  components: {
    DTRSummary,
  },
};
</script>

