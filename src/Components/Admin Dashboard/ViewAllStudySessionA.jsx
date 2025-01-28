import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosUser from "../../Hooks/useAxiosUser";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";  // Import SweetAlert2
import useAuth from "../../Hooks/useAuth";

const ViewAllStudySessionA = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [fee, setFee] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [updateStatus, setUpdateStatus] = useState('pending');
  const navigate = useNavigate();

  const axiosUser = useAxiosUser();

  const { setSessionId } = useAuth();

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
      setShowModal(false);
  
      if (paymentStatus === "paid") {

        navigate("/dashboard/payment", { replace: true });
      } else {
  
        const res = await axiosUser.patch(`/sessions/${sessionId}/free-approved`);
        const data = res?.data;
  
        if (data?.modifiedCount > 0) {
         
          refetch();
  
      
          Swal.fire("Approved!", "The session has been approved successfully.", "success");
        } else {
          
          Swal.fire("Error", "Failed to approve the session. Please try again.", "error");
        }
      }
    } catch (error) {
      console.error("Error approving session", error);
  
      
      Swal.fire("Error", "Something went wrong. Please try again later.", "error");
    }
  };

  const handleUpdate = (session) => {
    setSelectedSession(session);
    setUpdateStatus(session.status); 
    setShowUpdateModal(true);
  };

  const handleStatusUpdate = async () => {
    try {
        const res = await axiosUser.patch(`/sessionsU/${selectedSession._id}/update-drop`);
        const data = res?.data;

        if (data?.message === 'Session status updated successfully') {
            refetch();
            Swal.fire("Updated!", "Session status updated successfully.", "success");
        } else {
            Swal.fire("Error", data?.message || "Failed to update the session status.", "error");
        }
    } catch (error) {
        console.error("Error updating session status", error);
        Swal.fire("Error", "Something went wrong. Please try again later.", "error");
    } finally {
        setShowUpdateModal(false);
    }
};


const handleDelete = async (sessionId) => {
  try {
      const result = await Swal.fire({
          title: "Are you sure?",
          text: "Do you want to delete this session?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
          const res = await axiosUser.delete(`/sessionsD/${sessionId}`);
          const data = res?.data;

          if (res.status === 200) {
              refetch();
              Swal.fire("Deleted!", "Session deleted successfully.", "success");
          } else {
              Swal.fire("Error", data?.message || "Failed to delete the session.", "error");
          }
      }
  } catch (error) {
      console.error("Error deleting session", error);
      Swal.fire("Error", "Something went wrong. Please try again later.", "error");
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
                <div className="flex gap-1 justify-between">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => {
                      setShowModal(true);
                      setSelectedSession(session);
                      setSessionId(session._id)
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
              ) : session.status === 'rejected' || session.status === 'approved' ? (
                <div className="flex gap-1 justify-between">
                  
                  <button 
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => handleUpdate(session)}
                  >
                    Update
                  </button>

                  <button 
                  onClick={() => handleDelete(session._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
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

{showUpdateModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h4 className="text-lg font-semibold mb-4">Update Session Status: {selectedSession.title}</h4>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Session Status</label>
              <select
                className="w-full border-gray-300 rounded px-3 py-2"
                value={updateStatus}
                onChange={(e) => setUpdateStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
        
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleStatusUpdate}
              >
                Update
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowUpdateModal(false)}
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

