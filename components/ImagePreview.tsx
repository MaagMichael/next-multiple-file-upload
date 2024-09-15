// components/ImagePreview.tsx
import React, { useState, useRef } from "react";
import Image from "next/image";

type Props = {
  images: File[];
  isDone: boolean;
  onNameChange: (oldName: string, newName: string) => void;
};

const ImagePreview = ({ images, isDone, onNameChange }: Props) => {
  console.log("images", images);

  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [modifiedNames, setModifiedNames] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <div className="mt-4 space-y-4 ">
      {images.map((image, index) => {
        const src = URL.createObjectURL(image);
        return (
          <div
            key={image.name}
            className=" flex justify-between items-center ring-2 ring-green-700"
          >
            <div className="w-48 relative aspect-video mb-2">
              <Image
                src={src}
                alt={image.name}
                className="object-cover rounded"
                fill
              />
            </div>
            <input
              type="text"
              defaultValue={image.name}
              ref={(el) => {
                inputRefs.current[image.name] = el;
              }}
              onChange={(e) => {
                const newName = e.target.value;
                setModifiedNames((prev) => ({
                  ...prev,
                  [image.name]: newName !== image.name,
                }));
              }}
              
              className="text-sm text-black truncate bg-gray-100 border border-gray-300 rounded px-2 py-1 w-1/2"
            />
            
            {modifiedNames[image.name] && (
              <button
                onClick={() => {
                  const newName = inputRefs.current[image.name]?.value;
                  if (newName) {
                    onNameChange(image.name, newName);
                    setModifiedNames((prev) => ({
                      ...prev,
                      [image.name]: false,
                    }));
                  }
                }}
                className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
              >
                Update Name
              </button>
            )}

            {/* <p className="text-sm truncate ">{image.name}</p> */}

            <p className="text-sm">{isDone ? " -> uploaded" : null}</p>
          </div>
        );
      })}{" "}
    </div>
  );
};

export default ImagePreview;
