<template>
	<div id="app">
		<md-toolbar>
			<h1><router-link to="/">NP Compete</router-link></h1>
			<md-button to="/nonprofits">All nonprofits</md-button>
			<md-button to="/about">About</md-button>
		</md-toolbar>
		<md-content class="main-content">
		<!-- <md-content id="app-container"> -->
			<router-view/>
		</md-content>
	</div>
</template>

<script>
export default {
	watch: {
		$route (to) {
			console.log(to)
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
	height: 100vh;
	width: 100vw;	
	overflow: hidden;
	#app-container {
		height: 100%;
		width: 100%;
	}
}

h1 {
	flex: 1;
}

.main-content {
	margin: 0 10%;
	background-color: transparent;
}
</style>
