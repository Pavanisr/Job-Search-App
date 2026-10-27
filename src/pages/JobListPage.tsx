import React, { useState, useMemo } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
} from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import JobCard from '../components/JobCard';
import JobDetailsModal from '../components/JobDetailsModal';
import ApplyFormModal from '../components/ApplyFormModal';
import { jobsData } from '../data/jobsData';
import { Job } from '../types/Job';
import './JobListPage.css';

const JobListPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return jobsData;

    return jobsData.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query)
    );
  }, [searchText]);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setIsDetailsOpen(true);
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsDetailsOpen(false);
    setIsApplyOpen(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Job Search</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchText}
            debounce={0}
            placeholder="Search by job title or company"
            onIonInput={(e) => setSearchText(e.detail.value ?? '')}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {filteredJobs.length === 0 ? (
          <div className="empty-state">
            <IonIcon icon={searchOutline} className="empty-state-icon" />
            <IonText color="medium">
              <h2>No jobs found</h2>
              <p>Try a different job title or company name.</p>
            </IonText>
          </div>
        ) : (
          <IonGrid className="job-grid">
            <IonRow>
              {filteredJobs.map((job) => (
                <IonCol size="12" size-md="6" size-lg="4" key={job.id}>
                  <JobCard job={job} onViewDetails={handleViewDetails} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
      </IonContent>

      <JobDetailsModal
        job={selectedJob}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onApply={handleApply}
      />

      <ApplyFormModal
        job={selectedJob}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />
    </IonPage>
  );
};

export default JobListPage;
