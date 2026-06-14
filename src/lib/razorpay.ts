// Client-side utility for Razorpay payment popup.

/**
 * Dynamically loads the Razorpay checkout script if not already loaded.
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    
    // Check if script already exists
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface PaymentOptions {
  amount: number; // in INR (e.g. 299)
  onSuccess: (paymentId: string) => void;
  onFailure?: (error: any) => void;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
}

/**
 * Initiates the payment process by contacting the backend to create an order
 * and opening the Razorpay payment modal.
 */
export async function initializePayment({
  amount,
  onSuccess,
  onFailure,
  userName = "Valued Customer",
  userEmail = "user@example.com",
  userPhone = "9999999999",
}: PaymentOptions) {
  try {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
    }

    // 1. Call backend to create order
    const orderRes = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    if (!orderRes.ok) {
      const errorData = await orderRes.json();
      throw new Error(errorData.error || "Failed to create order on the server.");
    }

    const orderData = await orderRes.json();
    const { orderId, keyId, isMock } = orderData;

    if (isMock) {
      // Create a nice mock overlay dialog dynamically in the DOM
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.inset = "0";
      overlay.style.backgroundColor = "rgba(0,0,0,0.6)";
      overlay.style.backdropFilter = "blur(4px)";
      overlay.style.zIndex = "99999";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.fontFamily = "system-ui, sans-serif";

      const modal = document.createElement("div");
      modal.style.background = "#1e1b4b"; // Dark premium indigo
      modal.style.border = "1px solid rgba(99, 102, 241, 0.3)";
      modal.style.padding = "2rem";
      modal.style.borderRadius = "1.5rem";
      modal.style.maxWidth = "400px";
      modal.style.width = "90%";
      modal.style.textAlign = "center";
      modal.style.color = "white";
      modal.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";

      modal.innerHTML = `
        <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem; background: linear-gradient(to right, #a855f7, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Razorpay Sandbox Mode</h3>
        <p style="font-size: 0.875rem; color: #a5b4fc; margin-bottom: 1.5rem; line-height: 1.4;">
          Your server is using placeholder Razorpay credentials. You can simulate the checkout process below.
        </p>
        <div style="font-weight: bold; font-size: 1.875rem; margin-bottom: 1.5rem;">₹${amount}</div>
        <div style="display: flex; gap: 10px; justify-content: center;">
          <button id="mock-success-btn" style="background: linear-gradient(to right, #6366f1, #a855f7); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 9999px; font-weight: 600; cursor: pointer; flex: 1; transition: opacity 0.2s;">
            Simulate Success
          </button>
          <button id="mock-fail-btn" style="background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.15); padding: 0.75rem 1.5rem; border-radius: 9999px; font-weight: 600; cursor: pointer; flex: 1; transition: background 0.2s;">
            Cancel
          </button>
        </div>
      `;

      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      return new Promise<void>((resolve) => {
        const successBtn = modal.querySelector("#mock-success-btn");
        const failBtn = modal.querySelector("#mock-fail-btn");

        const cleanup = () => {
          document.body.removeChild(overlay);
        };

        successBtn?.addEventListener("click", async () => {
          cleanup();
          try {
            // Call verification endpoint with mock data
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: orderId,
                razorpay_payment_id: `pay_mock_${Date.now()}`,
                razorpay_signature: "mock_sig",
              }),
            });

            if (!verifyRes.ok) {
              throw new Error("Mock signature verification failed.");
            }

            onSuccess(`pay_mock_${Date.now()}`);
          } catch (err) {
            if (onFailure) onFailure(err);
          }
          resolve();
        });

        failBtn?.addEventListener("click", () => {
          cleanup();
          if (onFailure) onFailure(new Error("Payment cancelled by user."));
          resolve();
        });
      });
    }

    // 2. Configure Razorpay options
    const options = {
      key: keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "SnapCut AI",
      description: `Purchase subscription / credits`,
      image: "https://snapcut-ai.vercel.app/logo.png", // Replace with actual logo URL if available
      order_id: orderId,
      config: {
        display: {
          blocks: {
            upi: {
              name: "UPI / QR Code (Fast)",
              instruments: [
                {
                  method: "upi",
                  flows: ["intent", "qr"]
                }
              ]
            }
          },
          sequence: ["block.upi"],
          preferences: {
            show_default_blocks: true
          }
        }
      },
      handler: async function (response: any) {
        // 3. Verify payment signature on backend
        try {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (!verifyRes.ok) {
            const errorData = await verifyRes.json();
            throw new Error(errorData.error || "Signature verification failed.");
          }

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            onSuccess(response.razorpay_payment_id);
          } else {
            throw new Error("Verification failed.");
          }
        } catch (err) {
          if (onFailure) onFailure(err);
        }
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: userPhone,
      },
      notes: {
        address: "Corporate Office",
      },
      theme: {
        color: "#6366f1", // Indigo/Primary brand color
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on("payment.failed", function (response: any) {
      if (onFailure) onFailure(response.error);
    });
    rzp.open();
  } catch (error) {
    if (onFailure) onFailure(error);
  }
}
