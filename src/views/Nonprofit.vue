<template>
	<div>
		<template v-if="nonprofit">
			<h2>{{ nonprofit && nonprofit.name }}</h2>

		</template>
		<template v-else>
			<h2>Nonprofit not found</h2>
			<p>A nonprofit with the id "{{ $route.params.id }}" was not found. <router-link to="/">Return home</router-link>.</p>
		</template>
	</div>
</template>

<script>
import { db } from '@/db'

const nonprofits = db.collection('nonprofits')

export default {
	data() {
		return {
			nonprofit: null,
		}
	},

	watch: {
		$route: {
			// call it upon creation too
			immediate: true,
			handler(to, from) {
				this.$bind('nonprofit', nonprofits.doc(to.params.id))
			},
		},
	},
}
</script>