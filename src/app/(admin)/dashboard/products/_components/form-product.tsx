"use client"

import React, { ChangeEvent, startTransition, useActionState, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useFormStatus } from "react-dom"
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ImagePlus,
  Loader2,
  Package,
  Save,
  Settings2,
  Sparkles,
  Upload,
} from "lucide-react"

import type {
  ActionResult,
  AdminProductFormData,
  AdminProductFormOptions,
} from "@/app/(admin)/types"
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
import { validateFiles } from "@/lib/utils"
import { createProduct, updateProduct } from "../lib/actions"

const initialState: ActionResult = {
  error: "",
}

interface FormProductProps {
  type: "ADD" | "EDIT"
  data: AdminProductFormData
  options: AdminProductFormOptions
  defaultImages?: string[]
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
          ? "Create Product"
          : "Save Changes"}
    </Button>
  )
}

function ProductImagePicker({ defaultImages = [] }: { defaultImages?: string[] }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const placeholder = "/assets/products/placeholder.svg"
  const [previewImages, setPreviewImages] = useState<string[]>([
    placeholder,
    placeholder,
    placeholder,
  ])

  useEffect(() => {
    if (defaultImages.length > 0) {
      setPreviewImages([
        defaultImages[0] || placeholder,
        defaultImages[1] || placeholder,
        defaultImages[2] || placeholder,
      ])
    }
  }, [defaultImages])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files) return

    const urls = Array.from(files)
      .slice(0, 3)
      .map((file) => URL.createObjectURL(file))

    setPreviewImages((current) => {
      current.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url)
      })

      return [urls[0] || current[0], urls[1] || current[1], urls[2] || current[2]]
    })
  }

  return (
    <div className="grid gap-3">
      <div className="overflow-hidden rounded-2xl border bg-muted/40">
        <img
          src={previewImages[0]}
          alt="Product main preview"
          className="aspect-square w-full object-contain p-4"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {previewImages.slice(1).map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={`Product preview ${index + 2}`}
            className="aspect-square w-full rounded-xl border bg-muted/40 object-contain p-2"
          />
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex aspect-square w-full items-center justify-center rounded-xl border border-dashed bg-background transition hover:border-[#FFC736] hover:bg-[#FFF4CC]"
        >
          <Upload className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Upload images</span>
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        name="images"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}

export default function FormProduct({
  type,
  data,
  options,
  defaultImages,
}: FormProductProps) {
  const [clientError, setClientError] = useState("")

  const updateProductWithId = (_: unknown, formData: FormData) =>
    updateProduct(_, formData, data?.id ?? 0)

  const [state, formAction] = useActionState(
    type === "ADD" ? createProduct : updateProductWithId,
    initialState,
  )

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const files = formData.getAll("images") as File[]
    const uploadedFiles = files.filter(
      (file) => file instanceof File && file.size > 0,
    )
    const hasNewImage = uploadedFiles.length > 0

    if (hasNewImage) {
      const error = validateFiles(uploadedFiles)
      if (error) {
        setClientError(error)
        return
      }
    }

    setClientError("")

    startTransition(() => {
      formAction(formData)
    })
  }

  const title = type === "ADD" ? "Create Product" : "Edit Product"
  const description =
    type === "ADD"
      ? "Add a product with images, pricing, stock, and catalog grouping."
      : "Update product details while keeping existing images if no new image is uploaded."

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <section className="rounded-3xl border bg-[#110843] p-6 text-white shadow-sm md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="bg-[#FFC736] text-[#110843] hover:bg-[#FFC736]">
              {type === "ADD" ? "New Product" : "Product Editor"}
            </Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              {description}
            </p>
          </div>

          <div className="grid gap-2 sm:flex sm:flex-wrap">
            <Button
              asChild
              variant="outline"
              className="w-full border-white/30 bg-white text-[#110843] hover:bg-white/90 sm:w-auto"
            >
              <Link href="/dashboard/products">
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

      {(state.error || clientError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Unable to save product</AlertTitle>
          <AlertDescription>{state.error || clientError}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="grid gap-6">
          <Card className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-[#d99000]" />
                Product Details
              </CardTitle>
              <CardDescription>
                Basic product information shown in the customer catalog.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Example: Wireless Headphone X200"
                  defaultValue={data?.name ?? ""}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="Example: 250000"
                  defaultValue={Number(data?.price ?? 0)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  className="min-h-36"
                  placeholder="Write a short but helpful product description."
                  defaultValue={data?.description ?? ""}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-[#d99000]" />
                Product Grouping
              </CardTitle>
              <CardDescription>
                Choose category, brand, and location for this product.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <ProductSelectField
                  label="Category"
                  name="category_id"
                  placeholder="Select category"
                  options={options.categories}
                  defaultValue={data?.category_id?.toString()}
                />
                <ProductSelectField
                  label="Brand"
                  name="brand_id"
                  placeholder="Select brand"
                  options={options.brands}
                  defaultValue={data?.brand_id?.toString()}
                />
                <ProductSelectField
                  label="Location"
                  name="location_id"
                  placeholder="Select location"
                  options={options.locations}
                  defaultValue={data?.location_id?.toString()}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          <Card className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#d99000]" />
                Product Status
              </CardTitle>
              <CardDescription>
                Control whether this product is ready or pre-order.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Label htmlFor="stock">Stock Status</Label>
                <Select
                  name="stock"
                  defaultValue={data?.stock ?? "ready"}
                  required
                >
                  <SelectTrigger
                    id="stock"
                    aria-label="Select stock status"
                    className="w-full"
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent position="popper" align="start">
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="preorder">Pre-Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImagePlus className="h-5 w-5 text-[#d99000]" />
                Product Images
              </CardTitle>
              <CardDescription>
                Upload exactly 3 product images at once.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductImagePicker defaultImages={defaultImages ?? []} />
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Best Practice
              </CardTitle>
              <CardDescription>
                Use square images and clear names to improve catalog readability.
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

function ProductSelectField({
  label,
  name,
  placeholder,
  options,
  defaultValue,
}: {
  label: string
  name: "category_id" | "brand_id" | "location_id"
  placeholder: string
  options: AdminProductFormOptions["categories"]
  defaultValue?: string
}) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={name}>{label}</Label>
      <Select name={name} defaultValue={defaultValue} required>
        <SelectTrigger id={name} aria-label={placeholder} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper" align="start">
          {options.map((option) => (
            <SelectItem key={option.id} value={`${option.id}`}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

