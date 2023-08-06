import axios from 'axios';

export async function confirmPaymentIntent(paymentIntentId, paymentMethodId) {
  try {
    const response = await axios.post('https://s2cuia7q3g53yrztxgtebsyx5i0hbbnv.lambda-url.us-east-1.on.aws/', {
      payment_method: paymentMethodId,
      payment_intent_id: paymentIntentId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error confirming payment intent:', error);
    return -1;
  }
}