import React, { useState, useEffect, useContext } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore";
import AuthContext from './AuthContext';
import "./Feedback.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CgNotes } from "react-icons/cg";

const Feedback = () => {
  const { logout, user } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFormId, setCurrentFormId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    recommendation: "",
    rating: 0,
    opinion: "",
    suggestion: "",
    multipleChoice: "",
    subject: ""
  });

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (user) {
        try {
          const feedbackCollection = collection(db, "feedback");
          const q = query(feedbackCollection, where("userId", "==", user.uid));
          const feedbackSnapshot = await getDocs(q);
          const feedbackList = feedbackSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFeedbacks(feedbackList);
        } catch (error) {
          console.error("Error fetching feedbacks: ", error);
        }
      }
    };

    fetchFeedbacks();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        if (isEditing && currentFormId) {
          const formDoc = doc(db, "feedback", currentFormId);
          await updateDoc(formDoc, { ...formData, userId: user.uid });
          toast.success("Feedback form updated successfully! Please refresh");
        } else {
          await addDoc(collection(db, "feedback"), {
            ...formData,
            timestamp: new Date(),
            userId: user.uid,
          });
          toast.success("Feedback form submitted successfully! Please referesh");
        }

        setFormData({
          name: "",
          comment: "",
          recommendation: "",
          rating: 0,
          opinion: "",
          suggestion: "",
          multipleChoice: "",
          subject: ""
        });
        setIsEditing(false);
        setCurrentFormId(null);
        setShowForm(false);
      } else {
        toast.error("User not authenticated.");
      }
    } catch (error) {
      console.error("Error saving feedback form: ", error);
      toast.error("Failed to save feedback form. Please try again.");
    }
  };

  const handleEdit = (feedback) => {
    setFormData(feedback);
    setIsEditing(true);
    setCurrentFormId(feedback.id);
    setShowForm(true);
  };

  const handleAddForm = () => {
    setIsEditing(false);
    setCurrentFormId(null);
    setFormData({
      name: "",
      comment: "",
      recommendation: "",
      rating: 0,
      opinion: "",
      suggestion: "",
      multipleChoice: "",
      subject: ""
    });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="feedback-container">
      <div className="heading">
        <h2>User Feedback</h2>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>

      <div className="feedback-list">
        <div className="feedback-card add-new" onClick={handleAddForm}>
          <div className="plus-icon">+</div>
          <p>New Form</p>
        </div>
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="feedback-card">
            <p className="notes"><CgNotes /></p>
            <div className="content">
            <h4>{feedback.name}</h4>
            <p>Submitted: {feedback.comment}</p>
            <p>Viewed: {feedback.rating}</p>
            <small>Date Published: {new Date(feedback.timestamp.toDate()).toLocaleDateString()}</small>
            <div className="button-group">
              <button onClick={() => handleEdit(feedback)} className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
            </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="form-overlay">
          <form onSubmit={handleSubmit} className="feedback-form">
            <button type="button" onClick={handleCloseForm} className="close-button">X</button>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Comment</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Recommendation</label>
              <input
                type="text"
                value={formData.recommendation}
                onChange={(e) => setFormData({ ...formData, recommendation: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <input
                type="number"
                max="5"
                min="1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Opinion</label>
              <textarea
                value={formData.opinion}
                onChange={(e) => setFormData({ ...formData, opinion: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Suggestion</label>
              <textarea
                value={formData.suggestion}
                onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Multiple Choice</label>
              <input
                type="text"
                value={formData.multipleChoice}
                onChange={(e) => setFormData({ ...formData, multipleChoice: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <button type="submit" className="submit-button">{isEditing ? "Save Changes" : "Submit Feedback"}</button>
          </form>
        </div>
      )}

      {/* ToastContainer for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Feedback;
