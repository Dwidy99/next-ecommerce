"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

type UploadImagesProps = {
  defaultImages?: string[];
};

export default function UploadImages({
  defaultImages = [],
}: UploadImagesProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([
    "/assets/products/placeholder.svg",
    "/assets/products/placeholder.svg",
    "/assets/products/placeholder.svg",
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultImages.length) {
      setPreviewImages([
        defaultImages[0] || "/assets/products/placeholder.svg",
        defaultImages[1] || "/assets/products/placeholder.svg",
        defaultImages[2] || "/assets/products/placeholder.svg",
      ]);
    }
  }, [defaultImages]);

  const openFolder = () => {
    inputRef.current?.click();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const urls = Array.from(files)
      .slice(0, 3)
      .map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => {
      prev.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });

      return [urls[0] || prev[0], urls[1] || prev[1], urls[2] || prev[2]];
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>
          Upload or preview up to 3 images (jpg, jpeg, png)
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-2">
          <img
            alt="Thumbnail"
            className="aspect-square w-full rounded-md object-cover"
            src={previewImages[0]}
          />

          <div className="grid grid-cols-3 gap-2">
            {previewImages.slice(1).map((src, i) => (
              <img
                key={i}
                alt={`Preview ${i}`}
                className="aspect-square w-full rounded-md object-cover"
                src={src}
              />
            ))}

            <button
              type="button"
              onClick={openFolder}
              className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
            </button>

            <input
              ref={inputRef}
              type="file"
              name="images"
              multiple
              accept="image/*"
              className="hidden"
              onChange={onChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
