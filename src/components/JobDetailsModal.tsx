import React from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonBadge,
  IonList,
  IonItem,
  IonLabel,
  IonText,
} from '@ionic/react';
import { close, locationOutline, cashOutline, briefcaseOutline } from 'ionicons/icons';
import { Job } from '../types/Job';

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (job: Job) => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  isOpen,
  onClose,
  onApply,
}) => {
  if (!job) return null;

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Job Details</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonBadge color="primary">{job.type}</IonBadge>
        <h1 style={{ marginTop: 12, marginBottom: 4 }}>{job.title}</h1>
        <h3 style={{ marginTop: 0, color: 'var(--ion-color-medium)' }}>
          {job.company}
        </h3>

        <IonList lines="none" className="ion-no-padding">
          <IonItem>
            <IonIcon icon={locationOutline} slot="start" color="medium" />
            <IonLabel>{job.location}</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={cashOutline} slot="start" color="medium" />
            <IonLabel>{job.salary}</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={briefcaseOutline} slot="start" color="medium" />
            <IonLabel>{job.type}</IonLabel>
          </IonItem>
        </IonList>

        <IonText>
          <h2>Description</h2>
          <p>{job.description}</p>
        </IonText>

        <IonText>
          <h2>Requirements</h2>
          <p>{job.requirements}</p>
        </IonText>

        <IonButton expand="block" color="primary" onClick={() => onApply(job)}>
          Apply Now
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default JobDetailsModal;
