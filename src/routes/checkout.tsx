import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/context/cart";
import { ArrowLeft, CheckCircle2, CreditCard, ShoppingBag, Truck, DollarSign, Smartphone } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Chopzy" },
      { name: "description", content: "Complete your order with Chopzy." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    timeslot: "Morning (7 AM - 10 AM)",
    payment: "cod",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const deliveryFee = subtotal > 200 ? 0 : 30;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CHOP-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(id);
    setOrderPlaced(true);
    clear();
  };

  if (orderPlaced) {
    return (
      <section className="container-px mx-auto max-w-2xl py-16 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-4 text-primary animate-bounce">
            <CheckCircle2 className="h-16 w-16" />
          </div>
        </div>
        <h1 className="mt-6 font-display text-4xl md:text-5xl">Order Placed!</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Thank you for shopping with Chopzy. Your order is being prepared.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-left">
          <h3 className="font-display text-xl border-b border-border pb-3">Order Details</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID:</span>
              <span className="font-semibold font-mono">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Slot:</span>
              <span className="font-semibold">{formData.timeslot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Deliver to:</span>
              <span className="font-semibold text-right max-w-xs truncate">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-semibold uppercase">{formData.payment}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/shop"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted"
          >
            Go to Home
          </Link>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="container-px mx-auto max-w-md py-20 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 font-display text-3xl">Your basket is empty</h1>
        <p className="mt-2 text-muted-foreground">Add items from our shop to complete checkout.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Explore Shop <ArrowLeft className="h-4 w-4 rotate-180" />
        </Link>
      </section>
    );
  }

  return (
    <section className="container-px mx-auto max-w-7xl pt-8">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <h1 className="mt-6 font-display text-4xl md:text-5xl">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-7">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-2xl flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" /> Delivery details
            </h2>
            
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="name">Full Name</label>
                <input
                  id="name"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  required
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="address">Delivery Address</label>
                <textarea
                  id="address"
                  required
                  rows={3}
                  placeholder="Street details, house/apartment number, city, pincode"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="timeslot">Preferred Delivery Time</label>
                <select
                  id="timeslot"
                  value={formData.timeslot}
                  onChange={(e) => setFormData({ ...formData, timeslot: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                >
                  <option>Morning (7 AM - 10 AM)</option>
                  <option>Afternoon (12 PM - 3 PM)</option>
                  <option>Evening (5 PM - 8 PM)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-2xl">Payment method</h2>
            <div className="mt-6 grid gap-3">
              {[
                { id: "cod", label: "Cash on Delivery", icon: DollarSign, description: "Pay when we deliver your box" },
                { id: "upi", label: "UPI (Google Pay / PhonePe / Paytm)", icon: Smartphone, description: "Instantly scan UPI QR code on delivery" },
                { id: "card", label: "Credit / Debit Card", icon: CreditCard, description: "All major cards accepted" }
              ].map((method) => {
                const Icon = method.icon;
                return (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition ${
                      formData.payment === method.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:bg-muted/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={formData.payment === method.id}
                      onChange={() => setFormData({ ...formData, payment: method.id })}
                      className="mt-1 text-primary focus:ring-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-sm">{method.label}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{method.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-primary py-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 shadow-lg hover:shadow-xl shadow-primary/20"
          >
            Place Order — ₹{total}
          </button>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-6 rounded-2xl border border-border bg-secondary/30 p-6">
            <h2 className="font-display text-2xl">Order Summary</h2>

            <div className="mt-6 divide-y divide-border/60 max-h-[300px] overflow-y-auto pr-2">
              {lines.map((l) => (
                <div key={`${l.id}-${l.variant}`} className="flex gap-3 py-3 first:pt-0">
                  <img src={l.image} alt={l.name} className="h-12 w-12 rounded-lg object-cover border border-border/40" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm leading-snug">{l.name}</span>
                      <span className="font-semibold text-sm">₹{l.qty * l.price}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {l.qty} × ₹{l.price} / {l.unit} {l.variant === "cut" ? "· cut & packed" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-border pt-4 space-y-2.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span className="font-medium text-primary">
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-[11px] text-muted-foreground bg-primary/5 p-2 rounded-lg">
                  💡 Add <b>₹{200 - subtotal}</b> more in value to unlock <b>FREE Delivery</b>!
                </p>
              )}
              <div className="flex justify-between border-t border-border pt-4 font-display text-xl font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
