import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUploader from "@/Components/Global/ImageUploader";
import { Droplets, ClipboardCheck, Upload } from "lucide-react";
import { useAuth } from "@/lib/keycloak/AuthProvider";
import { rankingsApi } from "@/api/rankings";
import toast from "react-hot-toast";

const reviewSchema = z.object({
  waterBody: z.string().nonempty("Enter the water body"),
  measurementType: z.string().nonempty("Select a measurement type"),
  measurement: z.string().nonempty("Enter measurement value"),
  observations: z.string().nonempty("Select an observation"),
  postalCode: z.string().min(3, "Enter valid postal code"),
});

const MakeReview = () => {
  const [images, setImages] = useState([]);
  const { user, token } = useAuth(); //   get user info + token

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(reviewSchema),
  });

  console.log(user.username+"user")

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      //   Append files (as 'binaries')
      images.forEach((img) => {
        formData.append("binaries", img.file);
      });

      //   Append required backend fields
      formData.append("postalCode", data.postalCode);
      formData.append("unit", data.measurementType);
      formData.append("value", data.measurement);
      formData.append("observations", data.observations.toUpperCase());
      formData.append("citizenId", user?.userId ?? "unknown");
      formData.append("userName", user?.username ?? "guest");

      toast.loading("Submitting water quality data...");

      const response = await rankingsApi.submitWaterQuality(formData, token);

      toast.dismiss();

      if (response?.result?.receiptNumber) {
        toast.success(`  Submitted! Receipt: ${response.result.receiptNumber}`);
      } else {
        toast.success("  Review submitted successfully!");
      }

      console.log("API Response 👉", response);

      reset();
      setImages([]);
    } catch (error) {
      toast.dismiss();
      toast.error("❌ Failed to submit review");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
        <Droplets className="text-blue-600 dark:text-blue-400 w-6 h-6" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Submit Water Quality Review
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Water Body */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Water Body
          </label>
          <input
            {...register("waterBody")}
            type="text"
            placeholder="e.g., Pond, River, Ocean"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 text-sm
              dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          {errors.waterBody && (
            <p className="text-red-500 text-sm mt-1">{errors.waterBody.message}</p>
          )}
        </div>

        {/* Measurement Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Measurement Type
          </label>
          <select
            {...register("measurementType")}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm
              dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Select Type</option>
            <option value="pH">pH</option>
            <option value="tmp">Temperature</option>
            <option value="ntu">Turbidity</option>
          </select>
          {errors.measurementType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.measurementType.message}
            </p>
          )}
        </div>

        {/* Measurement Value */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Measurement Value
          </label>
          <input
            {...register("measurement")}
            type="text"
            placeholder="Enter value (e.g., 40)"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm
              dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          {errors.measurement && (
            <p className="text-red-500 text-sm mt-1">{errors.measurement.message}</p>
          )}
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Postal Code
          </label>
          <input
            {...register("postalCode")}
            type="text"
            placeholder="e.g., ABC123"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm
              dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
          )}
        </div>

        {/* Observations */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Observations
          </label>
          <select
            {...register("observations")}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm
              dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Select Observation</option>
            <option value="CLEAR">Clear</option>
            <option value="CLOUDY">Cloudy</option>
            <option value="MURKY">Murky</option>
            <option value="FOAMY">Foamy</option>
            <option value="OILY">Oily</option>
            <option value="DISCOLOURED">Discoloured</option>
            <option value="PRESENCE OF ODOUR">Presence of Odour</option>
          </select>
          {errors.observations && (
            <p className="text-red-500 text-sm mt-1">{errors.observations.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
            <Upload className="w-4 h-4 text-blue-500" />
            Upload Images (Optional)
          </label>
          <ImageUploader images={images} setImages={setImages} maxNumber={3} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-xl 
          hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-md"
        >
          <ClipboardCheck className="w-5 h-5" />
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default MakeReview;
