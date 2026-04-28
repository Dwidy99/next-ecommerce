"use client"

import { useActionState } from "react"
import Link from "next/link"
import { useFormStatus } from "react-dom"
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Globe2,
  Loader2,
  Mail,
  Save,
  Search,
  Share2,
} from "lucide-react"

import type { ActionResult, AdminConfigurationFormData } from "@/app/(admin)/types"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createConfiguration, updateConfiguration } from "../lib/actions"

const initialState: ActionResult = {
  error: "",
}

export function FormConfiguration({ config = null }: { config?: AdminConfigurationFormData }) {
  const updateConfigurationWithId = (_: unknown, formData: FormData) =>
    updateConfiguration(_, formData, config?.id ?? 0)

  const [state, formAction] = useActionState(
    config ? updateConfigurationWithId : createConfiguration,
    initialState,
  )

  const type = config ? "EDIT" : "ADD"

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <section className="rounded-3xl border bg-[#110843] p-6 text-white shadow-sm md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="bg-[#FFC736] text-[#110843] hover:bg-[#FFC736]">
              {type === "ADD" ? "New Configuration" : "Configuration Editor"}
            </Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              {type === "ADD" ? "Create Configuration" : "Edit Configuration"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              Manage website identity, SEO text, contact details, and social links.
            </p>
          </div>

          <div className="grid gap-2 sm:flex sm:flex-wrap">
            <Button
              asChild
              variant="outline"
              className="w-full border-white/30 bg-white text-[#110843] hover:bg-white/90 sm:w-auto"
            >
              <Link href="/dashboard/configurations">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <div className="hidden sm:block">
              <SubmitButton type={type} />
            </div>
          </div>
        </div>
      </section>

      {state.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Unable to save configuration</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-6">
          <Card className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe2 className="h-5 w-5 text-[#d99000]" />
                Website Identity
              </CardTitle>
              <CardDescription>
                Main settings used by customer pages, SEO, and metadata.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="webname">Website Name</Label>
                <Input
                  id="webname"
                  name="webname"
                  placeholder="Example: Shopverse"
                  defaultValue={config?.webname ?? ""}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="language">Language</Label>
                <Select name="language" defaultValue={config?.language ?? "ID"} required>
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent position="popper" align="start">
                    <SelectItem value="ID">Indonesian</SelectItem>
                    <SelectItem value="EN">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  name="tagline"
                  placeholder="Short website tagline"
                  defaultValue={config?.tagline ?? ""}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  className="min-h-32"
                  placeholder="Short description for SEO and website preview."
                  defaultValue={config?.description ?? ""}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#d99000]" />
                Contact Details
              </CardTitle>
              <CardDescription>
                Contact data shown in footer, email, or metadata.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="support@example.com"
                  defaultValue={config?.email ?? ""}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  name="website"
                  placeholder="https://example.com"
                  defaultValue={config?.website ?? ""}
                />
              </div>
              <div className="grid gap-3 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  className="min-h-24"
                  placeholder="Business address"
                  defaultValue={config?.address ?? ""}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          <Card className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-[#d99000]" />
                Social Links
              </CardTitle>
              <CardDescription>
                Optional links for customer footer and social metadata.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="grid gap-3">
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" name="facebook" defaultValue={config?.facebook ?? ""} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" name="instagram" defaultValue={config?.instagram ?? ""} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" name="twitter" defaultValue={config?.twitter ?? ""} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-[#d99000]" />
                Preview
              </CardTitle>
              <CardDescription>
                Current public identity preview.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border bg-muted/40 p-4">
                <p className="font-semibold text-[#110843]">
                  {config?.webname ?? "Website Name"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {config?.tagline ?? "Website tagline will appear here."}
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
                Keep one clear configuration per language to avoid SEO confusion.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="sticky bottom-4 z-20 flex justify-end rounded-2xl border bg-background/95 p-3 shadow-lg backdrop-blur md:hidden">
        <SubmitButton type={type} />
      </div>
    </form>
  )
}

function SubmitButton({ type }: { type: "ADD" | "EDIT" }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full gap-2 bg-[#FFC736] font-bold text-[#110843] hover:bg-[#ffda63] sm:w-auto"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {pending
        ? type === "ADD"
          ? "Creating..."
          : "Saving..."
        : type === "ADD"
          ? "Create Configuration"
          : "Save Changes"}
    </Button>
  )
}
