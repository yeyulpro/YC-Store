import { Grid, Typography } from "@mui/material";
import OrderSummary from "../../app/shared/component/OrderSummary";
import CheckoutStepper from "./CheckoutStepper";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useMemo, useRef } from "react";
import { useFetchBasketQuery } from "../basket/BasketApi";
import { useCreatePaymentIntentMutation } from "./checkoutApi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function CheckoutPage() {
  const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation();
  const created = useRef(false);
  useEffect(() => {
    if (!created.current) createPaymentIntent();
    created.current = true;
  },[createPaymentIntent])
  const { data: basket } = useFetchBasketQuery();
  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!basket?.clientSecret) return undefined;
    return {
      clientSecret: basket.clientSecret,
     
    };
  }, [basket?.clientSecret]);

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        {!stripePromise || !options || isLoading?(
          <Typography variant='h6'>Loading checkout ...</Typography>
        ):(<Elements stripe={stripePromise} options={options}>
            <CheckoutStepper />
          </Elements>)
          
        }
      </Grid>
      <Grid size={4}>
        <OrderSummary />
      </Grid>
    </Grid>
  );
}


