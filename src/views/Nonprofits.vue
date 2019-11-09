<template>
    <div>
        <h2>All nonprofits</h2>

        <md-field md-clearable>
            <label>Search</label>
            <md-input v-model="search"></md-input>
        </md-field>

        <md-list class="md-triple-line" v-if="filteredNonprofits.length">
            <template v-for="(nonprofit, index) in filteredNonprofits">
                <md-divider v-if="index !== 0"></md-divider>
                <NonprofitListItem :nonprofit="nonprofit" :key="nonprofit.id" />
            </template>
        </md-list>
        <p v-else>
            No nonprofits found<template v-if="search"> matching "{{ search }}". Try searching again</template>.
        </p>
    </div>
</template>

<script>
import { db } from '@/db'
import NonprofitListItem from '@/components/NonprofitListItem.vue'

export default {
    components: {
        NonprofitListItem,
    },

    data() {
        return {
            nonprofits: [],
            search: '',
        }
    },

    computed: {
        filteredNonprofits () {
            return this.nonprofits.filter(function (nonprofit) {
                return nonprofit.name.toLowerCase().includes(this.search.toLowerCase())
            }, this)
        },
    },

    firestore: {
        nonprofits: db.collection('nonprofits').orderBy('name'),
    },
}
</script>