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
    <main className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#110843]">
        My Profile
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* LEFT SIDE — Info */}
        <section className="flex flex-col items-center text-center bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-200">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#FFC736] mb-4">
            {profile.image ? (
              <Image
                src={profile.image}
                alt="User Avatar"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                No Image
              </div>
            )}
          </div>

          <h2 className="text-lg md:text-xl font-semibold text-[#110843]">
            {profile.name || "Unnamed User"}
          </h2>
          <p className="text-gray-500 text-sm mb-4 break-all">
            {profile.email || "No email available"}
          </p>

          <div className="text-xs md:text-sm text-gray-600">
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
          className="flex flex-col gap-6 bg-white rounded-xl border border-gray-200 p-6 md:p-8"
        >
          {/* Upload */}
          <div className="flex flex-col items-center gap-3">
            <label className="text-sm text-gray-600 cursor-pointer hover:text-[#110843]">
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
            <label htmlFor="name" className="font-medium text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-[#FFC736] transition-all"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              readOnly
              className="border border-gray-200 bg-gray-50 rounded-md p-3 text-gray-500"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="bg-[#110843] hover:bg-[#24105e] text-white rounded-full py-3 font-semibold mt-4"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </main>
  );
}
