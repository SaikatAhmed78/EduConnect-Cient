import React from "react";

const SessionCard = ({ session, onResendApproval }) => {
    const statusStyles = {
        approved: "bg-green-100",
        rejected: "bg-red-100",
        pending: "bg-yellow-100",
    };

    return (
        <div
            className={`p-4 border rounded-lg shadow-md ${statusStyles[session.status]}`}
        >
            <h4 className="font-bold text-lg">{session.title}</h4>
            <p className="text-sm text-gray-600">{session.description}</p>
            <p className="mt-2 text-xs text-gray-500">
                Class Duration: {session.duration} hours
            </p>
            {session.status === "rejected" && (
                <button
                    onClick={() => onResendApproval(session._id)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                >
                    Re-send Approval Request
                </button>
            )}
        </div>
    );
};

export default SessionCard;
