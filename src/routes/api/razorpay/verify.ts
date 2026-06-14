import { createFileRoute } from "@tanstack/react-router";
import crypto from "crypto";

export const Route = createFileRoute("/api/razorpay/verify")({
  server: {
    handlers: {
      POST: async (context) => {
        try {
          const keySecret = process.env.RAZORPAY_KEY_SECRET;


          const body = await context.request.json();
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

          if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return Response.json(
              { error: "Missing required verification parameters." },
              { status: 400 }
            );
          }

          // Bypass for mock/demo checkout
          if (razorpay_order_id.startsWith("order_mock_")) {
            return Response.json({
              success: true,
              message: "Mock payment verified successfully (Sandbox Mode)",
            });
          }

          if (!keySecret) {
            return Response.json(
              { error: "Razorpay secret key is not configured." },
              { status: 500 }
            );
          }

          // Generate expected signature
          const generatedSignature = crypto
            .createHmac("sha256", keySecret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

          if (generatedSignature === razorpay_signature) {
            // Payment verified successfully.
            // In a real application, you would save this order to a database
            // and associate the user with their active subscription/credits.
            return Response.json({
              success: true,
              message: "Payment verified successfully",
            });
          } else {
            return Response.json(
              { error: "Payment verification failed. Invalid signature." },
              { status: 400 }
            );
          }
        } catch (error) {
          console.error("Error verifying payment signature:", error);
          return Response.json(
            { error: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
          );
        }
      },
    },
  },
});
