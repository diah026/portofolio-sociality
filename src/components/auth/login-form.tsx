"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
type LoginFormProps = {
  variant?: "login-awal" | "error" | "fill" | "login";
};

export default function LoginForm({ variant = "login-awal" }: LoginFormProps) {
  // State Email
  const [email, setEmail] = useState(
    variant === "fill" || variant === "login" ? "johndoe@email.com" : "",
  );

  // State Password
  const [password, setPassword] = useState(
    variant === "fill" || variant === "login" ? "johndoe123" : "",
  );

  // State untuk ikon mata
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");

  const isError = variant === "error";

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage("Email dan password wajib diisi.");
      return;
    }

    if (email.trim() === "johndoe@email.com" && password === "johndoe123") {
      setMessage("Login berhasil (simulasi).");
    } else {
      setMessage("Invalid email or password");
    }

    // Integrasi API Masih error di 401.
  }

  return (
    <main className="flex w-full items-center justify-center bg-transparent p-0 text-white">
      <section className="flex min-h-[450px] w-full max-w-[345px] flex-col gap-4 rounded-2xl border border-neutral-900 bg-black/20 px-4 py-8 backdrop-blur-[40px]">
        {/* Logo Sociality */}
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/icons/Logo.png"
            alt="Sociality"
            width={30}
            height={30}
            priority
          />

          <span className="text-xl font-bold">Sociality</span>
        </div>

        {/* Judul */}
        <h1 className="mx-auto flex h-[34px] w-[146px] items-center justify-center whitespace-nowrap text-display-xs font-bold text-neutral-25">
          Welcome Back!
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Input Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="flex h-7 w-full items-center text-sm font-bold tracking-[-0.02em] text-white"
            >
              Email
            </label>

            <div
              className={`flex h-12 w-full items-center gap-2 rounded-xl border bg-neutral-950 px-4 py-2 ${
                isError ? "border-accent-red" : "border-neutral-900"
              }`}
            >
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                className="h-full min-w-0 w-full bg-transparent p-0 text-md font-normal text-white outline-none placeholder:text-neutral-600"
              />
            </div>

            {/* Pesan Error Email */}
            {isError && (
              <p className="flex h-7 w-full items-center text-sm font-medium tracking-[-0.03em] text-accent-red">
                Text Helper
              </p>
            )}
          </div>

          {/* Input Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="flex h-7 w-full items-center text-sm font-bold tracking-[-0.02em] text-white"
            >
              Password
            </label>

            <div
              className={`flex h-12 w-full items-center gap-2 rounded-xl border bg-neutral-950 px-4 py-2 ${
                isError ? "border-accent-red" : "border-neutral-900"
              }`}
            >
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="h-full min-w-0 w-full bg-transparent p-0 text-md font-normal text-white outline-none placeholder:text-neutral-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
                className="flex h-5 w-5 shrink-0 items-center justify-center"
              >
                <Image src="/icons/eye.png" alt="" width={20} height={20} />
              </button>
            </div>

            {/* Pesan Error Password */}
            {isError && (
              <p className="flex h-7 w-full items-center text-sm font-medium tracking-[-0.03em] text-accent-red">
                Text Helper
              </p>
            )}
          </div>
          {/* Button Login */}
          <Button
            type="submit"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary-300 p-2 text-white hover:bg-primary-300"
          >
            Login
          </Button>
          {message && (
            <p role="status" className="text-sm text-white">
              {message}
            </p>
          )}
        </form>

        {/* Link Register */}
        <div className="flex h-[30px] items-center justify-center gap-1 whitespace-nowrap">
          <p className="text-sm font-semibold tracking-[-0.02em] text-neutral-25">
            Don&apos;t have an account?
          </p>

          <a
            href="/register"
            className="text-sm font-bold text-primary-200 hover:underline"
          >
            Register
          </a>
        </div>
      </section>
    </main>
  );
}
