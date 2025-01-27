import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosUser from "../../Hooks/useAxiosUser";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";  // Import SweetAlert2

const ViewAllStudySessionA = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [fee, setFee] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('');
  const navigate = useNavigate();

  const axiosUser = useAxiosUser();

  const { data: fetchedSessions = [], isLoading, refetch } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      try {
        const res = await axiosUser.get("/sessions");
        return res.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });

  const handleReject = async (sessionId) => {
    try {

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to reject this session?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, reject it!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
       
        await axiosUser.patch(`/sessions/${sessionId}/reject`);

     
        refetch();

        setShowModal(false);
        Swal.fire("Rejected!", "The session has been rejected.", "success");
      }
    } catch (error) {
      console.error("Error rejecting session", error);
    }
  };

  const handleApprove = async (sessionId) => {
    try {
      if (paymentStatus === 'paid') {
        navigate('/dashboard/payment', { replace: true });
      } else {
        alert("Please mark the session as paid to proceed.");
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error approving session", error);
    }
  };

  const handlePaymentRoute = (e) => {
    setPaymentStatus(e);
    if (e === 'paid') {
      setIsPaid(true);
    } else {
      setIsPaid(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">All Study Sessions</h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading sessions...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fetchedSessions.map((session) => (
            <div key={session._id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {session.title}
              </h3>
              <p className="text-gray-600 mb-4">{session.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                Status: <span className="font-medium">{session.status}</span>
              </p>

              {session.status === "pending" ? (
                <div className="flex gap-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => {
                      setShowModal(true);
                      setSelectedSession(session);
                    }}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleReject(session._id)}
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-500">This session is {session.status}.</p>
              )}
            </div>
          ))}
        </div>
      )}


      {showModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h4 className="text-lg font-semibold mb-4">
              Approve Session: {selectedSession.title}
            </h4>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Is the session free or paid?</label>
              <select
                className="w-full border-gray-300 rounded px-3 py-2"
                onChange={(e) => handlePaymentRoute(e.target.value)}
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {isPaid && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Fee</label>
                <input
                  type="number"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="w-full border-gray-300 rounded px-3 py-2"
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleApprove(selectedSession._id)}
              >
                Approve
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllStudySessionA;
