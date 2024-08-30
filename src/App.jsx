import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import { AuthContext, FirebaseContext } from "./store/firebaseContext";
import Post from "./store/PostContext";

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";

function App() {
  const { setUser } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext); 


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth, setUser]);

  return (
    <div>
      <Post>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
  