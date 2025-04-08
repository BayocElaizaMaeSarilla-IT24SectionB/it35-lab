import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { homeOutline, informationCircleOutline } from 'ionicons/icons';
import Search from './Search'; // Import your Search component

const HomeTabs = () => {
  return (
    <IonTabs>
      {/* Tab content */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="search" href="/search">
          <IonIcon icon={informationCircleOutline} />
          <IonLabel>Search</IonLabel>
        </IonTabButton>
      </IonTabBar>

      {/* Tab pages */}
      <div tab="home">
        <h1>Welcome Home!</h1>
      </div>
      <div tab="search">
        <Search /> {/* Add your Search component here */}
      </div>
    </IonTabs>
  );
};

export default HomeTabs;
