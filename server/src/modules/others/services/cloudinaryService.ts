import { Readable } from "stream";
import Cloudinary from "../../../config/cloudinaryConfig";
import { UploadOptions } from "../types/cloudinaryTypes";

export async function uploadSingleFileToCloudinary(
  file: Buffer,
  options: UploadOptions
): Promise<string> {
  if (!file) throw new Error("No file provided.");

  // Ensure file size does not exceed 25MB
  if (options.size && options.size > 25 * 1024 * 1024) {
    throw new Error("File size must not exceed 25MB");
  }

  return new Promise((resolve, reject) => {
    const stream = Cloudinary.uploader.upload_stream(
      {
        folder: options.folder || "default_folder",
        tags: options.tags || [],
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          reject(
            new Error(
              `Failed to upload to Cloudinary: ${error.message || error}`
            )
          );
        } else {
          resolve(result?.secure_url || "");
        }
      }
    );

    Readable.from(file).pipe(stream);
  });
}

export async function uploadMultipleFilesToCloudinary(
  files: Buffer[],
  folder = "default_folder",
  tags: string[][] = [] // Expecting an array of tag arrays for each file
): Promise<string[]> {
  if (files.length === 0) {
    throw new Error("No valid files to upload.");
  }

  // Ensure tags length matches files length
  if (tags.length !== files.length) {
    throw new Error("The number of tags must match the number of files.");
  }

  try {
    return await Promise.all(
      files.map((file, index) =>
        uploadSingleFileToCloudinary(file, {
          folder,
          tags: tags[index] || [], // Assign tags to each file individually
        })
      )
    );
  } catch (error) {
    // If any file upload fails, throw a more descriptive error
    const errorMessage =
      error instanceof Error ? error.message : "Unknown upload error";
    console.error("Failed to upload multiple files to Cloudinary:", error);
    throw new Error(`File upload failed: ${errorMessage}`);
  }
}
