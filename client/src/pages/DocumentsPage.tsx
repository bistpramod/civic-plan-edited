import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Helmet } from 'react-helmet-async';
import { FileText, Download, Calendar, FileType } from 'lucide-react';
import { Button } from '@/components/ui/button';

const documents = [
  {
    id: 'doc-001',
    title: 'Annual Development Plan FY 2081-82',
    type: 'PDF',
    size: '2.4 MB',
    date: '2024-07-15',
    category: 'Planning',
  },
  {
    id: 'doc-002',
    title: 'Infrastructure Budget Allocation Report',
    type: 'PDF',
    size: '1.8 MB',
    date: '2024-06-20',
    category: 'Finance',
  },
  {
    id: 'doc-003',
    title: 'Quarterly Progress Report Q3 2081',
    type: 'PDF',
    size: '3.2 MB',
    date: '2024-10-01',
    category: 'Progress',
  },
  {
    id: 'doc-004',
    title: 'Public Procurement Guidelines',
    type: 'PDF',
    size: '890 KB',
    date: '2024-04-12',
    category: 'Guidelines',
  },
  {
    id: 'doc-005',
    title: 'Environmental Impact Assessment - Ring Road',
    type: 'PDF',
    size: '5.1 MB',
    date: '2024-08-30',
    category: 'Assessment',
  },
];

const DocumentsPage = () => {
  return (
    <>
      <Helmet>
        <title>Documents - Civic Plan Nepal</title>
        <meta name="description" content="Access public documents related to government infrastructure projects in Nepal including planning documents, progress reports, and guidelines." />
      </Helmet>
      <DashboardLayout hideHeader>
        <div className="space-y-6">
          {/* Header */}
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground">
              Public Documents
            </h1>
            <p className="text-muted-foreground mt-1">
              Access official documents, reports, and guidelines
            </p>
          </div>

          {/* Documents List */}
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div
                key={doc.id}
                className="civic-card !p-4 flex items-center gap-4 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-accent" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{doc.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileType className="w-3.5 h-3.5" />
                      {doc.type} • {doc.size}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(doc.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                  {doc.category}
                </span>

                <Button variant="outline" size="sm" className="shrink-0">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DocumentsPage;
