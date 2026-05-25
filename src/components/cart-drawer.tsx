import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/context/cart";

export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, subtotal, clear } = useCart();
  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h3 className="font-display text-xl">Your basket</h3>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="rounded-full p-1 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">Your basket is empty.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {lines.map((l) => (
              <div key={`${l.id}-${l.variant}`} className="flex gap-4 border-b border-border/60 py-4">
                <img src={l.image} alt={l.name} className="h-20 w-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium leading-tight">{l.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {l.unit}{l.variant === "cut" ? " · cut & packed" : ""}
                      </p>
                    </div>
                    <button onClick={() => remove(l.id, l.variant)} className="text-xs text-muted-foreground hover:text-destructive">
                      Remove
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button onClick={() => setQty(l.id, l.variant, l.qty - 1)} className="p-1.5 hover:bg-muted"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-8 text-center text-sm">{l.qty}</span>
                      <button onClick={() => setQty(l.id, l.variant, l.qty + 1)} className="p-1.5 hover:bg-muted"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <p className="text-sm font-semibold">₹{l.qty * l.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {lines.length > 0 && (
          <div className="border-t border-border bg-secondary/30 px-6 py-5">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display text-xl">₹{subtotal}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="block w-full text-center rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Checkout
            </Link>
            <button onClick={clear} className="mt-2 w-full text-xs text-muted-foreground hover:text-foreground">
              Clear basket
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
