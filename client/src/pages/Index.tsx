// // // import { DashboardLayout } from "@/components/layout/DashboardLayout";
// // // import { StatsGrid } from "@/components/dashboard/StatsGrid";
// // // import { Helmet } from "react-helmet-async";
// // // import { ArrowRight, MapPin, BarChart3, Users, FileText } from "lucide-react";
// // // import { Link } from "react-router-dom";

// // // export default function Index() {
// // //   return (
// // //     <>
// // //       <Helmet>
// // //         <title>Nepal Project Transparency Portal</title>
// // //         <meta
// // //           name="description"
// // //           content="Public overview of government infrastructure projects and transparency indicators in Nepal."
// // //         />
// // //       </Helmet>

// // //       <DashboardLayout hideHeader>
// // //         <div className="space-y-16 px-6 py-8">

// // //           {/* GOVERNMENT HEADER */}
// // //           <section className="text-center">
// // //             <img
// // //               src="https://upload.wikimedia.org/wikipedia/commons/2/23/Emblem_of_Nepal.svg"
// // //               alt="Government of Nepal Emblem"
// // //               className="mx-auto w-24 h-24"
// // //             />
// // //             <h1 className="mt-4 text-3xl font-bold text-foreground">
// // //               Nepal Project Transparency Portal
// // //             </h1>
// // //             <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
// // //               Official public platform to track and visualize the progress of government
// // //               infrastructure projects across Nepal — promoting transparency and accountability.
// // //             </p>
// // //           </section>

// // //           {/* HERO CTA */}
// // //           <section className="civic-card bg-accent text-accent-foreground text-center p-8">
// // //             <h2 className="text-2xl font-bold">
// // //               Empowering Citizens Through Transparency
// // //             </h2>
// // //             <p className="mt-3 opacity-90">
// // //               Explore projects by status, region, budget, and more — all with mock data for this prototype.
// // //             </p>
// // //             <Link
// // //               to="/projects"
// // //               className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
// // //             >
// // //               Explore Projects
// // //               <ArrowRight className="w-4 h-4" />
// // //             </Link>
// // //           </section>

// // //           {/* NATIONAL STATS */}
// // //           <section>
// // //             <h2 className="text-xl font-bold text-foreground mb-4">
// // //               National Statistics
// // //             </h2>
// // //             <StatsGrid />
// // //           </section>

// // //           {/* KEY BENEFITS */}
// // //           <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
// // //             <div className="civic-card text-center">
// // //               <MapPin className="w-8 h-8 text-accent mx-auto" />
// // //               <h3 className="mt-3 font-semibold">Province Coverage</h3>
// // //               <p className="text-sm text-muted-foreground mt-1">
// // //                 Projects across all provinces and local bodies.
// // //               </p>
// // //             </div>

// // //             <div className="civic-card text-center">
// // //               <BarChart3 className="w-8 h-8 text-accent mx-auto" />
// // //               <h3 className="mt-3 font-semibold">Progress Metrics</h3>
// // //               <p className="text-sm text-muted-foreground mt-1">
// // //                 Monitor phases, completion, and delays in one view.
// // //               </p>
// // //             </div>

// // //             <div className="civic-card text-center">
// // //               <Users className="w-8 h-8 text-accent mx-auto" />
// // //               <h3 className="mt-3 font-semibold">Citizen Engagement</h3>
// // //               <p className="text-sm text-muted-foreground mt-1">
// // //                 Gives citizens insight into government operations.
// // //               </p>
// // //             </div>

// // //             <div className="civic-card text-center">
// // //               <FileText className="w-8 h-8 text-accent mx-auto" />
// // //               <h3 className="mt-3 font-semibold">Comprehensive Reports</h3>
// // //               <p className="text-sm text-muted-foreground mt-1">
// // //                 Download summary reports (mock) for review and analysis.
// // //               </p>
// // //             </div>
// // //           </section>

