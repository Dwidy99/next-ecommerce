"use client"

import { useActionState } from "react"
import Link from "next/link"
import { useFormStatus } from "react-dom"
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  MapPin,
  Save,
  Sparkles,
} from "lucide-react"

import type { ActionResult, AdminLocationFormData } from "@/app/(admin)/types"
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
import { createLocation, updateLocation } from "../lib/actions"

const initialState: ActionResult = {
  error: "",
}

type LocationFormProps = {
  type?: "ADD" | "EDIT"
  data?: AdminLocationFormData
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
          ? "Create Location"
          : "Save Changes"}
    </Button>
  )
}

export function LocationForm({ data = null, type = "ADD" }: LocationFormProps) {
  const updateLocationWithId = (_: unknown, formData: FormData) =>
    updateLocation(_, formData, data?.id)

  const [state, formAction] = useActionState(
    type === "ADD" ? createLocation : updateLocationWithId,
    initialState,
  )

  const title = type === "ADD" ? "Create Location" : "Edit Location"
  const description =
    type === "ADD"
      ? "Add a product location for stock or shipping organization."
      : "Update this location while keeping product data consistent."

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <section className="rounded-3xl border bg-[#110843] p-6 text-white shadow-sm md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="bg-[#FFC736] text-[#110843] hover:bg-[#FFC736]">
              {type === "ADD" ? "New Location" : "Location Editor"}
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
              <Link href="/dashboard/locations">
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
              <MapPin className="h-5 w-5 text-[#d99000]" />
              Location Details
            </CardTitle>
            <CardDescription>
              Use a clear name that your team can recognize quickly.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {state.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Unable to save location</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-3">
              <Label htmlFor="name">Location Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Example: Jakarta Warehouse"
                defaultValue={data?.name ?? ""}
                required
              />
              <p className="text-sm text-muted-foreground">
                This location can be assigned to products in the product form.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#d99000]" />
                Usage Preview
              </CardTitle>
              <CardDescription>
                Products can use this value as their stock or shipping location.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border bg-muted/40 p-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Location Label
                </p>
                <p className="mt-2 font-semibold text-[#110843]">
                  {data?.name ?? "Your new location"}
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
                Use simple names like “Jakarta”, “Bandung”, or “Main Warehouse”.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </form>
  )
}

export default LocationForm
