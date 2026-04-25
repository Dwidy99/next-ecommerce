"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { ChevronLeft, AlertCircle, Loader2 } from "lucide-react";

import { postCategory, updateCategory } from "../lib/actions";
import { ActionResult } from "@/app/(admin)/types";
import { Category } from "@prisma/client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionResult = {
  error: "",
};

interface FormCategoryProps {
  type?: "ADD" | "EDIT";
  data?: Category | null;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="sm"
      className="flex items-center gap-2 bg-black text-white hover:bg-black/90"
      disabled={pending}
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export default function FormCategory({
  data = null,
  type = "ADD",
}: FormCategoryProps) {
  const updateCategoryWithId = (_: unknown, formData: FormData) =>
    updateCategory(_, formData, data?.id ?? 0);

  const [state, formAction] = useActionState(
    type === "ADD" ? postCategory : updateCategoryWithId,
    initialState,
  );

  return (
    <form action={formAction}>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8">
        <div className="mx-auto grid max-w-3xl flex-1 auto-rows-max gap-4">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/dashboard/categories">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>

            <h1 className="flex-1 text-xl font-semibold tracking-tight">
              Category Controller
            </h1>

            <div className="hidden items-center gap-2 md:flex">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <SubmitButton />
            </div>
          </div>

          {/* Card */}
          <Card>
            <CardHeader>
              <CardTitle>Category Details</CardTitle>
              <CardDescription>
                Manage category information used for organizing products.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {state.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state.error}</AlertDescription>
                </Alert>
              )}

              <div className="grid gap-3">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Example: Electronics"
                  defaultValue={data?.name ?? ""}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Mobile Button */}
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <SubmitButton />
          </div>
        </div>
      </div>
    </form>
  );
}
