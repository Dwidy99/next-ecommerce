"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignIn } from "../lib/actions";
import type { ActionResult, AdminLoginFormProps } from "@/app/(admin)/types";
import { cn } from "@/lib/utils";

const initialState: ActionResult = { error: "" };
const isDevelopment = process.env.NODE_ENV === "development";
const defaultAdminEmail = isDevelopment ? "admin@example.com" : "";
const defaultAdminPassword = isDevelopment ? "Admin123!" : "";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-11 w-full rounded-xl bg-[#110843] text-white hover:bg-[#24105e]"
    >
      {pending ? "Signing in..." : "Sign in to dashboard"}
    </Button>
  );
}

export default function AdminLoginForm({ className }: AdminLoginFormProps) {
  const [state, formAction] = useActionState(SignIn, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card
      className={cn(
        "w-full max-w-md border-[#e8dfc5] bg-white/95 shadow-2xl backdrop-blur",
        className,
      )}
    >
      <CardHeader className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#110843] text-lg font-black text-[#FFC736]">
          A
        </div>
        <CardTitle className="text-2xl font-bold text-[#110843]">
          Admin Sign In
        </CardTitle>
        <CardDescription>
          Enter your admin credentials to manage the dashboard.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            {state.error && (
              <Alert variant="destructive">
                <AlertTitle>Unable to sign in</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            <Field>
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  defaultValue={defaultAdminEmail}
                  placeholder="admin@email.com"
                  className="h-11 rounded-xl pl-10"
                />
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  defaultValue={defaultAdminPassword}
                  placeholder="Password"
                  className="h-11 rounded-xl pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </Field>

            <Field>
              <SubmitButton />
              <FieldDescription className="text-center">
                {isDevelopment
                  ? "Default local login: admin@example.com / Admin123!"
                  : "This page is only for dashboard administrators."}
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
