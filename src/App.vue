<template>
  <div id="app">
    <md-toolbar>
      <h1>
        <router-link to="/">NP Compete</router-link>
      </h1>
      <md-button to="/nonprofits">All nonprofits</md-button>
      <md-button to="/about">About</md-button>
    </md-toolbar>
    <md-content class="main-content">
      <router-view />
    </md-content>
  </div>
</template>

<script>
export default {
	watch: {
		$route (to) {
			if (to.meta.title) document.title = to.meta.title
		}
	}
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1 {
  flex: 1;

  a {
    color: inherit !important;
  }
}

.main-content {
  margin: 0 10%;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
}
</style>
