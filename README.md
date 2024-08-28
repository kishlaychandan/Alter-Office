# Feedback Component

## Overview

The Feedback Component is a React-based UI for managing user feedback. It allows users to submit, view, edit, and delete feedback forms. Admins can view all feedback submissions. This component is integrated with Firebase for authentication and data storage.

## Features

- **User Signup & Email Verification**: Users can sign up, and an email verification process is required to access feedback features.
- **User Login**: Users can log in to view and manage their feedback submissions.
- **Submit Feedback**: Users can submit feedback with various fields, including name, comment, recommendation, rating, opinion, suggestion, multiple choice, and subject.
- **Edit Feedback**: Users can edit previously submitted feedback.
- **View Feedback**: Users can view a list of their feedback submissions.
- **Delete Feedback**: Users can delete feedback submissions.
- **Admin Dashboard**: Admins can view all feedback submissions from all users.
- **Responsive Design**: The component is designed to be responsive and user-friendly across devices.

## Technologies Used

- **React**: For building the user interface.
- **Firebase**: For authentication and data storage.
- **React Icons**: For including icons in the UI.
- **React Toastify**: For displaying notifications.

## Installation

To get started with the Feedback Component, follow these steps:

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/your-username/feedback-component.git
    cd feedback-component
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Set Up Firebase**:

    - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Configure Firebase by creating a `firebaseConfig.js` file in the `src` directory and add your Firebase credentials.

    ```js
    // src/firebaseConfig.js
    import { initializeApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";
    import { getAuth } from "firebase/auth";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    export { db, auth };
    ```

4. **Start the Development Server**:

    ```bash
    npm start
    ```

## User Authentication

1. **Signup & Email Verification**:

    - Users need to sign up using their email and password.
    - After signup, users will receive an email verification link.
    - Email verification is required before users can access feedback features.

2. **Login**:

    - Users can log in using their email and password.
    - Only verified users can access their feedback forms.

## Features for Users

1. **Submit Feedback**:
    - Click on the "New Form" button to open the feedback form.
    - Fill out the form and submit it.

2. **View Feedback**:
    - The list of feedback submissions created by the logged-in user will be displayed on the main page.

3. **Edit Feedback**:
    - Click the "Edit" button next to a feedback item to modify it.

4. **Delete Feedback**:
    - Click the "Delete" button next to a feedback item to remove it.

## Features for Admins

1. **View All Feedback**:
    - Admins can access a dashboard to view all feedback submissions from all users.

## Components

### `Feedback`

- **Purpose**: Main component for handling user feedback.
- **Features**: Displays a list of feedback, allows adding, editing, and deleting feedback.

### `Admin`

- **Purpose**: Dashboard for admins to view all feedback submissions.
- **Features**: Displays all feedbacks from all users, provides options for managing feedback.

### `firebaseConfig.js`

- **Purpose**: Configures Firebase for the project.

### `AuthContext.js`

- **Purpose**: Provides authentication context for managing user login, logout, and email verification.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Make sure to follow the coding guidelines and review the project's contribution guidelines.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

---