// // //           {/* HOW IT WORKS */}
// // //           <section className="bg-secondary/30 civic-card p-8">
// // //             <h2 className="text-xl font-bold text-center text-foreground">
// // //               How to Use This Portal
// // //             </h2>
// // //             <ol className="list-decimal list-inside mt-4 space-y-2 text-sm text-muted-foreground">
// // //               <li>Use the sidebar filters to choose project categories.</li>
// // //               <li>Search by name, location, or progress status in the header.</li>
// // //               <li>Click on projects to see detailed timelines and budget allocation.</li>
// // //             </ol>
// // //           </section>

// // //           {/* CTA TO PROJECTS */}
// // //           <section className="text-center">
// // //             <Link
// // //               to="/projects"
// // //               className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-medium hover:opacity-90 transition"
// // //             >
// // //               View All Projects & Progress
// // //               <ArrowRight className="w-4 h-4" />
// // //             </Link>
// // //           </section>

// // //           {/* FOOTER */}
// // //           <footer className="text-center text-xs text-muted-foreground py-4">
// // //             <p>
// // //               This is a frontend prototype for hackathon purposes. All data shown
// // //               here is mock data and not official government data.
// // //             </p>
// // //             <p>© Government of Nepal - 2026 • Powered by Your Team Name</p>
// // //           </footer>

// // //         </div>
// // //       </DashboardLayout>
// // //     </>
// // //   );
// // // }

// // import {
// //   ArrowRight,
// //   CheckCircle2,
// //   MapPin,
// //   BarChart3,
// //   Lock,
// //   Users,
// // } from "lucide-react";
// // import { Link } from "react-router-dom";
// // import { Helmet } from "react-helmet-async";

// // export default function Index() {
// //   return (
// //     <>
// //       <Helmet>
// //         <title>Nepal Project Transparency Portal | E-Governance</title>
// //         <meta
// //           name="description"
// //           content="Public overview of government infrastructure projects with real-time tracking and transparency."
// //         />
// //       </Helmet>

// //       <main className="min-h-screen bg-background">
// //         {/* HERO */}
// //         <section className="pt-24 pb-28 px-4 md:px-8">
// //           <div className="max-w-5xl mx-auto text-center space-y-10 animate-fade-in">
// //             {/* Nepal Emblem */}
// //             <div className="flex justify-center">
// //               <div className="w-20 h-20 rounded-full bg-card shadow-md flex items-center justify-center">
// //                 <img
// //                   src="https://upload.wikimedia.org/wikipedia/commons/2/23/Emblem_of_Nepal.svg"
// //                   alt="Government of Nepal Emblem"
// //                   className="w-14 h-14"
// //                 />
// //               </div>
// //             </div>

// //             {/* Title */}
// //             <div className="space-y-4">
// //               <h1 className="hero-title">
// //                 Government Projects with
// //                 <span className="text-accent"> Transparency</span>
// //               </h1>
// //               <p className="hero-subtitle max-w-3xl mx-auto">
// //                 Monitor public infrastructure development across Nepal. Track
// //                 progress, budgets, and milestones to understand how government
// //                 investments support national growth.
// //               </p>
// //             </div>

// //             {/* Actions */}
// //             <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //               <Link to="/projects" className="btn-primary group">
// //                 Explore Projects
// //                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //               </Link>

// //               <a
// //                 href="#features"
// //                 className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border border-border bg-card hover:bg-secondary transition-colors"
// //               >
// //                 Learn More
// //               </a>
// //             </div>
// //           </div>
// //         </section>

// //         {/* STATS */}
// //         <section className="px-4 md:px-8 py-16 bg-secondary/40">
// //           <div className="max-w-6xl mx-auto">
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //               {[
// //                 { number: "2,847", label: "Active Projects" },
// //                 { number: "₨ 4.2B", label: "Public Investment" },
// //                 { number: "1.2M", label: "Citizens Reached" },
// //                 { number: "94%", label: "On Schedule" },
// //               ].map((stat, idx) => (
// //                 <div
// //                   key={idx}
// //                   className="civic-card text-center space-y-2 animate-scale-in"
// //                   style={{ animationDelay: `${idx * 100}ms` }}
// //                 >
// //                   <p className="text-4xl font-bold text-accent">
// //                     {stat.number}
// //                   </p>
// //                   <p className="text-sm text-muted-foreground tracking-wide">
// //                     {stat.label}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* FEATURES */}
// //         <section id="features" className="px-4 md:px-8 py-24">
// //           <div className="max-w-6xl mx-auto">
// //             <h2 className="section-title text-center mb-14">
// //               What This Portal Provides
// //             </h2>

// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
// //               {[
// //                 {
// //                   icon: BarChart3,
// //                   title: "Track Progress",
// //                   description:
// //                     "View real-time updates on project timelines, completion status, and milestones.",
// //                 },
// //                 {
// //                   icon: MapPin,
// //                   title: "Explore by Location",
// //                   description:
// //                     "Browse projects by province and municipality to see local development activity.",
// //                 },
// //                 {
// //                   icon: Lock,
// //                   title: "Verified Information",
// //                   description:
// //                     "All project data is curated from official sources for transparency.",
// //                 },
// //                 {
// //                   icon: Users,
// //                   title: "Citizen Engagement",
// //                   description:
// //                     "Understand how public funds are being utilized for communities.",
// //                 },
// //                 {
// //                   icon: CheckCircle2,
// //                   title: "Public Documents",
// //                   description:
// //                     "Access reports, budgets, and planning documents with ease.",
// //                 },
// //                 {
// //                   icon: ArrowRight,
// //                   title: "Future Planning",
// //                   description:
// //                     "Stay informed about upcoming government initiatives nationwide.",
// //                 },
// //               ].map((feature, idx) => {
// //                 const Icon = feature.icon;
// //                 return (
// //                   <div
// //                     key={idx}
// //                     className="feature-card animate-slide-up"
// //                     style={{ animationDelay: `${idx * 75}ms` }}
// //                   >
// //                     <div className="feature-card-icon">
// //                       <Icon className="w-6 h-6" />
// //                     </div>
// //                     <h3 className="text-lg font-semibold">
// //                       {feature.title}
// //                     </h3>
// //                     <p className="text-sm text-muted-foreground leading-relaxed">
// //                       {feature.description}
// //                     </p>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         </section>

// //         {/* CTA */}
// //         <section className="px-4 md:px-8 py-24 bg-primary text-primary-foreground">
// //           <div className="max-w-4xl mx-auto text-center space-y-8">
// //             <h2 className="text-4xl font-bold">
// //               Transparent Governance Starts Here
// //             </h2>
// //             <p className="text-lg opacity-90 max-w-2xl mx-auto">
// //               Explore how public infrastructure projects are planned, funded,
// //               and executed across Nepal.
// //             </p>

// //             <Link
// //               to="/projects"
// //               className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold bg-accent text-accent-foreground hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
// //             >
// //               Browse All Projects
// //               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //             </Link>
// //           </div>
// //         </section>

// //         {/* FOOTER */}
// //         <footer className="px-4 md:px-8 py-10 border-t border-border bg-card">
// //           <p className="text-xs text-muted-foreground text-center">
// //             © {new Date().getFullYear()} Government of Nepal • Nepal Project Transparency Portal
// //             <br />
// //             This platform is a hackathon prototype using mock data.
// //           </p>
// //         </footer>
// //       </main>
// //     </>
// //   );
// // }

// import {
//   ArrowRight,
//   CheckCircle2,
//   MapPin,
//   BarChart3,
//   Lock,
//   Users,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import { DashboardLayout } from "@/components/layout/DashboardLayout";

// export default function Index() {
//   return (
//     <>
//       <Helmet>
//         <title>Nepal Project Transparency Portal | E-Governance</title>
//         <meta
//           name="description"
//           content="Public overview of government infrastructure projects with real-time tracking and transparency."
//         />
//       </Helmet>

//       {/* ✅ Sidebar stays | Header hidden */}
//       <DashboardLayout hideHeader>
//         <main className="min-h-screen bg-background space-y-24">

//           {/* HERO */}
//           <section className="pt-20 px-4 md:px-8">
//             <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
//               <div className="flex justify-center">
//                 <img
//                   src="https://upload.wikimedia.org/wikipedia/commons/2/23/Emblem_of_Nepal.svg"
//                   alt="Government of Nepal Emblem"
//                   className="w-16 h-16 md:w-20 md:h-20"
//                 />
//               </div>

