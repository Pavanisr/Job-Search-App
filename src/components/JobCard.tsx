import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { locationOutline, cashOutline, briefcaseOutline } from 'ionicons/icons';
import { Job } from '../types/Job';
import './JobCard.css';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  return (
    <IonCard className="job-card" button={false}>
      <IonCardHeader>
        <IonBadge color="primary" className="job-type-badge">
          {job.type}
        </IonBadge>
        <IonCardTitle className="job-title">{job.title}</IonCardTitle>
        <IonCardSubtitle className="job-company">{job.company}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonGrid className="job-meta-grid">
          <IonRow>
            <IonCol size="12" size-md="6" className="job-meta-item">
              <IonIcon icon={locationOutline} color="medium" />
              <span>{job.location}</span>
            </IonCol>
            <IonCol size="12" size-md="6" className="job-meta-item">
              <IonIcon icon={cashOutline} color="medium" />
              <span>{job.salary}</span>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="job-meta-item">
              <IonIcon icon={briefcaseOutline} color="medium" />
              <span>{job.type}</span>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonButton
          expand="block"
          fill="outline"
          className="view-details-btn"
          onClick={() => onViewDetails(job)}
        >
          View Details
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default JobCard;
