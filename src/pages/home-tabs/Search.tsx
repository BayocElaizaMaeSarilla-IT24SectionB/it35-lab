import React from 'react';
import {
   IonPage,
   IonHeader,
   IonToolbar,
   IonTitle,
   IonContent,
   IonDatetime,
   IonCard,
   IonCardContent,
} from '@ionic/react';

function Search() {
   return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Pick a Date & Time</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        className="ion-padding"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f0f0f0',
          height: '100vh',
        }}
      >
        <IonCard style={{ width: '90%', maxWidth: '400px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <IonCardContent>
            <IonDatetime
              presentation="date-time"
              color="tertiary"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
              }}
            ></IonDatetime>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
 
export default Search;
