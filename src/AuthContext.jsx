import { createContext, useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user.emailVerified == false) {
          alert("Hello Dear, Please verify your email");
          navigate("/home");
        } else {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      alert("Verification link sent to your email.");
    } catch (error) {
      alert(error.message);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      navigate("/signin")
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
