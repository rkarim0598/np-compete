<template>
    <div>
        <h2>All nonprofits</h2>
        <ul v-for="nonprofit in nonprofits" :key="nonprofit.id">
            <li>
                <router-link :to="'/nonprofits/' + nonprofit.id">{{ nonprofit.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { db } from '@/db'

export default {
  data() {
    return {
      nonprofits: [],
    }
  },

  firestore: {
    nonprofits: db.collection('nonprofits'),
  },
}
</script>