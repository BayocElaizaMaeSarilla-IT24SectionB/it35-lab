import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';

const cardData = [
  {
    title: 'Dream Big',
    subtitle: 'Your vision creates your reality',
    content: '“The future belongs to those who believe in the beauty of their dreams.” – Eleanor Roosevelt',
    theme: 'card-dream',
  },
  {
    title: 'Stay Positive',
    subtitle: 'Bright days ahead',
    content: '“Keep your face always toward the sunshine—and shadows will fall behind you.” – Walt Whitman',
    theme: 'card-positive',
  },
  {
    title: 'Keep Learning',
    subtitle: 'Knowledge is power',
    content: '“Live as if you were to die tomorrow. Learn as if you were to live forever.” – Mahatma Gandhi',
    theme: 'card-learn',
  },
  {
    title: 'Be Kind',
    subtitle: 'Kindness is free',
    content: '“No act of kindness, no matter how small, is ever wasted.” – Aesop',
    theme: 'card-kind',
  },
  {
    title: 'Stay Focused',
    subtitle: 'Eyes on the goal',
    content: '“Success is the result of preparation, hard work, and learning from failure.” – Colin Powell',
    theme: 'card-focus',
  },
  {
    title: 'Be Brave',
    subtitle: 'Courage over comfort',
    content: '“Courage doesn’t always roar. Sometimes courage is the quiet voice at the end of the day saying ‘I will try again tomorrow.’” – Mary Anne Radmacher',
    theme: 'card-brave',
  },
];

function Favorites() {
  return (
    <>
      {cardData.map((card, index) => (
        <IonCard key={index} className={card.theme}>
          <IonCardHeader>
            <IonCardTitle>{card.title}</IonCardTitle>
            <IonCardSubtitle>{card.subtitle}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>{card.content}</IonCardContent>
        </IonCard>
      ))}
    </>
  );
}

export default Favorites;
