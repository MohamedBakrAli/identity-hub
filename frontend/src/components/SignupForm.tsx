/**
 * @fileoverview Signup form component with validation.
 * @module components/SignupForm
 */

import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./SignupForm.css";

/**
 * Validation schema for signup form.
 */
const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

type SignupFormData = z.infer<typeof signupSchema>;

/**
 * Signup form with validated fields for name, email, and password.
 * Handles form submission and displays validation errors.
 */
export const SignupForm: FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setFormError(null);
      await signup(data);
      navigate("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Signup failed";
      setFormError(message);
    }
  };

  return (
    <div className="signup-card">
      <div className="signup-header">
        <h2>Create Account</h2>
        <p>Join IdentityHub today</p>
      </div>

      {formError && <div className="form-error-banner">{formError}</div>}

      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register("name")}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            {...register("password")}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
          <div className="password-requirements">
            <span>• Minimum 8 characters</span>
            <span>• At least one letter</span>
            <span>• At least one number</span>
            <span>• At least one special character</span>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <div className="signup-footer">
        <p>
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
};
