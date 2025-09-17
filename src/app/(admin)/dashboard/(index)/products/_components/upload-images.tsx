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

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultImages.length >= 3) {
      setPreviewImages([
        defaultImages[0] || "/assets/products/placeholder.svg",
        defaultImages[1] || "/assets/products/placeholder.svg",
        defaultImages[2] || "/assets/products/placeholder.svg",
      ]);
    }
  }, [defaultImages]);

  const openFolder = () => {
    ref.current?.click();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length < 3) return;

    const newPreviews = Array.from(files)
      .slice(0, 3)
      .map((file) => URL.createObjectURL(file));

    setPreviewImages(newPreviews);
  };

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>
          Upload or preview up to 3 (jpg, jpeg, png)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <img
            alt="Thumbnail"
            className="aspect-square w-full rounded-md object-cover"
            height={300}
            width={300}
            src={previewImages[0]}
          />
          <div className="grid grid-cols-3 gap-2">
            {previewImages.slice(1).map((src, i) => (
              <button key={i} type="button">
                <img
                  alt={`Image ${i + 1}`}
                  className="aspect-square w-full rounded-md object-cover"
                  height={84}
                  width={84}
                  src={src}
                />
              </button>
            ))}
            <button
              type="button"
              onClick={openFolder}
              className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>
            </button>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              className="hidden"
              ref={ref}
              onChange={onChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
