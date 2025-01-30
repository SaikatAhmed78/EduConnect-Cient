import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosUser from "../../Hooks/useAxiosUser";
import animationData from "../../assets/lottie/session- 1737108219670.json";
import Lottie from "lottie-react";


const image_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateStudySession = () => {
  const { user } = useAuth();
  const axiosUser = useAxiosUser();
  const [imageURL, setImageURL] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setImageURL(result.data.url);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "Something went wrong while uploading the image.",
      });
    }
  };

  const onSubmit = async (data) => {
    const completeData = { 
      ...data, 
      status: "pending", 
      registrationFee: 0, 
      image: imageURL 
    };

    try {
      const res = await axiosUser.post("/create-session", completeData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Session Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
      });
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto p-8 rounded-lg shadow-xl">
      <div className="absolute inset-0 z-0">
        <Lottie animationData={animationData} loop className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold text-center text-black mb-8">Create Study Session</h2>
        <p className="w-3/4 mx-auto mb-6">A beautiful mindset is essential for learning. There's still so much for us to learn through studying.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md opacity-80">
          {/* Session Title */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">Session Title</label>
            <input
              type="text"
              {...register("title", { required: "Session title is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Tutor Info */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">Tutor Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                {...register("tutorName")}
                className="w-full px-4 py-2 border bg-gray-100 rounded-md focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">Tutor Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                {...register("tutorEmail")}
                className="w-full px-4 py-2 border bg-gray-100 rounded-md focus:outline-none"
              />
            </div>
          </div>

          {/* Session Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Session Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Dates */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">Registration Start Date</label>
              <input
                type="date"
                {...register("registrationStartDate", { required: "Start date is required" })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.registrationStartDate && <p className="text-red-500 text-sm">{errors.registrationStartDate.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">Registration End Date</label>
              <input
                type="date"
                {...register("registrationEndDate", { required: "End date is required" })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.registrationEndDate && <p className="text-red-500 text-sm">{errors.registrationEndDate.message}</p>}
            </div>
          </div>

          {/* Class Dates */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">Class Start Date</label>
              <input
                type="date"
                {...register("classStartDate", { required: "Start date is required" })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.classStartDate && <p className="text-red-500 text-sm">{errors.classStartDate.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">Class End Date</label>
              <input
                type="date"
                {...register("classEndDate", { required: "End date is required" })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.classEndDate && <p className="text-red-500 text-sm">{errors.classEndDate.message}</p>}
            </div>
          </div>

          {/* Session Duration */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Session Duration (hours)</label>
            <input
              type="number"
              {...register("duration", { required: "Duration is required" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imageURL && (
              <div className="mt-4">
                <p className="text-gray-600">Image Preview:</p>
                <img src={imageURL} alt="Preview" className="w-32 h-32 object-cover mt-2" />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
          >
            Create Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStudySession;
