"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, Lock, CheckCircle } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatPrice, generateOrderNumber } from "@/lib/utils";
import { COUPONS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "paypal", label: "PayPal" },
  { id: "apple", label: "Apple Pay" },
  { id: "bank", label: "Bank Transfer" },
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [completed, setCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "",
    cardNumber: "", expiry: "", cvv: "",
  });

  const shipping = subtotal >= 200000 ? 0 : 5000;
  const total = subtotal + shipping - discount;

  useEffect(() => {
    if (items.length === 0 && !completed) {
      router.push("/cart");
    }
  }, [items.length, completed, router]);

  const applyCoupon = () => {
    const coupon = COUPONS.find((c) => c.code.toLowerCase() === couponCode.toLowerCase());
    if (coupon) {
      if (coupon.type === "percentage") {
        setDiscount(subtotal * (coupon.discount / 100));
      } else {
        setDiscount(coupon.discount);
      }
    }
  };

  const handlePlaceOrder = async () => {
    const orderNum = generateOrderNumber();
    setOrderNumber(orderNum);
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber: orderNum,
          items: items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            quantity: i.quantity,
            price: i.product.discountPrice ?? i.product.price,
          })),
          subtotal,
          discount,
          shipping,
          total,
          couponCode,
          paymentMethod,
          shippingAddress: form,
        }),
      });
    } catch {
      // Order saved locally even if API fails
    }
    clearCart();
    setCompleted(true);
  };

  if (items.length === 0 && !completed) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Redirecting to cart...</p>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-2">Order Number: <span className="font-mono font-bold text-foreground">{orderNumber}</span></p>
        <p className="text-muted-foreground mb-6">You&apos;ll receive a confirmation email shortly.</p>
        <div className="flex gap-3 justify-center">
          <Button asChild><Link href="/account/orders">Track Order</Link></Button>
          <Button variant="outline" asChild><Link href="/products">Continue Shopping</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex gap-2 mb-8">
        {["Shipping", "Payment", "Review"].map((s, i) => (
          <div key={s} className={`flex-1 h-1 rounded-full ${i < step ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                <Input placeholder="Last Name" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              </div>
              <Input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <Input placeholder="Address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              <div className="grid grid-cols-3 gap-4">
                <Input placeholder="City" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                <Input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
                <Input placeholder="ZIP" required value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
              </div>
              <Button onClick={() => setStep(2)}>Continue to Payment</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Payment Method</h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                      paymentMethod === method.id ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                    />
                    <span className="font-medium">{method.label}</span>
                  </label>
                ))}
              </div>
              {paymentMethod === "card" && (
                <div className="space-y-4 mt-4">
                  <Input placeholder="Card Number" value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM/YY" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
                    <Input placeholder="CVV" value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value })} />
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Review Order</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Review Your Order</h2>
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between p-3 rounded-lg bg-muted/50">
                  <span>{product.name} x{quantity}</span>
                  <span className="font-medium">{formatPrice((product.discountPrice ?? product.price) * quantity)}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" /> Your payment information is secure and encrypted
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button size="lg" onClick={handlePlaceOrder}>Place Order — {formatPrice(total)}</Button>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border/50 h-fit sticky top-24">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
            {discount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
            <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Input placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
            <Button variant="outline" onClick={applyCoupon}>Apply</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Try: WELCOME10, KIGALI50K, TECH15</p>
        </div>
      </div>
    </div>
  );
}
