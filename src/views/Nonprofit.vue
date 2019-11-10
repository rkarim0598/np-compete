<template>
  <div class="nonprofit-container">
    <template v-if="nonprofit">
      <div class="nonprofit-view">
        <md-toolbar id="title-container" :md-elevation="1">
          <span class="md-title">{{ nonprofit && nonprofit.name }}</span>
        </md-toolbar>
        <md-card-content class="header-card">
          <div class="header-container">
            <div class="header-top">
              <img
                src="https://cdn.greatnonprofits.org/images/uploads/organizations/fbcover_101536093171036740.jpg"
              />
              <div class="button-container">
                <span v-if="nonprofit.location">
                <a
                  v-if="nonprofit.location"
                  :href="`http://maps.google.com/maps?q=${nonprofit.location._lat},${nonprofit.location._long}`"
                  class="md-body-1"
                >Directions</a>
                <md-button :to="`${nonprofit.id}/donate`" class="md-raised da-button-donate">Donate</md-button>
                <md-button class="md-raised da-button-twitter">Tweet to Vote</md-button>
              </div>
            </div>
            <div class="header-bottom">
              <span class="md-title">About Us</span>
              <span class="md-body-1">{{ nonprofit.description }}</span>
              <a
                :href="nonprofit.website"
                class="md-body-1"
              >Visit our website to learn how you can help us!</a>
            </div>
            <div class="md-layout md-gutter">
              <md-list class="md-triple-line md-layout-item md-large-size-50">
                <template v-for="(donation) in filteredDonations">
                  <md-list-item :key="donation.id">
                    <div class="md-list-item-text">
                      <span>
                        <strong>{{ donation.anonymous ? 'Anonymous' : donation.name }}</strong> donated
                        <strong>{{ donation.amount | currency }}</strong>
                      </span>
                      <span>{{ donation.timestamp.toDate() }}</span>
                    </div>
                  </md-list-item>
                </template>
              </md-list>
              <!-- <iframe
                class="md-layout-item"
                frameborder="0"
                style="border:0"
                :src="`https://www.google.com/maps/embed/v1/location?center=${nonprofit.location._lat},${nonprofit.location._long}&zoom=8&key=AIzaSyCFtSAQ7lAc-LZUQzfmNQ5zE5zqYLcjzAI`"
                allowfullscreen
              ></iframe> -->
            </div>
          </div>
        </md-card-content>
      </div>
    </template>
    <template v-else>
      <h2>Nonprofit not found</h2>
      <p>
        A nonprofit with the id "{{ $route.params.id }}" was not found.
        <router-link to="/">Return home</router-link>.
      </p>
    </template>
  </div>
</template>

<style lang="scss">
.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.nonprofit-container {
  justify-content: center;
  .nonprofit-view {
    width: 100%;

    .md-toolbar {
      margin-top: 20px;
      align-items: center;
      background-color: rgb(182, 18, 27);

      .md-title {
        width: 90%;
        text-align: center;
        color: white;
      }
    }

    .header-card {
      display: flex;
      .header-container {
        margin: 10px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .header-top {
          height: 45%;
          width: 100%;
          display: flex;
          flex-direction: row;
          img {
            height: 100%;
            width: 60%;
          }

          .button-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 40%;
            align-items: center;
            justify-content: space-evenly;

            @mixin da-button($color) {
              width: 60%;
              height: 15%;
              min-width: 110px;
              background-color: $color;
              color: white;
            }

            .da-button-donate {
              @include da-button(green);
            }
            .da-button-share {
              @include da-button(blue);
              margin-left: 8px;
            }

            .da-button-twitter {
              @include da-button(#1dcaff);
              margin-left: 8px;
            }
          }
        }

        .header-bottom {
          display: flex;
          height: 45%;
          width: 100%;
          flex-direction: column;
        }
      }
    }
  }
}
</style>

<script>
import { db } from "@/db";

const nonprofits = db.collection("nonprofits");
const donations = db.collection("donations");

export default {
  data() {
    return {
      nonprofit: null,
      npDonations: null,
    };
  },
  computed: {
    filteredDonations: function() {
      return this.npDonations.filter(
        donation => donation.np.id == this.nonprofit.id
      );
    }
  },
  watch: {
    $route: {
      // call it upon creation too
      immediate: true,
      handler(to, from) {
        this.$bind("nonprofit", nonprofits.doc(to.params.id));
        this.$bind("npDonations", donations);
      }
    }
  }
};
</script>