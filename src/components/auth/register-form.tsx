"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type FormValues = {
  name: string;
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type RegisterVariant = "init" | "error" | "fill";

type RegisterFormProps = {
  variant: RegisterVariant;
};

const initialValues: FormValues = {
  name: "",
  username: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const filledValues: FormValues = {
  name: "Diah",
  username: "diah026",
  phone: "081234567890",
  password: "Password123",
  confirmPassword: "Password123",
};

export default function RegisterForm({ variant }: RegisterFormProps) {
  // State Register
  const [values, setValues] = useState<FormValues>(() =>
    variant === "fill" ? filledValues : initialValues,
  );

  const [errors, setErrors] = useState<Partial<FormValues>>(() =>
    variant === "error"
      ? {
          name: "Name is required",
          username: "Username is required",
          phone: "Number phone is required",
          password: "Password is required",
          confirmPassword: "Confirm password is required",
        }
      : {},
  );
  // State Password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mengubah input
  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // Submit dan validasi
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const newErrors: Partial<FormValues> = {};

    if (!values.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!values.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!values.phone.trim()) {
      newErrors.phone = "Number phone is required";
    }

    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = "Password does not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    console.log("Register values:", values);
  };

  // Daftar Input
  const fields: {
    name: keyof FormValues;
    label: string;
    placeholder: string;
    password?: boolean;
  }[] = [
    {
      name: "name",
      label: "Name",
      placeholder: "Enter your name",
    },
    {
      name: "username",
      label: "Username",
      placeholder: "Enter your username",
    },
    {
      name: "phone",
      label: "Number Phone",
      placeholder: "Enter your number phone",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      password: true,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Enter your confirm password",
      password: true,
    },
  ];

  // Tampilan Register
  const panelHeight = variant === "error" ? "h-[1134px]" : "h-[1024px]";

  return (
    <main className="flex w-full items-center justify-center bg-transparent p-0 text-white">
      <section
        className={`flex ${panelHeight} w-full max-w-[523px] flex-col gap-6 rounded-[2px] border border-neutral-900 bg-[radial-gradient(ellipse_at_bottom,#5414a0_0%,#270849_40%,#000000_100%)] px-6 pt-10 pb-10 backdrop-blur-[100px]`}
      >
        {/* Background Gradient */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#5414a0_0%,#270849_35%,transparent_75%)]" />

        {/* Preview Init, Error, Fill */}

        {/* Register Card */}
        <section
          className={`flex w-[523px] shrink-0 flex-col items-center ${panelHeight}
          variant === "error" ? "h-[1134px]" : "h-[1024px]"
        } rounded-[2px] border border-[#444444] bg-black/20 px-6`}
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <Image
              src="/icons/logo.png"
              alt="Sociality Logo"
              width={20}
              height={20}
              priority
            />
            <span className="text-xl font-bold">Sociality</span>
          </div>

          {/* Title */}
          <h1 className="mx-auto flex h-[34px] w-[146px] items-center justify-center whitespace-nowrap text-display-xs font-bold text-neutral-25">
            Register
          </h1>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-5"
            noValidate
          >
            {fields.map((field) => {
              const isPassword = field.password;
              const isConfirm = field.name === "confirmPassword";

              const visible = isConfirm ? showConfirmPassword : showPassword;

              const isError = Boolean(errors[field.name]);

              return (
                <div key={field.name} className="flex w-full flex-col gap-1">
                  {/* Label */}
                  <label
                    htmlFor={field.name}
                    className="flex h-7 w-full items-center text-sm font-bold tracking-[-0.02em] text-white"
                  >
                    {field.label}
                  </label>

                  {/* Input */}
                  <div
                    className={`flex h-12 w-full items-center gap-2 rounded-xl border bg-neutral-950 px-4 py-2 ${
                      isError
                        ? "border-red-500"
                        : "border-neutral-900 focus-within:border-primary"
                    }`}
                  >
                    <input
                      id={field.name}
                      name={field.name}
                      type={
                        isPassword
                          ? visible
                            ? "text"
                            : "password"
                          : field.name === "phone"
                            ? "tel"
                            : "text"
                      }
                      value={values[field.name]}
                      onChange={(event) =>
                        handleChange(field.name, event.target.value)
                      }
                      placeholder={field.placeholder}
                      className="h-full w-full min-w-0 bg-transparent text-md text-white outline-none placeholder:text-neutral-600"
                    />

                    {/* Eye Icon */}
                    {isPassword && (
                      <button
                        type="button"
                        onClick={() =>
                          isConfirm
                            ? setShowConfirmPassword(!showConfirmPassword)
                            : setShowPassword(!showPassword)
                        }
                        className="flex shrink-0 items-center justify-center"
                        aria-label={visible ? "Hide password" : "Show password"}
                      >
                        <Image
                          src="/icons/eye.png"
                          alt=""
                          width={20}
                          height={20}
                          className="h-[18px] w-[18px] object-contain opacity-70"
                        />
                      </button>
                    )}
                  </div>

                  {/* Error Message */}
                  {errors[field.name] && (
                    <p className="text-xs font-medium text-red-500">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              );
            })}

            {/* Submit Button */}
            <Button
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary-300 p-2 text-white hover:bg-primary-300"
            >
              Submit
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-center text-md font-semibold leading-6 text-neutral-25">
            <span>Already have an account?</span>

            <Link
              href="/login"
              className="font-bold text-primary-200 hover:underline"
            >
              Log in
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
