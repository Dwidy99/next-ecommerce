"use client"

import { useActionState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useFormStatus } from "react-dom"
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  ImagePlus,
  Loader2,
  Save,
  Sparkles,
} from "lucide-react"

import type { ActionResult, AdminBrandFormData } from "@/app/(admin)/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getImageUrl } from "@/lib/supabase"
import { createBrand, updateBrand } from "../lib/actions"

const initialState: ActionResult = {
  error: "",
}

interface FormBrandProps {
  type?: "ADD" | "EDIT"
  data?: AdminBrandFormData
}

function SubmitButton({ type }: { type: "ADD" | "EDIT" }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="gap-2">
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {pending
        ? type === "ADD"
          ? "Creating..."
          : "Saving..."
        : type === "ADD"
          ? "Create Brand"
          : "Save Changes"}
    </Button>
  )
}

export default function FormBrand({ data = null, type = "ADD" }: FormBrandProps) {
  const updateBrandWithId = (_: unknown, formData: FormData) =>
    updateBrand(_, formData, data?.id ?? 0)

  const [state, formAction] = useActionState(
    type === "ADD" ? createBrand : updateBrandWithId,
    initialState,
  )

  const title = type === "ADD" ? "Create Brand" : "Edit Brand"
  const description =
    type === "ADD"
      ? "Add a new brand with a clean logo for the catalog."
      : "Update brand identity without disturbing product relationships."

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <section className="rounded-3xl border bg-[#110843] p-6 text-white shadow-sm md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="bg-[#FFC736] text-[#110843] hover:bg-[#FFC736]">
              {type === "ADD" ? "New Brand" : "Brand Editor"}
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
              <Link href="/dashboard/brands">
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
              <Building2 className="h-5 w-5 text-[#d99000]" />
              Brand Details
            </CardTitle>
            <CardDescription>
              Upload a logo and use a short brand name for better catalog display.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {state.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Unable to save brand</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-3">
              <Label htmlFor="name">Brand Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Example: Apple"
                defaultValue={data?.name ?? ""}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="logo">Logo</Label>
              <Input id="logo" type="file" name="image" accept="image/*" />
              <p className="text-sm text-muted-foreground">
                {type === "EDIT"
                  ? "Leave empty to keep the current logo."
                  : "Use a square or transparent PNG logo when possible."}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImagePlus className="h-5 w-5 text-[#d99000]" />
                Logo Preview
              </CardTitle>
              <CardDescription>
                Current logo preview for edit mode.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex min-h-44 items-center justify-center rounded-2xl border bg-muted/40 p-6">
                {data?.logo ? (
                  <Image
                    src={getImageUrl(data.logo, "brands")}
                    alt={data.name}
                    width={180}
                    height={120}
                    className="max-h-28 w-auto object-contain"
                  />
                ) : (
                  <div className="text-center text-sm text-muted-foreground">
                    Logo preview will appear after upload.
                  </div>
                )}
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
                Keep brand logos lightweight so catalog pages load faster.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </form>
  )
}

