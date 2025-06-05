import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonFooter
} from '@ionic/react';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonText>
          <h2>Welcome to Our App</h2>
          <p>
            This app is built using Ionic React, providing a seamless mobile and web experience. 
            Here you can find inspiration, useful resources, and learn about the features we offer.
          </p>
        </IonText>

        <IonList>
          <IonItem>
            <IonLabel>
              <h3>Features</h3>
              <ul>
                <li>Responsive design for all devices</li>
                <li>Fast and smooth navigation</li>
                <li>Interactive components and beautiful UI</li>
                <li>Easy to customize and extend</li>
              </ul>
            </IonLabel>
          </IonItem>
        </IonList>

        <IonFooter className="ion-padding-top">
          <IonText color="medium">
            <small>© 2025 Bayoc Elaiza Mae. All rights reserved.</small>
          </IonText>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default About;
