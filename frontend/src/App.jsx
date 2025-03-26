import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import RedirectAuthenticatedUsers from "./providers/RedirectAuthenticatedUsers";
import RedirectUnAuthenticatedUsers from "./providers/RedirectUnAuthenticatedUsers";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import EditPage from "./pages/EditPage";

function App() {
  const { getUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (fetchingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path={"/"} element={<RedirectUnAuthenticatedUsers><HomePage /></RedirectUnAuthenticatedUsers>} />
        <Route
          path={"/welcome"}
          element={
            <RedirectAuthenticatedUsers>
              <Welcome />
            </RedirectAuthenticatedUsers>
          }
        />
        <Route
          path={"/project/:id"}
          element={
            <RedirectUnAuthenticatedUsers>
              <ProjectPage />
            </RedirectUnAuthenticatedUsers>
          }
        />
        <Route
          path={"/project/:id/edit/:fileId"}
          element={
            <RedirectUnAuthenticatedUsers>
              <EditPage />
            </RedirectUnAuthenticatedUsers>
          }
        />
      </Routes>
    </>
  );
}

export default App;
