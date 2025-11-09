"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createConfiguration, updateConfiguration } from "../lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

export function FormConfiguration({ config }: { config?: any }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleAction(formData: FormData) {
    startTransition(async () => {
      if (config) {
        await updateConfiguration(config.id, formData);
      } else {
        await createConfiguration(formData);
      }
      router.push("/dashboard/configurations");
    });
  }

  return (
    <form action={handleAction} className="space-y-6 p-4">
      {/* 🔙 Back Button */}
      <div className="mb-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2 border border-border text-foreground hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Webname */}
      <div className="space-y-2">
        <Label htmlFor="webname">Website Name</Label>
        <Input
          id="webname"
          name="webname"
          className="border border-border bg-background focus-visible:ring-2 focus-visible:ring-primary/40"
          defaultValue={config?.webname ?? ""}
          required
        />
      </div>

      {/* Language */}
      <div className="space-y-2">
        <Label htmlFor="language">Language</Label>
        <Select name="language" defaultValue={config?.language ?? "ID"}>
          <SelectTrigger className="w-full border border-border bg-background text-foreground hover:bg-muted focus:ring-2 focus:ring-primary/30">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="bg-background border border-border shadow-md">
            <SelectItem value="ID">Indonesian</SelectItem>
            <SelectItem value="EN">English</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          className="border border-border bg-background focus-visible:ring-2 focus-visible:ring-primary/40"
          defaultValue={config?.email ?? ""}
        />
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label htmlFor="website">Website URL</Label>
        <Input
          id="website"
          name="website"
          className="border border-border bg-background focus-visible:ring-2 focus-visible:ring-primary/40"
          defaultValue={config?.website ?? ""}
        />
      </div>

      {/* Tagline */}
      <div className="space-y-2">
        <Label htmlFor="tagline">Tagline</Label>
        <Input
          id="tagline"
          name="tagline"
          className="border border-border bg-background focus-visible:ring-2 focus-visible:ring-primary/40"
          defaultValue={config?.tagline ?? ""}
        />
      </div>

      {/* Submit & Cancel */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/dashboard/configurations")}
          className="hover:bg-muted text-foreground"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          variant="outline"
          className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
