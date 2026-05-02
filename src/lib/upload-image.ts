import { supabase, type UploadPath } from "@/lib/supabase";

const imageResizeConfig = {
  brands: {
    width: 512,
    height: 512,
    quality: 86,
  },
  products: {
    width: 1200,
    height: 1200,
    quality: 84,
  },
  users: {
    width: 512,
    height: 512,
    quality: 86,
  },
} satisfies Record<UploadPath, { width: number; height: number; quality: number }>;

export const uploadFile = async (
  file: File,
  path: UploadPath = "users",
): Promise<string> => {
  const optimizedImage = await optimizeImageForUpload(file, path);
  const filename = `${path}-${Date.now()}.${optimizedImage.extension}`;

  const { error } = await supabase.storage
    .from("e-commerce")
    .upload(`public/${path}/${filename}`, optimizedImage.body, {
      cacheControl: "3600",
      contentType: optimizedImage.contentType,
      upsert: false,
    });

  if (error) throw new Error(error.message);

  return filename;
};

async function optimizeImageForUpload(file: File, path: UploadPath) {
  const fallbackResult = {
    body: file,
    extension: getFileExtension(file),
    contentType: file.type || "application/octet-stream",
  };

  if (!file.type.startsWith("image/")) {
    return fallbackResult;
  }

  try {
    const sharp = (await import("sharp")).default;
    const config = imageResizeConfig[path];
    const inputBuffer = Buffer.from(await file.arrayBuffer());
    const outputBuffer = await sharp(inputBuffer)
      .rotate()
      .resize({
        width: config.width,
        height: config.height,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: config.quality,
      })
      .toBuffer();

    return {
      body: outputBuffer,
      extension: "webp",
      contentType: "image/webp",
    };
  } catch (error) {
    console.warn("Image optimization failed, uploading original file.", error);
    return fallbackResult;
  }
}

function getFileExtension(file: File) {
  const typeExtension = file.type.split("/")[1];
  const nameExtension = file.name.split(".").pop();

  return (typeExtension || nameExtension || "bin").replace("jpeg", "jpg");
}
