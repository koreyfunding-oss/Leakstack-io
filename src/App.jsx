import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LeakDetector from "./pages/LeakDetector";
import Mortgage from "./pages/Mortgage";
import CreditDamage from "./pages/CreditDamage";
import ExcuseGenerator from "./pages/ExcuseGenerator";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/leak-detector" element={<LeakDetector />} />
        <Route path="/mortgage" element={<Mortgage />} />
        <Route path="/credit-damage" element={<CreditDamage />} />
        <Route path="/excuse-generator" element={<ExcuseGenerator />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
