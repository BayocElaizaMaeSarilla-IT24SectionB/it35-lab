import React from 'react';
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/react';
import './Feed.css';

function Feed() {
  return (
    <div className="feed-container">
      <IonDatetimeButton datetime="datetime" className="datetime-btn" />

      <IonModal keepContentsMounted={true} className="wide-modal">
        <IonDatetime
          id="datetime"
          presentation="date-time"
          value="2023-11-02T01:22:00"
          showDefaultButtons={true}
          className="wide-datetime"
          formatOptions={{
            date: {
              weekday: 'short',
              month: 'long',
              day: '2-digit',
            },
            time: {
              hour: '2-digit',
              minute: '2-digit',
            },
          }}
        />
      </IonModal>
    </div>
  );
}

export default Feed;
