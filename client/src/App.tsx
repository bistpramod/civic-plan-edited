import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import LocalBodiesPage from "./pages/LocalBodiesPage";
import DocumentsPage from "./pages/DocumentsPage";
import NotFound from "./pages/NotFound";
import LocalBodyDetailPage from "./components/LocalBodiesDetail";
import AdminPanel from "./components/AdminPage";
import AdminLayout from "./components/layout/AdminLayout";
import NotificationsPage from "./pages/NotificationsPage";
import InboxPage from "./pages/InboxPage";
import AdminProjectDetailPage from "./pages/admin/AdminProjectDetailPage";
import LoginPage from "./pages/Login";
import OtpVerifyPage from "./pages/OTPVerify";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/local-bodies" element={<LocalBodiesPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/local-bodies/:id" element={<LocalBodyDetailPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/otp-verify" element={<OtpVerifyPage />} />

            {/* Admin-scoped pages */}
            <Route path="/admin/notifications" element={<AdminLayout><NotificationsPage /></AdminLayout>} />
            <Route path="/admin/inbox" element={<AdminLayout><InboxPage /></AdminLayout>} />
            <Route path="/admin/projects/:id" element={<AdminLayout><AdminProjectDetailPage /></AdminLayout>} />
            <Route path="/admin/projects/:id/view" element={<AdminLayout><AdminProjectDetailPage /></AdminLayout>} />

            <Route path="/admin" element={<AdminLayout><AdminPanel /></AdminLayout>} />
            <Route path="/admin/*" element={<AdminLayout><AdminPanel /></AdminLayout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
