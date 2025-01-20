import React from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosUser from "../../Hooks/useAxiosUser";
import SessionCard from "../Card/SessionCard";

const ViewAllStudySession = () => {
    const axiosUser = useAxiosUser();
    const queryClient = useQueryClient();

    const { data: sessions = [], isLoading, isError, error } = useQuery({
        queryKey: ["studySessions"],
        queryFn: async () => {
            const res = await axiosUser.get("/sessions");
            return res.data;
        },
    });

    const resendApprovalMutation = useMutation({
        mutationFn: async (sessionId) => {
            return await axiosUser.patch(`/resend-approval/${sessionId}`, { status: "pending" });
        },
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Approval Request Sent!",
                showConfirmButton: false,
                timer: 1500,
            });
            queryClient.invalidateQueries(["studySessions"]);
        },
        onError: (error) => {
            console.error("Error sending approval request:", error);
            Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: error.message,
            });
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    const handleResendApproval = (sessionId) => {
        resendApprovalMutation.mutate(sessionId);
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">All Study Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map((session) => (
                    <SessionCard
                        key={session._id}
                        session={session}
                        onResendApproval={handleResendApproval}
                    />
                ))}
            </div>
        </div>
    );
};

export default ViewAllStudySession;
