import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAllStudySessionA = () => {
    
    const [showModal, setShowModal] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const [isPaid, setIsPaid] = useState(false);
    const [fee, setFee] = useState(0);

    const { data: sessions = [], isLoading, refetch } = useQuery({
        queryKey: ['sessions'],
        queryFn: async () => {
            try {
                const res = await axios.get('/sessions');  // Update with your actual backend URL
                return res.data;
            } catch (error) {
                console.error(error);
                return [];
            }
        },
    });

    const handleApprove = async (sessionId) => {
        try {
            const updatedSession = { isPaid, fee };
            await axios.patch(`/sessions/${sessionId}/approve`, updatedSession);
            setSessions(sessions.map(session => session._id === sessionId ? { ...session, status: 'approved', isPaid, fee } : session));
            setShowModal(false);
        } catch (error) {
            console.error("Error approving session", error);
        }
    };

    const handleReject = async (sessionId) => {
        try {
            await axios.patch(`/sessions/${sessionId}/reject`);
            setSessions(sessions.filter(session => session._id !== sessionId));
        } catch (error) {
            console.error("Error rejecting session", error);
        }
    };

    const handleUpdate = async (sessionId) => {
        // Show modal or redirect to update page
        console.log('Update session', sessionId);
    };

    const handleDelete = async (sessionId) => {
        try {
            await axios.delete(`/sessions/${sessionId}`);
            setSessions(sessions.filter(session => session._id !== sessionId));
        } catch (error) {
            console.error("Error deleting session", error);
        }
    };

    return (
        <div className="session-list">
            {sessions.map(session => (
                <div key={session._id} className="session-card">
                    <h3>{session.title}</h3>
                    <p>{session.description}</p>
                    <p>Status: {session.status}</p>
                    {session.status === 'pending' ? (
                        <div>
                            <button onClick={() => { setShowModal(true); setSelectedSession(session); }}>Approve</button>
                            <button onClick={() => handleReject(session._id)}>Reject</button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={() => handleUpdate(session._id)}>Update</button>
                            <button onClick={() => handleDelete(session._id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}

            {showModal && selectedSession && (
                <div className="modal">
                    <h4>Approve Session: {selectedSession.title}</h4>
                    <div>
                        <label>Is the session free or paid?</label>
                        <select onChange={(e) => setIsPaid(e.target.value === 'paid')}>
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>
                    {isPaid && (
                        <div>
                            <label>Fee</label>
                            <input type="number" value={fee} onChange={(e) => setFee(e.target.value)} />
                        </div>
                    )}
                    <button onClick={() => handleApprove(selectedSession._id)}>Approve</button>
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default ViewAllStudySessionA;
