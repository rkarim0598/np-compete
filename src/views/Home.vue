<template>
	<div>
		<div class="hero">
			<h2 class="header">Make a difference to what matters to you</h2>
			<p>Your donations go farther with <strong>NP Compete</strong>.</p>
			<p>
				<md-button class="md-raised" to="/about">Find out more</md-button>
			</p>
		</div>

	<div class="home">
		<div class="md-layout md-gutter">
			<section class="md-layout-item md-small-size-50 md-xsmall-size-100">
				<h3>Nonprofit organizations</h3>

				<md-tabs>
					<md-tab id="tab-featured" md-label="Featured" md-icon="star">
						<md-list class="md-triple-line">
							<template v-for="(nonprofit, index) in nonprofitsFeatured">
								<md-divider v-if="index !== 0"></md-divider>
								<NonprofitListItem :nonprofit="nonprofit" :key="nonprofit.id" />
							</template>
						</md-list>
					</md-tab>

					<md-tab id="tab-popular" md-label="Popular" md-icon="flag">
						<md-list class="md-triple-line">
							<template v-for="(nonprofit, index) in nonprofitsPopular">
								<md-divider v-if="index !== 0"></md-divider>
								<NonprofitListItem :nonprofit="nonprofit" :key="nonprofit.id" />
							</template>
						</md-list>
					</md-tab>
				</md-tabs>

				<md-button to="/nonprofits/">See all</md-button>
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
								<span>{{ donation.timestamp.toDate() | dateRelative }} ago</span>
							</div>
						</md-list-item>
					</template>
				</md-list>
			</section>
		</div>
	</div>
	</div>
</template>

<style lang="scss">
.home {
	padding: 30px;
}

.hero {
	padding: 200px 100px;
	background-image: url('../assets/hero.jpg');
	background-size: cover;
	background-position: center;
	color: white;
	font-size: 1.5em;
}
</style>

<script>
import { db } from '@/db'
import NonprofitListItem from '@/components/NonprofitListItem.vue'

// const nonprofitRef = db.collection('nonprofit').doc('2DzDVrmbAbEttuOIrDef')

export default {
    components: {
        NonprofitListItem,
	},

	data() {
		return {
			donations: [],
			nonprofitsFeatured: [],
			nonprofitsPopular: [],
		}
	},

	firestore: {
		donations: db.collection('donations').orderBy('timestamp', 'desc').limit(5),
		nonprofitsFeatured: db.collection('nonprofits').where('featured', '==', true).orderBy('name'),
		nonprofitsPopular: db.collection('nonprofits').orderBy('votes', 'desc').limit(5),
	},
}
</script>
