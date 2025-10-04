import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CVBuilder from "./components/CVBuilder";
import PreviewPage from "./components/PreviewPage";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import AuthModal from "./components/AuthModal";
import { CVData, TemplateType } from "./types/cv";
import { useAuth } from "./context/AuthContext";
import { saveCVDownload } from "./lib/firestore";
import { generatePDFBlob } from "./lib/pdfGenerator";

function App() {
  const { user } = useAuth();
  const [cvData, setCvData] = useState<CVData>(() => {
    // Load from localStorage on first render
    const saved = localStorage.getItem("cvData");
    return saved
      ? JSON.parse(saved)
      : {
          personalInfo: {
            fullName: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            website: "",
            summary: "",
          },
          education: [],
          experience: [],
          volunteerWork: [],
          skills: [],
          projects: [],
          achievements: [],
          references: [],
        };
  });

  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>("modern");
  const [showAuthModal, setShowAuthModal] = useState(false);

  const navigate = useNavigate();

  // Persist data on every change
  useEffect(() => {
    localStorage.setItem("cvData", JSON.stringify(cvData));
  }, [cvData]);

  const handleDownload = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      const pdfBlob = await generatePDFBlob(cvData, selectedTemplate);
      await saveCVDownload(
        user.uid,
        user.email || cvData.personalInfo.email,
        cvData,
        selectedTemplate
      );

      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${cvData.personalInfo.fullName.replace(
        /\s+/g,
        "_"
      )}_CV.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      alert("Your CV has been downloaded successfully!");
    } catch (error) {
      console.error("Error downloading CV:", error);
      alert("Failed to download CV. Please try again.");
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    handleDownload();
  };

  return (
    <>
      <Routes>
        {/* ✅ Pass onGetStarted so buttons on LandingPage work */}
        <Route
          path="/"
          element={<LandingPage onGetStarted={() => navigate("/builder")} />}
        />

        <Route
          path="/builder"
          element={
            <CVBuilder
              cvData={cvData}
              onUpdateCVData={setCvData}
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
              onPreview={() => navigate("/preview")}
            />
          }
        />

        <Route
          path="/preview"
          element={
            <PreviewPage
              cvData={cvData}
              selectedTemplate={selectedTemplate}
              onBack={() => navigate("/builder")}
              onDownload={handleDownload}
            />
          }
        />

        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
