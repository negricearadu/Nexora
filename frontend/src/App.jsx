import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import EndpointDetailPage from "./pages/EndpointDetailPage.jsx";
import EndpointsPage from "./pages/EndpointsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<EndpointsPage />} />
        <Route path="/endpoints/:id" element={<EndpointDetailPage />} />
        <Route path="/despre" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
