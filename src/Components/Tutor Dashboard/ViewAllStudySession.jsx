import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosUser from "../../Hooks/useAxiosUser";
import LoadingSpinner from "../../Common/Spinner/LoadingSpinner";
import { useState } from "react";
import Swal from "sweetalert2";

const ViewAllStudySession = () => {
    const axiosUser = useAxiosUser();
    const queryClient = useQueryClient();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: sessions = [], isLoading, isError, error } = useQuery({
        queryKey: ["studySessions"],
        queryFn: async () => {
            const res = await axiosUser.get("/sessions");
            return res.data;
        },
    });

    const handleReapprovalRequest = async (sessionId) => {
        setIsSubmitting(true);
        try {
            await axiosUser.patch(`/sessions/${sessionId}`, { status: "pending" });
            Swal.fire("Request Sent!", "Your re-approval request has been sent to the admin.", "success");
            queryClient.invalidateQueries(["studySessions"]);
        } catch (error) {
            Swal.fire("Error!", "Something went wrong while sending the request.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <LoadingSpinner />;


    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold text-center mb-5 text-gray-800">My Study Sessions</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map((session) => (
                    <div
                        key={session._id}
                        className={`shadow-lg rounded-lg p-5 border ${session.status === "approved"
                            ? "border-green-500"
                            : session.status === "rejected"
                                ? "border-red-500"
                                : "border-gray-400"
                            }`}
                    >
                        <h2 className="text-xl font-semibold text-gray-700">{session.title}</h2>
                        <p className="text-sm text-gray-500 mt-2">{session.description}</p>
                        <p className="text-sm mt-3">
                            <span className="font-semibold">Status: </span>
                            <span
                                className={`${session.status === "approved"
                                    ? "text-green-500"
                                    : session.status === "rejected"
                                        ? "text-red-500"
                                        : "text-gray-500"
                                    }`}
                            >
                                {session.status}
                            </span>
                        </p>
                        {session.status === "rejected" && (
                            <button
                                onClick={() => handleReapprovalRequest(session._id)}
                                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Sending..." : "Request Reapproval"}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewAllStudySession;
