// components/FileUploadForm.tsx
"use client"; // Make this component a client component
import React, { FormEvent, useState } from "react";
import CustomFileSelector from "./CustomFileSelector";
import ImagePreview from "./ImagePreview";
import axios from "axios";
import classNames from "classnames";

const FileUploadForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>("");

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      const _files = Array.from(e.target.files);
      setImages(_files);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((image, i) => {
      formData.append(image.name, image);
    });
    setUploading(true);
    setUploadStatus(null);

    try {
      // upload files as formData to destination like in ts file under `app/api/upload/route.ts`
      // Make the POST request using axios
      const response = await axios.post("/api/upload", formData);
      // Log the response to the console
      console.log("Upload response:", response.data);

      setUploadStatus("Files uploaded successfully!");

      // Set a timeout to clear the message after 3 seconds
      const timer = setTimeout(() => {
        setUploadStatus("");
      }, 3000);
      // Clean up the timer if the component unmounts
      return () => clearTimeout(timer);

    } catch (error) {
      setUploadStatus("Error uploading files. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex justify-between">
        <CustomFileSelector
        //   accept="image/png, image/jpeg, image/webp"
          accept="image/*"
          onChange={handleFileSelected}
        />
        <button
          type="submit"
          className={classNames({
            "bg-violet-50 text-violet-500 hover:bg-violet-100 px-4 py-2 rounded-md":
              true,
            "disabled pointer-events-none opacity-40": uploading,
          })}
          disabled={uploading}
        >
          Upload
        </button>
        {uploading && <p>Uploading...</p>}
        {uploadStatus && (
          <p
            className={
              uploadStatus.includes("Error") ? "text-red-500" : "text-green-500"
            }
          >
            {uploadStatus}
          </p>
        )}
      </div>
      <ImagePreview images={images} />
    </form>
  );
};

export default FileUploadForm;
