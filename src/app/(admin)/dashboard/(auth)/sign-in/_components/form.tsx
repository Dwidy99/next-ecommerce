"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { SignIn } from "../lib/actions";
import { ActionResult } from "@/types";
import { useFormStatus } from "react-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useActionState } from "react";

const initialState: ActionResult = {
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      Login
    </Button>
  );
}

export default function FormSignIn() {
  const [state, formAction] = useActionState(SignIn, initialState);

  console.log(state);

  return (
    <form action={formAction}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Validation Error</AlertTitle>
              <AlertDescription>
                <p>{state.error}</p>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="guest@gmail.com"
                value="guest.admin@gmail.com"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value="qwerty123"
              />
            </div>
          </div>
          <div className="flex flex-col my-5 gap-3">
            <SubmitButton />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
