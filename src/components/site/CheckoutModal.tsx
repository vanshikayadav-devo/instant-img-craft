import * as React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Check, Loader2, Sparkles, CreditCard, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { initializePayment } from "@/lib/razorpay";
import { setIsPro } from "@/lib/credits";

interface CheckoutModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
}

export function CheckoutModal({ isOpen, onOpenChange, amount }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "India",
    companyName: "",
    gstNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/[\s-()]/g, ""))) {
      // Basic E.164 phone validation
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);
    try {
      await initializePayment({
        amount,
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        onSuccess: (paymentId) => {
          setIsPro(true);
          toast.success("Payment successful! Pro Plan is now active.");
          onOpenChange(false);
          setLoading(false);
          // Optional: redirect to dashboard/app
          if (window.location.pathname !== "/app") {
            window.location.href = "/app";
          }
        },
        onFailure: (err) => {
          console.error(err);
          toast.error(err instanceof Error ? err.message : "Payment failed. Please try again.");
          setLoading(false);
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("An error occurred starting checkout.");
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh] bg-card/95 backdrop-blur-md border border-border/60 rounded-3xl p-6 md:p-8">
        <DialogHeader className="text-left border-b border-border/40 pb-4">
          <div className="flex items-center gap-2 text-primary">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg gradient-bg">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="text-sm font-semibold tracking-wider uppercase">Subscription Checkout</span>
          </div>
          <DialogTitle className="text-2xl md:text-3xl font-extrabold font-heading mt-2">
            Subscribe to Pro Plan
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Please fill in your billing details below before proceeding to secure payment.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-5 mt-6 items-start">
          {/* Plan Summary Column (2/5) */}
          <div className="md:col-span-2 rounded-2xl bg-muted/40 border border-border/30 p-5 space-y-4">
            <h4 className="font-bold text-base text-foreground">Plan Details</h4>
            
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold gradient-text">₹{amount}</span>
              <span className="text-xs text-muted-foreground">/ month</span>
            </div>

            <div className="text-xs text-muted-foreground leading-relaxed">
              Billed monthly. Cancel anytime from your account settings.
            </div>

            <div className="border-t border-border/40 my-3" />

            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary shrink-0" /> Unlimited images
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary shrink-0" /> HD quality output
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary shrink-0" /> No watermark
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary shrink-0" /> Priority processing
              </li>
            </ul>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground bg-background/50 rounded-lg p-2.5 border border-border/20">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Payments secured by Razorpay (Test Mode)</span>
            </div>
          </div>

          {/* Form Column (3/5) */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  className={`w-full h-10 rounded-xl border ${
                    errors.name ? "border-rose-500 focus:ring-rose-500" : "border-input focus:ring-ring"
                  } bg-background px-3 text-sm outline-none focus:ring-2`}
                  disabled={loading}
                />
                {errors.name && <p className="text-[10px] text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. john@example.com"
                  className={`w-full h-10 rounded-xl border ${
                    errors.email ? "border-rose-500 focus:ring-rose-500" : "border-input focus:ring-ring"
                  } bg-background px-3 text-sm outline-none focus:ring-2`}
                  disabled={loading}
                />
                {errors.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 99999 99999"
                  className={`w-full h-10 rounded-xl border ${
                    errors.phone ? "border-rose-500 focus:ring-rose-500" : "border-input focus:ring-ring"
                  } bg-background px-3 text-sm outline-none focus:ring-2`}
                  disabled={loading}
                />
                {errors.phone && <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Country <span className="text-rose-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  disabled={loading}
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Company Name <span className="text-muted-foreground/50 text-[10px]">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. SnapCut Inc"
                  className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  GST Number <span className="text-muted-foreground/50 text-[10px]">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. 07AAAAA1111A1Z1"
                  className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl text-white font-semibold gradient-bg shadow-md hover:opacity-95 transition-opacity disabled:opacity-50 cursor-pointer text-sm mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  Continue to Payment
                </>
              )}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
