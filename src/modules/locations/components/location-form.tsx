"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ActionResult } from "@/types"
import { Location } from "@prisma/client"
import { Label } from "@radix-ui/react-label"
import { AlertCircle, ChevronLeft, Loader2Icon } from "lucide-react"
import Link from "next/link"
import React, { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { createLocation, updateLocation } from "../actions"

const initialState: ActionResult = {
  error: "",
}

type LocationFormProps = {
  type?: "ADD" | "EDIT"
  data?: Location | null
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending && <Loader2Icon className="size-3" data-icon="inline-start" />}
      {pending ? "Saving..." : "Save Location"}
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

  return (
    <form action={formAction}>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/dashboard/locations">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Location Controller
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/locations">Discard</Link>
              </Button>
              <SubmitButton />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-location-form" className="w-[500px]">
                <CardHeader>
                  <CardTitle>Location Details</CardTitle>
                  <CardDescription>
                    Create and update product shipping or stock locations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {state.error !== "" && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        className="w-full"
                        defaultValue={data?.name}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/locations">Discard</Link>
            </Button>
            <SubmitButton />
          </div>
        </div>
      </div>
    </form>
  )
}

export default LocationForm
