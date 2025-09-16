import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import MyNotes from "./pages/MyNotes";
import InvitesPage from "./pages/Invites";
import LoginPage from "./pages/LoginPage";
import authService from "./services/authService";
import { updateProfile, clearProfile } from "./store/userSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import NoteDetail from "./components/NoteDetail";
import LoadingSpinner from "./components/Loading";
import Upgrade from "./components/Upgrade";
import UserProfile from "./components/UserProfile";
import UpgradePlan from "./components/UpgradePlan";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      dispatch(updateProfile(JSON.parse(savedUser)));
      setLoading(false);
    } else {
      const checkSession = async () => {
        try {
          const profile = await authService.getProfile(); // backend verifies cookie
          if (profile) {
            dispatch(updateProfile(profile));
            localStorage.setItem("user", JSON.stringify(profile));
          }
        } catch (err) {
          dispatch(clearProfile());
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
        } finally {
          setLoading(false);
        }
      };
      checkSession();
    }
  }, [dispatch, navigate]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div>
      {user?.email && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <MyNotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invites"
          element={
            <ProtectedRoute>
              <InvitesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <ProtectedRoute>
              <NoteDetail />
            </ProtectedRoute>
          }
        />
        { user.plan === 'free' && 
        <Route
          path="/upgrade"
          element={
            <ProtectedRoute>
              <UpgradePlan />
            </ProtectedRoute>
          }
        />
        }

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile/>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={user ? "/notes" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
