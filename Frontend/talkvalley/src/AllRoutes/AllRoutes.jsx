import { Route, Routes } from "react-router-dom";
import Recording from "../Components/Recording";
import Home from "../Components/Home";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/record" element={<Recording />} />
    </Routes>
  );
}

export default AllRoutes;
