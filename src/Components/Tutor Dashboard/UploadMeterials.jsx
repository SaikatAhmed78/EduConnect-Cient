import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosUser from "../../Hooks/useAxiosUser";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Common/Spinner/LoadingSpinner";

const image_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UploadMaterials = ({ session }) => {
    const { user } = useAuth();
    const axiosUser = useAxiosUser();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const [isUploading, setUploading] = useState(false);
    const [sessionId, setSessionId] = useState('');




    const { data: allsessionIds = [], isPending, refetch } = useQuery({
        queryKey: ['allsessionIds', axiosUser],
        queryFn: async () => {
            const res = await axiosUser.get('/allsessionIds')
            const data = await res.data
            return data;
        }
    })

    const handleImageUpload = async (e) => {
        setUploading(true);
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
            } else {
                throw new Error("Image upload failed");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to upload image",
                text: error.message,
            });
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        if (!imageURL) {
            Swal.fire({
                icon: "error",
                title: "Image is required",
                timer: 1500,
                showConfirmButton: false,
            });
            return;
        }

        if (!sessionId) {
            Swal.fire({
                icon: "error",
                title: "Session ID is missing",
                timer: 1500,
                showConfirmButton: false,
            });
            return;
        }

        const materialsData = {
            title: data.title,
            sessionId: sessionId,
            tutorEmail: user.email,
            image: imageURL,
            link: data.link,
        };


        try {
            const res = await axiosUser.post("/upload-material", materialsData);
            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Materials Uploaded Successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                reset();
                setImageURL(null);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: error.message,
            });
        }
    };



    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Upload Study Materials</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div>
                    <label className="block text-gray-700 mb-2">Material Title</label>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && <p className="text-red-500 mt-2">{errors.title.message}</p>}
                </div>

                {/* Session ID Field */}
                <select className="select select-bordered w-full" onChange={(e) => setSessionId(e.target.value)}>
                    <option disabled selected>Select Id</option>



                    {
                        isPending ? <LoadingSpinner></LoadingSpinner> :
                            allsessionIds.map(session => <option key={session._id} value={session._id}>{session._id}</option>)
                    }
                </select>


                <div>
                    <label className="block text-gray-700 mb-2">Tutor Email</label>
                    <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full p-3 border bg-gray-100 rounded-lg"
                    />
                </div>


                <div>
                    <label className="block text-gray-700 mb-2">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full p-3 border rounded-lg"
                        disabled={isUploading}
                    />
                </div>


                <div>
                    <label className="block text-gray-700 mb-2">Resource Link (Google Drive)</label>
                    <input
                        type="url"
                        {...register("link", { required: "Resource link is required" })}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.link && <p className="text-red-500 mt-2">{errors.link.message}</p>}
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                    disabled={isUploading}
                >
                    {isUploading ? "Uploading..." : "Upload Materials"}
                </button>
            </form>
        </div>
    );
};

export default UploadMaterials;
