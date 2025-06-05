import React from 'react';
import { IonPage, IonHeader, IonButtons, IonMenuButton, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import FavoritesContainer from '../../components/FavoritesContainer';

const Favorites: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Favorites</IonTitle>

        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <FavoritesContainer />
      </IonContent>
    </IonPage>
  );
};

export default Favorites;


