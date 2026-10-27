import React, { useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonNote,
  IonToast,
} from '@ionic/react';
import { close } from 'ionicons/icons';
import { Job, ApplicationForm, ApplicationFormErrors } from '../types/Job';

interface ApplyFormModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_FORM: ApplicationForm = {
  fullName: '',
  email: '',
  mobile: '',
  message: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^\+?[0-9]{7,15}$/;

const ApplyFormModal: React.FC<ApplyFormModalProps> = ({ job, isOpen, onClose }) => {
  const [form, setForm] = useState<ApplicationForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<ApplicationFormErrors>({});
  const [showToast, setShowToast] = useState(false);

  const handleChange = (field: keyof ApplicationForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    const newErrors: ApplicationFormErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!MOBILE_REGEX.test(form.mobile.trim())) {
      newErrors.mobile = 'Enter a valid mobile number (7-15 digits).';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Please add a short message.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }
    // In a real app this would call an API. Here we just confirm success.
    setShowToast(true);
    setForm(EMPTY_FORM);
    setErrors({});
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  if (!job) return null;

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Apply - {job.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleClose}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem className={errors.fullName ? 'ion-invalid' : ''}>
          <IonLabel position="stacked">Full Name *</IonLabel>
          <IonInput
            value={form.fullName}
            placeholder="Jane Doe"
            onIonInput={(e) => handleChange('fullName', e.detail.value ?? '')}
          />
        </IonItem>
        {errors.fullName && (
          <IonNote color="danger" className="ion-padding-start">
            {errors.fullName}
          </IonNote>
        )}

        <IonItem className={errors.email ? 'ion-invalid' : ''}>
          <IonLabel position="stacked">Email *</IonLabel>
          <IonInput
            type="email"
            value={form.email}
            placeholder="jane@example.com"
            onIonInput={(e) => handleChange('email', e.detail.value ?? '')}
          />
        </IonItem>
        {errors.email && (
          <IonNote color="danger" className="ion-padding-start">
            {errors.email}
          </IonNote>
        )}

        <IonItem className={errors.mobile ? 'ion-invalid' : ''}>
          <IonLabel position="stacked">Mobile Number *</IonLabel>
          <IonInput
            type="tel"
            value={form.mobile}
            placeholder="+1 555 123 4567"
            onIonInput={(e) => handleChange('mobile', e.detail.value ?? '')}
          />
        </IonItem>
        {errors.mobile && (
          <IonNote color="danger" className="ion-padding-start">
            {errors.mobile}
          </IonNote>
        )}

        <IonItem className={errors.message ? 'ion-invalid' : ''}>
          <IonLabel position="stacked">Message *</IonLabel>
          <IonTextarea
            value={form.message}
            placeholder="Tell us why you're a great fit..."
            autoGrow
            onIonInput={(e) => handleChange('message', e.detail.value ?? '')}
          />
        </IonItem>
        {errors.message && (
          <IonNote color="danger" className="ion-padding-start">
            {errors.message}
          </IonNote>
        )}

        <IonButton
          expand="block"
          color="primary"
          className="ion-margin-top"
          onClick={handleSubmit}
        >
          Submit Application
        </IonButton>
      </IonContent>

      <IonToast
        isOpen={showToast}
        message="Application submitted successfully!"
        duration={1500}
        color="success"
        onDidDismiss={() => setShowToast(false)}
      />
    </IonModal>
  );
};

export default ApplyFormModal;
