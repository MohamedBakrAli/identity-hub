/**
 * @fileoverview Signin form component with validation.
 * @module components/SigninForm
 */

import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./SigninForm.css";

/**
 * Validation schema for signin form.
 */
const signinSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SigninFormData = z.infer<typeof signinSchema>;

/**
 * Signin form with validated fields for email and password.
 * Handles form submission and displays validation errors.
 */
export const SigninForm: FC = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      await signin(data);
      setFormError(null);
      navigate("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      setFormError(message);
    }
  };

  return (
    <div className="signin-card">
      <div className="signin-header">
        <h2>Welcome Back</h2>
        <p>Sign in to your account</p>
      </div>

      {formError && <div className="form-error-banner">{formError}</div>}

      <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
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
            placeholder="Enter your password"
            {...register("password")}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="signin-footer">
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};
