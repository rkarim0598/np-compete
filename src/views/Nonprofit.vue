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
                <md-button class="md-raised da-button-donate">Donate</md-button>
                <md-button class="md-raised da-button-share">Share</md-button>
                <md-button class="md-raised da-button-twitter">Tweet to Vote</md-button>
              </div>
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
.nonprofit-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  .nonprofit-view {
    width: 93%;

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
      box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
        0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
      height: 80%;
      .header-container {
        margin: 10px;
        width: 100%;
        .header-top {
          height: 50%;
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
			}

			.da-button-twitter {
				@include da-button(#1dcaff);
			}
          }
        }
      }
    }
  }
}
</style>

<script>
import { db } from "@/db";

const nonprofits = db.collection("nonprofits");

export default {
  data() {
    return {
      nonprofit: null
    };
  },

  watch: {
    $route: {
      // call it upon creation too
      immediate: true,
      handler(to, from) {
        this.$bind("nonprofit", nonprofits.doc(to.params.id));
      }
    }
  }
};
</script>