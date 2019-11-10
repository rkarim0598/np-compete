<template>
  <div class="nonprofit-container" v-if="loaded">
    <template v-if="nonprofit">
      <div class="nonprofit-view">
        <md-toolbar id="title-container" :md-elevation="1">
          <span class="md-title">{{ nonprofit && nonprofit.name }}</span>
        </md-toolbar>
        <md-card-content class="header-card">
          <div class="header-container">
            <div class="header-top">
              <img v-if="nonprofit.image" :src="nonprofit.image" />
              <div class="button-container">
                <span class="md-subheading hashtag">#{{ nonprofit.hashtag }}</span>
                <span
                  class="md-title"
                >{{ `${nonprofit.votes} ${nonprofit.votes != 1 ? 'votes' : 'vote'}` }}</span>
                <a
                  target="_blank"
                  :href="`https://twitter.com/hashtag/${nonprofit.hashtag}`"
                  class="md-title"
                >{{ `${numMentions} ${numMentions != 1 ? 'Twitter votes' : 'Twitter vote'}`}}</a>
                <md-button :to="`${nonprofit.id}/donate`" class="md-raised da-button-donate">Donate</md-button>
                <md-button :href="tweetUrl" class="md-raised da-button-twitter">Vote</md-button>
              </div>
            </div>
            <div class="header-bottom">
              <h3>About Us</h3>
              <p>{{ nonprofit.description }}</p>
              <a
                :href="nonprofit.website"
                target="_blank"
                class="md-body-1"
              >Visit our website to learn how you can help us!</a>
            </div>
            <div class="md-layout md-gutter">
              <md-list
                class="md-triple-line md-layout-item md-large-size-50 md-small-size-100 md-xsmall-size-100"
              >
                <h3>Recent donations to {{ nonprofit.name }}</h3>
                <template v-for="(donation, index) in filteredDonations">
                  <md-divider v-if="index !== 0"></md-divider>
                  <md-list-item :key="donation.id">
                    <div class="md-list-item-text">
                      <span>
                        <strong>{{ donation.anonymous ? 'Anonymous' : donation.name }}</strong> donated
                        <strong>{{ donation.amount | currency }}</strong>
                      </span>
                      <span>{{ donation.timestamp.toDate() | dateRelative }} ago</span>
                    </div>
                  </md-list-item>
                </template>
              </md-list>
              <iframe
                v-if="nonprofit.location"
                class="md-layout-item"
                frameborder="0"
                style="border:0"
                :src="`https://www.google.com/maps/embed/v1/place?q=${nonprofit.location._lat}%2C${nonprofit.location._long}&zoom=15&key=AIzaSyCFtSAQ7lAc-LZUQzfmNQ5zE5zqYLcjzAI`"
                allowfullscreen
              ></iframe>
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
.hashtag {
  font-style: italic;
}
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
        width: 100%;
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
              background-color: $color;
              color: white;
            }

            .da-button-donate {
              @include da-button(green);
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
const TweetJs = {
  ListTweetsOnUserTimeline: function(screenName, callback) {
    TweetJs._callApi(
      {
        Action: "ListTweetsOnUserTimeline",
        ScreenName: screenName
      },
      callback
    );
  },
  Search: function(query, callback) {
    TweetJs._callApi(
      {
        Action: "Search",
        Query: query
      },
      callback
    );
  },
  _callApi: function(request, callback) {
    var xhr = new XMLHttpRequest();
    URL = "https://www.tweetjs.com/API.aspx";
    xhr.open("POST", URL);
    xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        callback(JSON.parse(xhr.response));
      }
    };
    xhr.send(JSON.stringify(request));
  }
};
import { db } from "@/db";
import { makeTweetUrl } from "@/utils";

const nonprofits = db.collection("nonprofits");
const donations = db.collection("donations").orderBy("timestamp", "desc");

export default {
  data() {
    return {
      nonprofit: null,
      npDonations: null,
      numMentions: 0,
      loaded: false
    };
  },
  computed: {
    tweetUrl() {
      return makeTweetUrl(this.nonprofit);
    },
    filteredDonations: function() {
      return this.npDonations
        .filter(donation => donation.np.id == this.nonprofit.id)
        .slice(0, 5);
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
    },
    numMentions: function() {
      console.log(this.numMentions);
    },
    nonprofit: function() {
      if (this.nonprofit) {
        this.loaded = true;
        TweetJs.Search(this.nonprofit.hashtag, data => {
          this.numMentions = data.statuses.length;
        });
      }
    }
  }
};
</script>