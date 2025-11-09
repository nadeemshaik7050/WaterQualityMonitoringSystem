import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Upload, X, ImageIcon } from "lucide-react";
import { rewardApi } from "@/api/rewards"
import { useState } from "react";
import toast from "react-hot-toast";


//  Zod Validation Schema

// export const rewardSchema = z.object({
//   name: z.string().min(2, "Name is required"),
//   points: z.string().min(1, "Points are required"),
//   image: z
//     .instanceof(File, { message: "Image is required" })
// });


export default function CreateReward() {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createMutation = useMutation({
    mutationFn: rewardApi.createReward,
    onSuccess: () => {
      toast.success("Reward created successfully!");
      navigate("/rewards");
    },
    onError: () => toast.error("Failed to create reward"),
  });

  // Handle image validation + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

const onSubmit = (data) => {
  if (!imageFile) {
    toast.error("Image is required");
    return;
  }

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("minPoints", data.minPoints);
    formData.append("maxPoints", data.maxPoints);
  // formData.append("points", data.points);
  formData.append("image", imageFile);

  createMutation.mutate(formData);
};
    

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate("/rewards")}
          className="text-secondary-600 hover:text-secondary-900"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold">Create Reward</h1>
      </div>

      <div className="bg-gradient-card rounded-lg shadow-soft p-6 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* 📸 Image Upload */}
          <label className="text-sm font-medium text-secondary-700">
            Reward Image
          </label>
          <div className="w-full h-48 bg-secondary-100 border border-dashed rounded-lg flex items-center justify-center overflow-hidden relative">
            {imagePreview ? (
              <div className="relative w-full h-full">
                <img
                  src={imagePreview}
                  className="w-full h-full object-cover"
                  alt="Preview"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-secondary-400">
                <ImageIcon size={40} />
                <span className="text-xs mt-2">No Image Selected</span>
              </div>
            )}
          </div>

          <label className="cursor-pointer">
            <div className="w-full px-4 py-2 border rounded-lg flex items-center gap-2 justify-center">
              <Upload size={18} />
              Upload Image
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>

          {/* 🏷 Name */}
          <div>
            <label className="block text-sm font-medium">Reward Name*</label>
            <input
              {...register("name")}
              className="input-text"
              placeholder="Ex. Gold Star"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>


            <div>
            <label className="block text-sm font-medium">Min Points*</label>
            <input
              type="number"
              placeholder="enter min points"
              {...register("minPoints")}
              className="input-text"
    
            />
            {errors.points && (
              <p className="text-red-500 text-xs">{errors.minPoints.message}</p>
            )}
          </div>

           <div>
            <label className="block text-sm font-medium">Min Points*</label>
            <input
              type="number"
              placeholder="enter max points"
              {...register("maxPoints")}
              className="input-text"
      
            />
            {errors.points && (
              <p className="text-red-500 text-xs">{errors.maxPoints.message}</p>
            )}
          </div>



          {/*  Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="px-6 py-2 bg-gradient-primary text-white rounded-lg"
            >
              {createMutation.isPending ? "Creating..." : "Create Reward"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/rewards")}
              className="px-6 py-2 border rounded-lg"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
