// components/ImagePreview.tsx
import React from "react";
import Image from "next/image";

type Props = {
  images: File[];
  isDone: boolean;
  onNameChange: (oldName: string, newName: string) => void;
};

const ImagePreview = ({ images, isDone, onNameChange}: Props) => {
  console.log("images", images);

  return (
    <div className="mt-4 space-y-4 ">
      {images.map((image) => {
        const src = URL.createObjectURL(image);
        return (
          <div key={image.name} className=" flex justify-between items-center ring-2 ring-green-700">
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
              value={image.name}
              // readOnly
              onChange={(e) => onNameChange(image.name, e.target.value)}
              className="text-sm text-black truncate bg-gray-100 border border-gray-300 rounded px-2 py-1 w-1/2"
            />
            {/* <p className="text-sm truncate ">{image.name}</p> */}
            
            <p className="text-sm">{isDone ? " -> uploaded": null}</p>

          </div>
        );
      })}
    </div>
  );
};

export default ImagePreview;
