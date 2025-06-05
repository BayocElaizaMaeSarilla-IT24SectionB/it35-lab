
import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonDatetime,
  IonCard,
  IonButtons,
  IonMenuButton,
  IonCardContent,
} from '@ionic/react';

const Search: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="primary">
                    <IonButtons slot="start">
                      <IonMenuButton />
                    </IonButtons>
          <IonTitle>Pick a Date & Time</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        className="ion-padding"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #e0f7fa, #ffffff)',
        }}
      >
        <IonCard
          style={{
            width: '90%',
            maxWidth: '400px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as unknown as HTMLDivElement).style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as unknown as HTMLDivElement).style.transform = 'scale(1)';
          }}
        >
          <IonCardContent>
            <IonDatetime
              presentation="date-time"
              color="tertiary"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Search;
