"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateProfile } from "../lib/actions";
import { redirect } from "next/navigation";

type FormProfileProps = {
  initialProfile: {
    name: string;
    email: string;
    image: string | null;
    created_at: Date;
  };
};

export default function FormProfile({ initialProfile }: FormProfileProps) {
  const [isPending, startTransition] = useTransition();
  const [profile, setProfile] = useState(initialProfile);

  if (!profile) redirect("/catalogs");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const res = await updateProfile(formData);

      if (res.error) {
        toast.error("Failed to update profile", { description: res.error });
      } else {
        toast.success("Profile updated successfully!");
      }

      redirect("/user");
    });
  };

  return (
    <div className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-10">
      <h1 className="mb-8 text-center text-2xl font-bold text-[#110843] md:text-3xl">
        My Profile
      </h1>

      <div className="grid grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-2">
        {/* LEFT SIDE — Info */}
        <section className="flex flex-col items-center rounded-xl border border-gray-200 bg-gray-50 p-6 text-center md:p-8">
          <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-[#FFC736] md:h-32 md:w-32">
            {profile.image ? (
              <Image
                src={profile.image}
                alt="User Avatar"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                No Image
              </div>
            )}
          </div>

          <h2 className="text-lg font-semibold text-[#110843] md:text-xl">
            {profile.name || "Unnamed User"}
          </h2>
          <p className="mb-4 break-all text-sm text-gray-500">
            {profile.email || "No email available"}
          </p>

          <div className="text-xs text-gray-600 md:text-sm">
            <span className="font-medium text-[#110843]">Member Since:</span>{" "}
            {profile.created_at
              ? new Date(profile.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "—"}
          </div>
        </section>

        {/* RIGHT SIDE — Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 md:p-8"
        >
          {/* Upload */}
          <div className="flex flex-col items-center gap-3">
            <label className="cursor-pointer text-sm text-gray-600 hover:text-[#110843]">
              <input
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
              />
              <span className="underline underline-offset-4">
                Change Photo Here
              </span>
            </label>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="rounded-md border border-gray-300 p-3 outline-none transition-all focus:ring-2 focus:ring-[#FFC736]"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              readOnly
              className="rounded-md border border-gray-200 bg-gray-50 p-3 text-gray-500"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="mt-4 rounded-full bg-[#110843] py-3 font-semibold text-white hover:bg-[#24105e]"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
