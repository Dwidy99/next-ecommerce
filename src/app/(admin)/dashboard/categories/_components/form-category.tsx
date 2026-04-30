"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FolderTree,
  Loader2,
  Save,
  Sparkles,
} from "lucide-react";

import type { ActionResult, AdminCategoryFormData } from "@/app/(admin)/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
import { slugify } from "@/lib/utils";
import { createCategory, updateCategory } from "../lib/actions";

const initialState: ActionResult = {
  error: "",
};

interface FormCategoryProps {
  type?: "ADD" | "EDIT";
  data?: AdminCategoryFormData;
}

function SubmitButton({ type }: { type: "ADD" | "EDIT" }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="gap-2">
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Save className="h-4 w-4" />
      )}
      {pending
        ? type === "ADD"
          ? "Creating..."
          : "Saving..."
        : type === "ADD"
          ? "Create Category"
          : "Save Changes"}
    </Button>
  );
}

export default function FormCategory({
  data = null,
  type = "ADD",
}: FormCategoryProps) {
  const updateCategoryWithId = (_: unknown, formData: FormData) =>
    updateCategory(_, formData, data?.id);

  const [state, formAction] = useActionState(
    type === "ADD" ? createCategory : updateCategoryWithId,
    initialState,
  );

  const title = type === "ADD" ? "Create Category" : "Edit Category";
  const description =
    type === "ADD"
      ? "Add a new category so customers can browse products faster."
      : "Update category information and keep product grouping tidy.";
  const previewSlug = data?.slug ?? (data?.name ? slugify(data.name) : "category-slug");

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <section className="rounded-3xl border bg-[#110843] p-6 text-white shadow-sm md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="bg-[#FFC736] text-[#110843] hover:bg-[#FFC736]">
              {type === "ADD" ? "New Category" : "Category Editor"}
            </Badge>

            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="bg-white text-[#110843]">
              <Link href="/dashboard/categories">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <SubmitButton type={type} />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-border/70 bg-card/95 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderTree className="h-5 w-5 text-[#d99000]" />
              Category Details
            </CardTitle>
            <CardDescription>
              Keep category names simple, searchable, and easy to understand.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6">
            {state.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Unable to save category</AlertTitle>
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
              <p className="text-sm text-muted-foreground">
                This name appears in the customer catalog and navbar category
                links.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#d99000]" />
                Preview
              </CardTitle>
              <CardDescription>
                Category slug is generated automatically from the name.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="rounded-2xl border bg-muted/40 p-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Public URL
                </p>
                <p className="mt-2 break-all font-semibold text-[#110843]">
                  /categories/{previewSlug}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Best Practice
              </CardTitle>
              <CardDescription>
                Use short names like â€œPhonesâ€, â€œAccessoriesâ€, or â€œGamingâ€.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </form>
  );
}

