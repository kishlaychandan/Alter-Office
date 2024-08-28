import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the path if needed
import "./Admin.css";
import { Link } from "react-router-dom";

const Admin = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [expandedFeedbackId, setExpandedFeedbackId] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackCollection = collection(db, "feedback");
        const feedbackSnapshot = await getDocs(feedbackCollection);
        const feedbackList = feedbackSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeedbacks(feedbackList);
      } catch (error) {
        console.error("Error fetching feedbacks: ", error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleToggleExpand = (id) => {
    setExpandedFeedbackId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <div className="nav">
        <Link to="/signin">HOME</Link>
      </div>
      <div className="admin-container">
        <h2>Admin Dashboard</h2>
        <p>Total Feedbacks: {feedbacks.length}</p>
        <div className="feedback-list">
          {feedbacks.map((feedback, index) => (
            <div 
              key={feedback.id} 
              className="feedback-card" 
              onClick={() => handleToggleExpand(feedback.id)}
            >
              <div className="feedback-header">
                <h4>Feedback {index + 1}</h4>
                <p>{new Date(feedback.timestamp.toDate()).toLocaleDateString()}</p>
                <button className="toggle-button">
                  {expandedFeedbackId === feedback.id ? "−" : "+"}
                </button>
              </div>
              {expandedFeedbackId === feedback.id && (
                <div className="feedback-details">
                  <p><strong>Name:</strong> {feedback.name}</p>
                  <p><strong>Comment:</strong> {feedback.comment}</p>
                  <p><strong>Recommendation:</strong> {feedback.recommendation}</p>
                  <p><strong>Rating:</strong> {feedback.rating}</p>
                  <p><strong>Opinion:</strong> {feedback.opinion}</p>
                  <p><strong>Suggestion:</strong> {feedback.suggestion}</p>
                  <p><strong>Multiple Choice:</strong> {feedback.multipleChoice}</p>
                  <p><strong>Subject:</strong> {feedback.subject}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Admin;
