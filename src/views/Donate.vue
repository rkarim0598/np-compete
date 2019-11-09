<template>
	<div>
		<template v-if="nonprofit">
			<h2>Donating to {{ nonprofit && nonprofit.name }}</h2>
            <form class="md-layout" v-on:submit="charge" action="https://us-central1-np-compete.cloudfunctions.net/donate" method="post" id="payment-form">
                
                <md-field>
                    <label>Your Name</label>
                    <md-input name="name"></md-input>
                </md-field>
                <md-field>
                    <label>Your Email</label>
                    <md-input name="email"></md-input>
                </md-field>
                <md-checkbox name="anonymous" v-model="anonymous">Anonymous</md-checkbox>
                <div style="width:100%">
                    <label for="card-element">
                    Credit or debit card
                    </label>
                    <div id="card-element">
                    <!-- A Stripe Element will be inserted here. -->
                    </div>

                    <!-- Used to display Element errors. -->
                    <div id="card-errors" role="alert"></div>
                </div>

                <md-field>
                    <label>Amount</label>
                    <span class="md-prefix">$</span>
                    <md-input name="amount"></md-input>
                </md-field>
                <input name="npid" type="hidden" v-bind:value="nonprofit.id">
                <input name="np" type="hidden" v-bind:value="nonprofit.name">

                <br/>
                <br/>
                <md-button type="submit" class="md-primary" :disabled="sending" style="margin-left: 0px;">Donate</md-button>
            </form>
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

let stripe = Stripe(`pk_test_fBgWJkTXqtTmGQjq0g3F2Rqk00Bw2tsMNI`),
elements = stripe.elements();
// Custom styling can be passed to options when creating an Element.
const style = {
    base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        color: "#32325d",
    },
};

// Create an instance of the card Element.
const card = elements.create('card', {style});

export default {
	data() {
		return {
            nonprofit: null,
            anonymous: false,
            sending: false
		}
	},
	watch: {
		$route: {
			// call it upon creation too
			immediate: true,
			handler(to, from) {
				this.$bind('nonprofit', nonprofits.doc(to.params.id))
			}
        },
        nonprofit: {
            handler() {
                this.$nextTick(function () {
                    if(!this.nonprofit) return;

                    // Add an instance of the card Element into the `card-element` <div>.
                    card.mount('#card-element');
                });
            }
        }
    },
    methods: {
        charge(event){
            event.preventDefault();
            this.sending = true;

            stripe.createToken(card).then(function(result) {
                if (result.error) {
                    // Inform the customer that there was an error.
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // Send the token to your server.
                    // Insert the token ID into the form so it gets submitted to the server
                    var form = document.getElementById('payment-form');
                    var hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');
                    hiddenInput.setAttribute('name', 'stripeToken');
                    hiddenInput.setAttribute('value', result.token.id);
                    form.appendChild(hiddenInput);

                    // Submit the form
                    form.submit();
                }
                this.sending = false;
            }).error(function() {
                this.sending = false;
            });
        }
    }
}
</script>