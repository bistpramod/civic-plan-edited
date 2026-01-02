import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  localBodies,
  projects,
  formatCurrency,
  Project,
} from "@/data/mockData";
import {
  Building2,
  MapPin,
  TrendingUp,
  ArrowLeft,
  Users,
  Wallet,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { useState } from "react";


const LocalBodyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const localBody = localBodies.find((body) => body.id === id);

  const [selectedWard, setSelectedWard] = useState<number | null>(null); // null = all wards
  const navigate = useNavigate();

  // navigate to project detail page
  const openProjectSheet = (project: Project) => {
    navigate(`/projects/${project.id}`);
  };

  if (!localBody) {
    return (
      <DashboardLayout hideHeader>
        <div className="flex flex-col items-center justify-center py-20">
          <Building2 className="w-16 h-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold text-foreground">
            Local Body Not Found
          </h1>
          <p className="text-muted-foreground mt-2">
            The requested local government body could not be found.
          </p>
          <Link to="/local-bodies">
            <Button variant="outline" className="mt-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Local Bodies
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  // Local body leaders & ward info
  const localBodyData: Record<
    string,
    {
      mayor: {
        name: string;
        title: string;
        image: string;
        email: string;
        phone: string;
      };
      deputyMayor: {
        name: string;
        title: string;
        image: string;
        email: string;
        phone: string;
      };
      totalWards: number;
      wardOfficers: {
        name: string;
        role: string;
        image: string;
        email: string;
      }[];
    }
  > = {
    "kathmandu-metro": (() => {
      const totalWards = 32;
      return {
        mayor: {
          name: "Balendra Shah",
          title: "Mayor",
          image:
            "https://kathmandu.gov.np/wp-content/uploads/2022/05/viber_image_2022-07-28_18-17-58-844.png",
          email: "mayor@kathmandu.gov.np",
          phone: "9851279900",
        },
        deputyMayor: {
          name: "Sunita Dangol",
          title: "Deputy Mayor",
          image:
            "https://kathmandu.gov.np/wp-content/uploads/2022/05/viber_image_2022-05-27_19-30-33-053-removebg-preview.png",
          email: "deputy.mayor@kathmandu.gov.np",
          phone: "9851279899",
        },
        totalWards,
        wardOfficers: Array.from({ length: totalWards }, (_, i) => ({
          name: `Ward Officer ${i + 1}`,
          role: "Ward Chairperson",
          image: `https://i.pravatar.cc/150?img=${20 + i + 1}`,
          email: `ktmward${i + 1}@kathmandu.gov.np`,
        })),
      };
    })(),
    "lalitpur-metro": (() => {
      const totalWards = 29;
      return {
        mayor: {
          name: "Chiri Babu Maharjan",
          title: "Mayor",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/9/91/Chiri_Babu_Maharjan11.jpg",
          email: "mayor@lmc.gov.np",
          phone: "9851022723",
        },
        deputyMayor: {
          name: "Manjali Shakya",
          title: "Deputy Mayor",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/0/09/Manjali_Shakya_Bajracharya.jpg",
          email: "deputy_mayor@lmc.gov.np",
          phone: "9851018101",
        },
        totalWards,
        wardOfficers: Array.from({ length: totalWards }, (_, i) => ({
          name: `Ward Officer ${i + 1}`,
          role: "Ward Chairperson",
          image: `https://i.pravatar.cc/150?img=${40 + i + 1}`,
          email: `lmcward${i + 1}@lmc.gov.np`,
        })),
      };
    })(),
  };

  const localBodyInfo = localBodyData[localBody.id];

  // fallback if undefined
  if (!localBodyInfo) {
    console.warn(
      `Local body data not found for ID: ${localBody.id}, using Kathmandu as fallback`
    );
  }

  const { mayor, deputyMayor, wardOfficers, totalWards } =
    localBodyInfo || localBodyData["kathmandu-metro"];

  // Ward dropdown
  const wards = Array.from({ length: totalWards }, (_, i) => i + 1);

  // Selected officer
  const selectedOfficer =
    selectedWard !== null ? wardOfficers[selectedWard - 1] : null;

  // Projects
  const allLocalBodyProjects = projects.filter(
    (p) =>
      p.location.toLowerCase().includes(localBody.district.toLowerCase()) ||
      localBody.name.toLowerCase().includes(p.location.toLowerCase())
  );
  const localBodyProjects =
    selectedWard === null
      ? allLocalBodyProjects
      : allLocalBodyProjects.filter((p) => p.ward === selectedWard);

  const completionRate = Math.round(
    (localBody.completedProjects / localBody.totalProjects) * 100
  );
  const ongoingProjects = localBodyProjects.filter(
    (p) => p.status === "ongoing"
  ).length;

  return (
    <>
      <Helmet>
        <title>{localBody.name} - Civic Plan Nepal</title>
        <meta
          name="description"
          content={`View infrastructure projects and development progress for ${localBody.name}, ${localBody.district}, ${localBody.province}.`}
        />
      </Helmet>

      <DashboardLayout hideHeader>
        <div className="space-y-6">
          {/* Back Button */}
          <Link to="/local-bodies">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Local Bodies
            </Button>
          </Link>

          {/* Header Card */}
          <div className="civic-card animate-fade-in flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">
                {localBody.name}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>
                  {localBody.district}, {localBody.province}
                </span>
              </div>
              <span className="inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground capitalize">
                {localBody.type.replace("-", " ")}
              </span>
            </div>

            {/* Mayor & Deputy */}
            <div className="flex gap-6 mt-4 md:mt-0">
              <div
                className="text-center cursor-pointer"
                onClick={() =>
                  window.open(
                    `https://en.wikipedia.org/wiki/${mayor.name}`,
                    "_blank"
                  )
                }
              >
                <img
                  src={mayor.image}
                  alt={mayor.name}
                  className="w-20 h-20 rounded-full mx-auto border-2 border-accent"
                />
                <p className="font-semibold text-foreground mt-2">
                  {mayor.name}
                </p>
                <p className="text-sm text-muted-foreground">{mayor.title}</p>
                <p className="text-xs text-muted-foreground">{mayor.email}</p>
                <p className="text-xs text-muted-foreground">{mayor.phone}</p>
              </div>

              <div
                className="text-center cursor-pointer"
                onClick={() =>
                  window.open(
                    `https://en.wikipedia.org/wiki/${deputyMayor.name}`,
                    "_blank"
                  )
                }
              >
                <img
                  src={deputyMayor.image}
                  alt={deputyMayor.name}
                  className="w-20 h-20 rounded-full mx-auto border-2 border-accent"
                />
                <p className="font-semibold text-foreground mt-2">
                  {deputyMayor.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {deputyMayor.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {deputyMayor.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {deputyMayor.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="civic-card animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {localBody.totalProjects}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Total Projects
                  </p>
                </div>
              </div>
            </div>
            <div className="civic-card animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-civic-success/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-civic-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-civic-success">
                    {localBody.completedProjects}
                  </p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </div>
            <div className="civic-card animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-civic-warning/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-civic-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-civic-warning">
                    {ongoingProjects}
                  </p>
                  <p className="text-xs text-muted-foreground">Ongoing</p>
                </div>
              </div>
            </div>
            <div className="civic-card animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(localBody.totalBudget)}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Budget</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="civic-card animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Overall Completion Rate
                </h2>
              </div>
              <span className="text-2xl font-bold text-foreground">
                {completionRate}%
              </span>
            </div>
            <Progress value={completionRate} className="h-3" />
          </div>

          {/* Ward Selection */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="ward-select"
              className="font-medium text-foreground"
            >
              Select Ward:
            </label>
            <select
              id="ward-select"
              value={selectedWard ?? ""}
              onChange={(e) =>
                setSelectedWard(e.target.value ? Number(e.target.value) : null)
              }
              className="border border-border rounded-md px-3 py-1 bg-card text-foreground"
            >
              <option value="">All Wards</option>
              {wards.map((ward) => (
                <option key={ward} value={ward}>
                  Ward {ward}
                </option>
              ))}
            </select>
          </div>

          {/* Ward Officer */}
          {selectedOfficer && (
            <div className="civic-card text-center mt-4 animate-slide-up">
              <img
                src={selectedOfficer.image}
                alt={selectedOfficer.name}
                className="w-24 h-24 rounded-full mx-auto mb-3"
              />
              <p className="font-semibold text-foreground">
                {selectedOfficer.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedOfficer.role} (Ward {selectedWard})
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedOfficer.email}
              </p>
            </div>
          )}

          {/* Projects Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Projects in {localBody.name}
            </h2>

            {localBodyProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {localBodyProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => openProjectSheet(project)}
                    className="cursor-pointer"
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="civic-card text-center py-12">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No projects found for this selection.
                </p>
              </div>
            )}


          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default LocalBodyDetailPage;
