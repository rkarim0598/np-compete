<template>
	<md-list-item>
		<div class="md-list-item-text">
			<span>
				<router-link :to="'/nonprofits/' + nonprofit.id">{{ nonprofit.name }}</router-link>
			</span>
			<span>Votes: {{ nonprofit.votes }}</span>
		</div>

		<md-button
			class="md-icon-button md-list-action"
			:href="tweetUrl"
			target="_blank"
			title="Vote using Twitter"
		>
			<md-icon>how_to_vote</md-icon>
        </md-button>
	</md-list-item>
</template>

<script>
import { makeTweetUrl } from '@/utils'

export default {
	props: {
		nonprofit: Object,
	},

    computed: {
        tweetUrl () {
            return makeTweetUrl(this.nonprofit)
        },
    },
}
</script>