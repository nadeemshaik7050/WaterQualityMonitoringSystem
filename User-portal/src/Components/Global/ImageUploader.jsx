import React from "react";
import ImageUploading from "react-images-uploading";

const ImageUploader = ({ images, setImages, maxNumber = 3 }) => {
  const onChange = (imageList) => {
    setImages(imageList);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          onImageUpdate,
          dragProps,
        }) => (
          <div className="flex flex-col items-start gap-3">
            <button
              type="button"
              className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
              onClick={onImageUpload}
              {...dragProps}
            >
              Upload Images
            </button>
            <p className="text-sm text-gray-500">Max {maxNumber} images</p>

            <div className="flex flex-wrap gap-3 mt-3">
              {imageList.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.data_url}
                    alt=""
                    className="w-20 h-20 object-cover rounded shadow-md"
                  />
                  <div className="absolute top-1 right-1 flex gap-1">
                    <button
                      type="button"
                      onClick={() => onImageUpdate(index)}
                      className="bg-yellow-400 text-white text-xs px-1.5 py-0.5 rounded"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onImageRemove(index)}
                      className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;
