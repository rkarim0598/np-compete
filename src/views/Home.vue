<template>
	<div class="home">
		<h2>Make a difference to what matters to you</h2>
		<p>Your donations go farther with <strong>NP Compete</strong>.</p>

		<div class="md-layout">
			<section class="md-layout-item md-small-size-50 md-xsmall-size-100">
				<h3>Featured nonprofits</h3>
			</section>

			<section class="md-layout-item md-small-size-50 md-xsmall-size-100">
				<h3>Most recent donations</h3>

				<md-list class="md-triple-line">
					<template v-for="(donation, index) in donations">
						<md-divider v-if="index !== 0"></md-divider>
						<md-list-item :key="donation.id">
							<div class="md-list-item-text">
								<span>
									<strong>{{ donation.anonymous ? 'Anonymous' : donation.name }}</strong> donated
									<strong>{{ donation.amount | currency }}</strong> to
									<strong><router-link :to="'/nonprofits/' + donation.np.id">{{ donation.np.name }}</router-link></strong>
								</span>
								<span>{{ donation.timestamp.toDate() }}</span>
							</div>
						</md-list-item>
					</template>
				</md-list>
			</section>
		</div>
	</div>
</template>

<script>
import { db } from '@/db'

// const nonprofitRef = db.collection('nonprofit').doc('2DzDVrmbAbEttuOIrDef')

export default {
	data() {
		return {
			donations: [],
			nonprofits: [],
		}
	},

	firestore: {
		donations: db.collection('donations').orderBy('timestamp'),
		nonprofits: db.collection('nonprofits')
	},
}
</script>
