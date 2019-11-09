<template>
	<div>
		<template v-if="nonprofit">
			<h2>{{ nonprofit && nonprofit.name }}</h2>
            <form v-on:submit="charge" action="https://us-central1-np-compete.cloudfunctions.net/donate" method="post" id="payment-form">
                
                <input name="name">
                <input name="email">
                <div class="form-row">
                    <label for="card-element">
                    Credit or debit card
                    </label>
                    <div id="card-element">
                    <!-- A Stripe Element will be inserted here. -->
                    </div>

                    <!-- Used to display Element errors. -->
                    <div id="card-errors" role="alert"></div>
                </div>

                <input name="amount">
                <input name="anonymous">
                <input name="npid" type="hidden" v-bind:value="nonprofit.id">
                <input name="np" type="hidden" v-bind:value="nonprofit.name">

                <button>Submit Payment</button>
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
elements = stripe.elements(),
card = undefined;

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
			}
        },
        nonprofit: {
            handler() {
                this.$nextTick(function () {
                    if(!this.nonprofit) return;
                    // Custom styling can be passed to options when creating an Element.
                    const style = {
                    base: {
                        // Add your base input styles here. For example:
                        fontSize: '16px',
                        color: "#32325d",
                    },
                    };

                    // Create an instance of the card Element.
                    card = elements.create('card', {style});

                    // Add an instance of the card Element into the `card-element` <div>.
                    card.mount('#card-element');
                });
            }
        }
    },
    methods: {
        charge(event){
             event.preventDefault();

            console.log(card);
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
            });
        }
    }
}
</script>