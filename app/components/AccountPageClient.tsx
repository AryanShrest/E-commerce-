"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const purple = "#4B1D7B";
const inputClass =
  "mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-700 focus:ring-2 focus:ring-purple-100";
const labelClass = "block text-sm font-semibold text-gray-700";

export default function AccountPageClient({ initialMode }: { initialMode: "login" | "signup" }) {
  const [mode, setMode] = useState(initialMode);
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [signupEmail, setSignupEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "signup") {
      const data = new FormData(event.currentTarget);
      if (data.get("password") !== data.get("confirmPassword")) {
        setNotice("Passwords do not match. Please check both password fields.");
        return;
      }
      setSignupEmail(String(data.get("email") ?? ""));
      setSignupStep(2);
      setNotice("");
      return;
    }
    setNotice("Account access is not connected yet. You can continue shopping as a guest.");
  }

  if (mode === "signup" && signupStep === 2) {
    return (
      <main className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-10 sm:px-6">
        <section className="w-full max-w-4xl rounded-2xl bg-white p-7 shadow-lg sm:p-10">
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Verify your email</h1>
            <p className="mt-2 text-sm text-gray-500">We sent a 6-digit code to {signupEmail || "your email address"}</p>
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
            onClick={() => setSignupStep(1)}
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
                setMode("login");
                setSignupStep(1);
                setNotice("");
              }}
              className="font-semibold text-purple-800 hover:underline"
            >
              Sign in
            </button>
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-10 sm:px-6">
      <section className={`w-full rounded-2xl bg-white p-7 shadow-lg sm:p-10 ${mode === "signup" ? "max-w-4xl" : "max-w-md"}`}>
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {mode === "login" ? "Sign in to your account to continue" : "Fill in your details to get started"}
          </p>
        </div>

        {mode === "signup" && (
          <div className="mb-7 flex items-center gap-2 text-xs font-semibold">
            <span className="rounded-full px-4 py-2 text-white" style={{ backgroundColor: purple }}>Step 1</span>
            <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-400">Step 2</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={mode === "signup" ? "grid gap-x-8 gap-y-5 sm:grid-cols-2" : "space-y-4"}>
            {mode === "signup" && (
              <label className={labelClass}>
                Name
                <input className={inputClass} name="name" autoComplete="name" placeholder="Enter your name" required />
              </label>
            )}
            <label className={labelClass}>
              Email Address
              <input className={inputClass} type="email" name="email" autoComplete="email" placeholder="Enter your email address" required />
            </label>
            <label className={labelClass}>
              Password
              <span className="relative block">
                <input
                  className={`${inputClass} ${mode === "signup" ? "pr-10" : ""}`}
                  type={mode === "signup" && showPassword ? "text" : "password"}
                  name="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  minLength={8}
                  placeholder={mode === "signup" ? "Create a strong password" : "Enter your password"}
                  required
                />
                {mode === "signup" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    <i className={`far ${showPassword ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" />
                  </button>
                )}
              </span>
            </label>
            {mode === "signup" && (
              <label className={labelClass}>
                Confirm Password
                <span className="relative block">
                  <input
                    className={`${inputClass} pr-10`}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    autoComplete="new-password"
                    minLength={8}
                    placeholder="Re-enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((visible) => !visible)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    <i className={`far ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" />
                  </button>
                </span>
              </label>
            )}
          </div>

          {mode === "login" && (
            <div className="mt-4 flex items-center justify-between text-sm">
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
          )}

          {notice && <p role="status" className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">{notice}</p>}

          <button type="submit" className="mt-5 w-full rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90" style={{ backgroundColor: purple }}>
            {mode === "login" ? "Sign In" : "Continue"}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-gray-500">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setSignupStep(1);
              setNotice("");
            }}
            className="font-semibold text-purple-800 hover:underline"
          >
            {mode === "login" ? "Register here" : "Sign in"}
          </button>
        </p>
        <Link href="/" className="mt-5 block text-center text-sm text-gray-500 hover:text-purple-700">
          Continue shopping
        </Link>
      </section>
    </main>
  );
}
