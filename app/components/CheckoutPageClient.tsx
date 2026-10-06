"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { products } from "@/lib/products";
import { useCart } from "./CartProvider";

const purple = "#4B1D7B";
const shippingCost = 25;
const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

function priceOf(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

function formatPrice(amount: number) {
  return `$${amount.toFixed(2)}`;
}

const inputClass =
  "mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-700 focus:ring-2 focus:ring-purple-100";
const labelClass = "block text-xs font-semibold text-gray-700";

export default function CheckoutPageClient() {
  const { items, isLoaded } = useCart();
  const [billingDifferent, setBillingDifferent] = useState(false);
  const [contactMode, setContactMode] = useState<"guest" | "account">("guest");
  const [accountMode, setAccountMode] = useState<"signup" | "login">("login");
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [signupEmail, setSignupEmail] = useState("");
  const [notice, setNotice] = useState("");
  const cartItems = items.flatMap((item) => {
    const product = products.find((candidate) => candidate.slug === item.slug);
    return product ? [{ ...item, product }] : [];
  });
  const subtotal = cartItems.reduce(
    (total, item) => total + priceOf(item.product.price) * item.quantity,
    0,
  );
  const total = subtotal + shippingCost;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (contactMode === "account" && accountMode === "signup") {
      const formData = new FormData(event.currentTarget);
      if (formData.get("accountPassword") !== formData.get("confirmPassword")) {
        setNotice("Passwords do not match. Please check both password fields.");
        return;
      }
    }
    if (contactMode === "account") {
      setNotice("Account sign-in and registration are not connected yet. Continue as guest to complete checkout.");
      return;
    }
    setNotice("Your checkout details are complete. Online payment is not configured yet, so no order was placed.");
  }

  function handleSignupStepOne(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get("accountPassword") !== formData.get("confirmPassword")) {
      setNotice("Passwords do not match. Please check both password fields.");
      return;
    }
    setSignupEmail(String(formData.get("accountEmail") ?? ""));
    setNotice("");
    setSignupStep(2);
  }

  if (!isLoaded) {
    return <main className="min-h-72 flex-1 bg-gray-50 px-6 py-12 text-center text-gray-500">Loading checkout…</main>;
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-72 flex-1 bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="mt-2 text-sm text-gray-500">Add a wine before continuing to checkout.</p>
          <Link href="/" className="mt-5 inline-flex rounded-lg px-5 py-3 text-sm font-semibold text-white" style={{ backgroundColor: purple }}>
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  if (contactMode === "account") {
    return (
      <main className="min-h-[32rem] flex-1 bg-gray-50 px-4 py-10 sm:px-6 sm:py-12">
        <div className={`mx-auto ${accountMode === "signup" ? "max-w-3xl" : "max-w-md"}`}>
          <button
            type="button"
            onClick={() => {
              setContactMode("guest");
              setNotice("");
            }}
            className="mb-5 text-sm font-medium text-gray-600 transition hover:text-purple-700"
          >
            <i className="fas fa-arrow-left mr-2" aria-hidden="true" />
            Back to checkout
          </button>
          {accountMode === "signup" && signupStep === 1 ? (
            <section className="rounded-2xl bg-white p-7 shadow-lg sm:p-9">
              <div className="mb-7 text-center">
                <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
                <p className="mt-2 text-sm text-gray-500">Fill in your details to get started</p>
              </div>

              <div className="mb-6 flex items-center gap-2 text-xs font-semibold">
                <span className="rounded-full px-4 py-2 text-white" style={{ backgroundColor: purple }}>Step 1</span>
                <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-400">Step 2</span>
              </div>

              <form onSubmit={handleSignupStepOne}>
                <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  <label className={labelClass}>
                    Name
                    <input className={inputClass} name="accountName" autoComplete="name" placeholder="Enter your name" required />
                  </label>
                  <label className={labelClass}>
                    Email Address
                    <input className={inputClass} type="email" name="accountEmail" autoComplete="email" placeholder="Enter your email address" required />
                  </label>
                  <label className={labelClass}>
                    Password
                    <input
                      className={inputClass}
                      type="password"
                      name="accountPassword"
                      autoComplete="new-password"
                      minLength={8}
                      placeholder="Create a strong password"
                      required
                    />
                  </label>
                  <label className={labelClass}>
                    Confirm Password
                    <input
                      className={inputClass}
                      type="password"
                      name="confirmPassword"
                      autoComplete="new-password"
                      minLength={8}
                      placeholder="Re-enter your password"
                      required
                    />
                  </label>
                </div>

                {notice && <p role="status" className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">{notice}</p>}

                <button type="submit" className="mt-5 w-full rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90" style={{ backgroundColor: purple }}>
                  Continue
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAccountMode("login");
                    setNotice("");
                  }}
                  className="font-semibold text-purple-800 hover:underline"
                >
                  Sign in
                </button>
              </p>
            </section>
          ) : accountMode === "signup" ? (
            <section className="rounded-2xl bg-white p-7 shadow-lg sm:p-10">
              <div className="mb-7 text-center">
                <h1 className="text-2xl font-bold text-gray-900">Verify your email</h1>
                <p className="mt-2 text-sm text-gray-500">
                  We sent a 6-digit code to {signupEmail || "your email address"}
                </p>
              </div>

              <div className="mb-7 flex items-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-purple-100 px-4 py-2 text-purple-900">
                  <i className="fas fa-check mr-1" aria-hidden="true" />
                  Step 1
                </span>
                <span className="rounded-full px-4 py-2 text-white" style={{ backgroundColor: purple }}>Step 2</span>
              </div>

              <div aria-label="Six-digit verification code" className="flex justify-center gap-2 sm:gap-3">
                {Array.from({ length: 6 }, (_, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    disabled
                    aria-label={`Verification code digit ${index + 1}`}
                    className="h-14 w-11 rounded-xl border border-gray-300 bg-white text-center text-xl text-gray-400 sm:h-[60px] sm:w-14"
                  />
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">Code expires in <span className="font-semibold text-gray-700">2:53</span></p>
                <button type="button" disabled className="mt-2 text-sm font-medium text-purple-400 opacity-70">
                  <i className="fas fa-redo-alt mr-2" aria-hidden="true" />
                  Resend code
                </button>
              </div>

              <button
                type="button"
                disabled
                className="mt-8 w-full cursor-not-allowed rounded-lg px-4 py-3 text-sm font-semibold text-white opacity-50"
                style={{ backgroundColor: purple }}
              >
                Verify Email
              </button>

              <button
                type="button"
                onClick={() => {
                  setSignupStep(1);
                  setNotice("");
                }}
                className="mt-8 flex w-full items-center justify-center gap-3 text-sm font-medium text-gray-600 hover:text-purple-700"
              >
                <i className="fas fa-arrow-left" aria-hidden="true" />
                Back to registration
              </button>

              <p className="mt-8 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAccountMode("login");
                    setSignupStep(1);
                    setNotice("");
                  }}
                  className="font-semibold text-purple-800 hover:underline"
                >
                  Sign in
                </button>
              </p>
            </section>
          ) : (
            <section className="rounded-2xl bg-white p-7 shadow-lg sm:p-8">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                <p className="mt-2 text-sm text-gray-500">Sign in to your account to continue</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <label className={labelClass}>
                  Email Address
                  <input className={inputClass} type="email" name="accountEmail" autoComplete="email" placeholder="Enter your email address" required />
                </label>
                <label className={labelClass}>
                  Password
                  <input
                    className={inputClass}
                    type="password"
                    name="accountPassword"
                    autoComplete="current-password"
                    minLength={8}
                    placeholder="Enter your password"
                    required
                  />
                </label>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-600">
                    <input type="checkbox" name="rememberMe" />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => setNotice("Password reset is not available until account services are connected.")}
                    className="font-medium text-purple-800 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                {notice && <p role="status" className="rounded-md bg-amber-50 p-3 text-sm text-amber-900">{notice}</p>}
                <button type="submit" className="w-full rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90" style={{ backgroundColor: purple }}>
                  Sign In
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAccountMode("signup");
                    setSignupStep(1);
                    setNotice("");
                  }}
                  className="font-semibold text-purple-800 hover:underline"
                >
                  Register here
                </button>
              </p>
            </section>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-72 flex-1 bg-gray-50 px-4 py-7 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        <p className="mt-1 text-sm text-gray-500">Enter your contact and shipping details to review your order.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(290px,0.95fr)]">
          <div className="space-y-4">
            <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4">
                <h2 className="text-sm font-bold text-gray-900">Contact</h2>
                <p className="mt-1 text-xs text-gray-500">We’ll use this for order updates. No account required.</p>
              </div>
              <div className="mb-4 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setContactMode("guest")}
                  aria-pressed
                  className="rounded-md border border-purple-400 bg-purple-50/40 p-3 text-left transition"
                >
                  <span className="block text-xs font-semibold text-gray-900">Continue as guest</span>
                  <span className="mt-1 block text-[11px] text-gray-500">No account required</span>
                </button>
                <button
                  type="button"
                  onClick={() => setContactMode("account")}
                  aria-pressed={false}
                  className="rounded-md border border-gray-200 p-3 text-left transition hover:border-gray-300"
                >
                  <span className="block text-xs font-semibold text-gray-900">Sign Up / Login</span>
                  <span className="mt-1 block text-[11px] text-gray-500">Faster checkout next time</span>
                </button>
              </div>
              <label className={labelClass}>
                Email
                <input className={inputClass} type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className={labelClass}>
                  Full name
                  <input className={inputClass} name="fullName" autoComplete="name" placeholder="Jane Guest" required />
                </label>
                <label className={labelClass}>
                  US phone
                  <input className={inputClass} type="tel" name="phone" autoComplete="tel" placeholder="(415) 555-2671" required />
                </label>
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="mb-4 text-sm font-bold text-gray-900">Shipping address</h2>
              <label className={labelClass}>
                Street address
                <input className={inputClass} name="street" autoComplete="street-address" placeholder="Street, apartment, suite..." required />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className={labelClass}>
                  City
                  <input className={inputClass} name="city" autoComplete="address-level2" required />
                </label>
                <label className={labelClass}>
                  ZIP code
                  <input className={inputClass} name="zip" autoComplete="postal-code" inputMode="numeric" required />
                </label>
                <label className={labelClass}>
                  Country
                  <input className={`${inputClass} bg-gray-50`} name="country" value="United States" readOnly />
                </label>
                <label className={labelClass}>
                  State
                  <select className={inputClass} name="state" autoComplete="address-level1" defaultValue="" required>
                    <option value="" disabled>Select state</option>
                    {states.map((state) => <option key={state}>{state}</option>)}
                  </select>
                </label>
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="mb-3 text-sm font-bold text-gray-900">Billing address</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                <label className={`flex cursor-pointer items-center gap-2 rounded-md border p-3 text-xs ${!billingDifferent ? "border-purple-400 bg-purple-50/40" : "border-gray-200"}`}>
                  <input type="radio" name="billing" checked={!billingDifferent} onChange={() => setBillingDifferent(false)} />
                  Same as shipping
                </label>
                <label className={`flex cursor-pointer items-center gap-2 rounded-md border p-3 text-xs ${billingDifferent ? "border-purple-400 bg-purple-50/40" : "border-gray-200"}`}>
                  <input type="radio" name="billing" checked={billingDifferent} onChange={() => setBillingDifferent(true)} />
                  Different address
                </label>
              </div>
              {billingDifferent && (
                <div className="mt-4 space-y-3">
                  <label className={labelClass}>
                    Billing street address
                    <input className={inputClass} name="billingStreet" autoComplete="billing street-address" required />
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className={labelClass}>
                      City
                      <input className={inputClass} name="billingCity" autoComplete="billing address-level2" required />
                    </label>
                    <label className={labelClass}>
                      ZIP code
                      <input className={inputClass} name="billingZip" autoComplete="billing postal-code" required />
                    </label>
                    <label className={labelClass}>
                      State
                      <select className={inputClass} name="billingState" autoComplete="billing address-level1" defaultValue="" required>
                        <option value="" disabled>Select state</option>
                        {states.map((state) => <option key={state}>{state}</option>)}
                      </select>
                    </label>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="text-sm font-bold text-gray-900">Shipping method</h2>
              <label className="mt-3 flex items-center justify-between gap-3 rounded-md border border-purple-400 bg-purple-50/40 p-3 text-xs">
                <span className="flex items-center gap-2">
                  <input type="radio" name="shippingMethod" defaultChecked />
                  <span><strong className="block text-gray-900">Standard shipping</strong><span className="mt-1 block text-gray-500">Estimated 4–6 business days</span></span>
                </span>
                <strong className="text-gray-900">{formatPrice(shippingCost)}</strong>
              </label>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="text-sm font-bold text-gray-900">Payment</h2>
              <div className="mt-3 flex items-center gap-3 rounded-md border border-purple-400 bg-purple-50/40 p-3">
                <i className="far fa-credit-card text-purple-700" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-gray-900">Pay with card</p>
                  <p className="mt-1 text-[11px] text-gray-500">Online card payment is not set up yet.</p>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <label className={labelClass}>
                Order notes <span className="font-normal text-gray-400">(optional)</span>
                <textarea className={`${inputClass} min-h-20 resize-y`} name="notes" placeholder="Delivery instructions..." />
              </label>
            </section>
          </div>

          <aside className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-5">
            <h2 className="text-base font-bold text-gray-900">Order summary</h2>
            <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto">
              {cartItems.map(({ product, quantity }) => (
                <li key={product.slug} className="flex items-center gap-3">
                  <div className="flex h-12 w-10 shrink-0 items-center justify-center rounded bg-gray-50 p-1">
                    <Image src={product.img} alt="" width={36} height={48} className="h-full w-full object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-medium text-gray-900">{product.title}</p>
                    <p className="mt-0.5 text-[11px] text-gray-500">Qty {quantity}</p>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-gray-900">
                    {formatPrice(priceOf(product.price) * quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 border-t border-gray-200 pt-4 text-xs">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{formatPrice(shippingCost)}</span></div>
              <div className="flex justify-between border-t border-gray-200 pt-3 text-sm font-bold"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
            <p className="mt-4 text-[11px] text-gray-500">Review your contact and shipping details before continuing.</p>
            {notice && <p role="status" className="mt-3 rounded-md bg-amber-50 p-3 text-xs text-amber-900">{notice}</p>}
            <button type="submit" className="mt-4 w-full rounded-lg px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90" style={{ backgroundColor: purple }}>
              Continue to payment
            </button>
            <Link href="/cart" className="mt-3 block text-center text-xs font-medium text-gray-600 hover:text-purple-700">
              Back to cart
            </Link>
          </aside>
        </form>
      </div>
    </main>
  );
}