//               <div className="space-y-4">
//                 <h1 className="hero-title">
//                   Government Projects with
//                   <span className="text-accent"> Transparency</span>
//                 </h1>
//                 <p className="hero-subtitle max-w-3xl mx-auto">
//                   Monitor public infrastructure development across Nepal.
//                   Track progress and understand how government funds support
//                   your community.
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
//                 <Link to="/projects" className="btn-primary group">
//                   Explore Projects
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </Link>

//                 <a
//                   href="#features"
//                   className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition"
//                 >
//                   Learn More
//                 </a>
//               </div>
//             </div>
//           </section>

//           {/* STATS */}
//           <section className="px-4 md:px-8 py-12 bg-secondary/30">
//             <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[
//                 { number: "2,847", label: "Active Projects" },
//                 { number: "₨ 4.2B", label: "Total Investment" },
//                 { number: "1.2M", label: "Citizens Engaged" },
//                 { number: "94%", label: "On Schedule" },
//               ].map((stat, idx) => (
//                 <div
//                   key={idx}
//                   className="civic-card text-center animate-scale-in"
//                   style={{ animationDelay: `${idx * 100}ms` }}
//                 >
//                   <p className="text-3xl md:text-4xl font-bold text-accent">
//                     {stat.number}
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     {stat.label}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* FEATURES */}
//           <section id="features" className="px-4 md:px-8">
//             <div className="max-w-6xl mx-auto">
//               <h2 className="section-title text-center mb-12">
//                 What You Can Access
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {[
//                   {
//                     icon: BarChart3,
//                     title: "Track Progress",
//                     description:
//                       "View real-time updates on project completion, timelines, and milestones.",
//                   },
//                   {
//                     icon: MapPin,
//                     title: "Explore by Location",
//                     description:
//                       "Navigate projects by province and municipality.",
//                   },
//                   {
//                     icon: Lock,
//                     title: "Verified Data",
//                     description:
//                       "Information sourced from official government records.",
//                   },
//                   {
//                     icon: Users,
//                     title: "Citizen Engagement",
//                     description:
//                       "Participate and provide feedback on public projects.",
//                   },
//                   {
//                     icon: CheckCircle2,
//                     title: "Public Documents",
//                     description:
//                       "Access reports, budgets, and official documentation.",
//                   },
//                   {
//                     icon: ArrowRight,
//                     title: "Future Initiatives",
//                     description:
//                       "Stay informed about upcoming national projects.",
//                   },
//                 ].map((feature, idx) => {
//                   const Icon = feature.icon;
//                   return (
//                     <div
//                       key={idx}
//                       className="feature-card animate-slide-up"
//                       style={{ animationDelay: `${idx * 75}ms` }}
//                     >
//                       <div className="feature-card-icon">
//                         <Icon className="w-6 h-6" />
//                       </div>
//                       <h3 className="text-lg font-semibold">
//                         {feature.title}
//                       </h3>
//                       <p className="text-sm text-muted-foreground">
//                         {feature.description}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </section>

//           {/* CTA */}
//           <section className="px-4 md:px-8 py-20 bg-primary text-primary-foreground text-center">
//             <h2 className="text-4xl font-bold">
//               Start Exploring Today
//             </h2>
//             <p className="mt-4 max-w-2xl mx-auto opacity-90">
//               Built for transparency. Designed for citizens of Nepal.
//             </p>

//             <Link
//               to="/projects"
//               className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-lg font-semibold bg-accent text-accent-foreground hover:-translate-y-1 transition"
//             >
//               Browse All Projects
//               <ArrowRight className="w-5 h-5" />
//             </Link>
//           </section>

//           {/* FOOTER */}
//           <footer className="py-10 text-center text-sm text-muted-foreground">
//             © {new Date().getFullYear()} Government of Nepal • Nepal Project Transparency Portal
//             <br />
//             <span className="text-xs">
//               Mock data used for hackathon demonstration purposes
//             </span>
//           </footer>

//         </main>
//       </DashboardLayout>
//     </>
//   );
// }

import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  BarChart3,
  Lock,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Nepal Project Transparency Portal | E-Governance</title>
        <meta
          name="description"
          content="Public overview of government infrastructure projects with real-time tracking and transparency."
        />
      </Helmet>

      <DashboardLayout hideHeader>
        <main className="min-h-screen bg-background">
          {/* HERO */}
          <section className="pt-24 px-4 md:px-8">
            <div className="max-w-5xl mx-auto text-center space-y-6 animate-fade-in">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/23/Emblem_of_Nepal.svg"
                alt="Government of Nepal Emblem"
                className="mx-auto w-20 h-20 md:w-24 md:h-24"
              />

              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Government Projects with{" "}
                <span className="text-accent">Transparency</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Monitor public infrastructure development across Nepal. Track
                progress and understand how government funds support your
                community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link
                  to="/projects"
                  className="btn-primary group flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold rounded-lg transition hover:shadow-lg"
                >
                  Explore Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#features"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition"
                >
                  Learn More
                </a>
              </div>
            </div>
          </section>

          {/* STATS */}
          <section className="px-4 md:px-8 py-16 bg-secondary/30">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "2,847", label: "Active Projects" },
                { number: "₨ 4.2B", label: "Total Investment" },
                { number: "1.2M", label: "Citizens Engaged" },
                { number: "94%", label: "On Schedule" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="civic-card text-center py-8 px-4 animate-scale-in hover:scale-105 transition-transform"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <p className="text-3xl md:text-4xl font-extrabold text-accent">
                    {stat.number}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURES */}
          <section id="features" className="px-4 md:px-8 py-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                What You Can Access
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: BarChart3,
                    title: "Track Progress",
                    description:
                      "View real-time updates on project completion, timelines, and milestones.",
                  },
                  {
                    icon: MapPin,
                    title: "Explore by Location",
                    description:
                      "Navigate projects by province and municipality.",
                  },
                  {
                    icon: Lock,
                    title: "Verified Data",
                    description:
                      "Information sourced from official government records.",
                  },
                  {
                    icon: Users,
                    title: "Citizen Engagement",
                    description:
                      "Participate and provide feedback on public projects.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Public Documents",
                    description:
                      "Access reports, budgets, and official documentation.",
                  },
                  {
                    icon: ArrowRight,
                    title: "Future Initiatives",
                    description:
                      "Stay informed about upcoming national projects.",
                  },
                ].map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="feature-card bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 animate-slide-up"
                      style={{ animationDelay: `${idx * 75}ms` }}
                    >
                      <div className="feature-card-icon text-accent mb-4">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* HOW TO USE */}
          <section
            id="how-to-use"
            className="px-4 md:px-8 py-16 bg-secondary/20"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                How to Use
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    icon: MapPin,
                    title: "Find Projects",
                    description:
                      "Browse projects by location or category quickly.",
                  },
                  {
                    icon: BarChart3,
                    title: "Track Progress",
                    description:
                      "See timelines, milestones, and completion status in real-time.",
                  },
                  {
                    icon: Users,
                    title: "Engage & Feedback",
                    description:
                      "Submit feedback and upvote or downvote the projects.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "View Documents",
                    description:
                      "Access reports, budgets, and official project documentation.",
                  },
                ].map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={idx}
                      className="civic-card text-center p-6 hover:shadow-lg transition transform hover:-translate-y-1 animate-slide-up"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="text-accent mb-4">
                        <Icon className="w-8 h-8 mx-auto" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-4 md:px-8 py-20 bg-gradient-to-r from-primary to-civic-navy text-primary-foreground text-center rounded-xl mx-4 md:mx-8 shadow-lg">
            <h2 className="text-4xl md:text-5xl font-extrabold">
              Start Exploring Today
            </h2>
            <p className="mt-4 max-w-2xl mx-auto opacity-90 text-lg">
              Built for transparency. Designed for citizens of Nepal.
            </p>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-lg font-semibold bg-accent text-accent-foreground hover:-translate-y-1 transition"
            >
              Browse All Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </section>

          {/* FOOTER */}
          <footer className="py-10 text-center text-sm text-muted-foreground mt-16">
            © {new Date().getFullYear()} Government of Nepal • Nepal Project
            Transparency Portal
            <br />
          </footer>
        </main>
      </DashboardLayout>
    </>
  );
}
