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
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ]);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultImages.length >= 3) {
      setPreviewImages([defaultImages[0], defaultImages[1], defaultImages[2]]);
    }
  }, [defaultImages]);

  const openFolder = () => {
    ref.current?.click();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length < 3) return;

    const newPreviews = [
      URL.createObjectURL(files[0]),
      URL.createObjectURL(files[1]),
      URL.createObjectURL(files[2]),
    ];
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
            <button type="button">
              <img
                alt="Image 1"
                className="aspect-square w-full rounded-md object-cover"
                height={84}
                width={84}
                src={previewImages[1]}
              />
            </button>
            <button type="button">
              <img
                alt="Image 2"
                className="aspect-square w-full rounded-md object-cover"
                height={84}
                width={84}
                src={previewImages[2]}
              />
            </button>
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
