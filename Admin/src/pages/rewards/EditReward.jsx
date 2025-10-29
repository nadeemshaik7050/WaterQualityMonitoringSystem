import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, ImageIcon } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { rewardApi } from '@/api/rewards';

export default function EditReward() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rewardName: '',
    rank: '',
    level: 'Bronze',
    pointsRequired: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { data: reward, isLoading } = useQuery({
    queryKey: ['reward', id],
    queryFn: () => rewardApi.getById(id),
  });

  useEffect(() => {
    if (reward) {
      setFormData({
        rewardName: reward.rewardName,
        rank: reward.rank,
        level: reward.level,
        pointsRequired: reward.pointsRequired,
        description: reward.description || '',
      });
      // Set existing image as preview
      if (reward.imageUrl) {
        setImagePreview(reward.imageUrl);
      }
    }
  }, [reward]);

  const updateMutation = useMutation({
    mutationFn: (data) => rewardApi.update(id, data),
    onSuccess: () => {
      alert('Reward updated successfully!');
      navigate(`/rewards/${id}`);
    },
    onError: (error) => {
      alert('Failed to update reward');
      console.error(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData to send data including image in binary format
    const formDataToSend = new FormData();
    formDataToSend.append('rewardName', formData.rewardName);
    formDataToSend.append('rank', formData.rank);
    formDataToSend.append('level', formData.level);
    formDataToSend.append('pointsRequired', formData.pointsRequired);
    formDataToSend.append('description', formData.description);
    
    // Append image file if selected
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }

    // Console log the payload
    console.log('Payload being sent to backend:');
    for (let [key, value] of formDataToSend.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
    
    updateMutation.mutate(formDataToSend);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(reward?.imageUrl || null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate(`/rewards/${id}`)}
          className="text-secondary-600 hover:text-secondary-900"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold">Edit Reward</h1>
      </div>

      <div className="bg-gradient-card rounded-lg shadow-soft p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Reward Image
            </label>
            <div className="space-y-3">
              {/* Image Preview */}
              <div className="w-[300px] h-[200px] items-center bg-secondary-100 rounded-lg flex justify-center overflow-hidden border-2 border-dashed border-secondary-300">
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={imagePreview} 
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-secondary-400">
                    <ImageIcon size={48} className="mb-2" />
                    <span className="text-sm">No image selected</span>
                  </div>
                )}
              </div>
              
              {/* File Input */}
              <div className="flex items-center gap-2">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center gap-2 px-4 py-2 border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors">
                    <Upload size={20} className="text-secondary-600" />
                    <span className="text-sm text-secondary-700">
                      {imageFile ? imageFile.name : 'Choose Image'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-secondary-500">
                Accepted formats: JPG, PNG, GIF. Max size: 5MB
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Reward Name *
            </label>
            <input
              type="text"
              name="rewardName"
              value={formData.rewardName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Rank *
            </label>
            <input
              type="number"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Level *
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Points Required *
            </label>
            <input
              type="number"
              name="pointsRequired"
              value={formData.pointsRequired}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-medium disabled:opacity-50 transition-all"
            >
              {updateMutation.isPending ? 'Updating...' : 'Update Reward'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/rewards/${id}`)}
              className="px-6 py-2 border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
