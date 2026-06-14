import { createFileRoute } from "@tanstack/react-router";
import Razorpay from "razorpay";

export const Route = createFileRoute("/api/razorpay/create-order")({
  server: {
    handlers: {
      POST: async (context) => {
        try {
          // Initialize Razorpay client with environment variables
          const keyId = process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
          const keySecret = process.env.RAZORPAY_KEY_SECRET;

          if (!keyId || !keySecret) {
            return Response.json(
              { error: "Razorpay credentials are not configured on the server." },
              { status: 500 }
            );
          }

          // Reading request body
          const body = await context.request.json();
          const { amount } = body; // in INR (e.g. 299)

          if (!amount) {
            return Response.json({ error: "Amount is required" }, { status: 400 });
          }

          // Create the order options
          const options = {
            amount: amount * 100, // Razorpay expects amount in paise (1 INR = 100 paise)
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`,
          };

          let orderId = `order_mock_${Date.now()}`;
          let isMock = false;

          // Check if placeholder keys are used
          if (keyId.includes("placeholder") || keySecret.includes("placeholder")) {
            isMock = true;
          } else {
            try {
              const instance = new Razorpay({
                key_id: keyId,
                key_secret: keySecret,
              });
              const order = await instance.orders.create(options);
              orderId = order.id;
            } catch (error: any) {
              console.warn("Razorpay API returned an error, falling back to mock mode:", error);
              // Handle authentication/401 errors gracefully for demo purposes
              if (
                error.statusCode === 401 ||
                (error.error && error.error.description === "Authentication failed")
              ) {
                isMock = true;
              } else {
                throw error;
              }
            }
          }

          return Response.json({
            success: true,
            orderId,
            amount: amount * 100,
            currency: "INR",
            keyId: keyId,
            isMock,
          });
        } catch (error: any) {
          console.error("Error creating Razorpay order:", error);
          return Response.json(
            { error: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
          );
        }
      },
    },
  },
});

