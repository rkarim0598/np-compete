<template>
	<div id="app">
		<md-toolbar>
			<h1><router-link to="/">NP Compete</router-link></h1>
			<md-button to="/nonprofits">All nonprofits</md-button>
			<md-button to="/about">About</md-button>
		</md-toolbar>
		<md-content>
			<router-view/>
		</md-content>
	</div>
</template>

<style lang="scss">
#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

h1 {
	flex: 1;
}
</style>
