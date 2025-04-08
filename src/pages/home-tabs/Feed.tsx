import React from 'react';
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  AccordionGroupCustomEvent
} from '@ionic/react';

function Feed() {
  const accordionGroupChange = (event: AccordionGroupCustomEvent) => {
    const selectedValue = event.detail.value;
    console.log(`You opened: ${selectedValue}`);
  };

  const quotes = [
    { label: '🌼 Bloom with Grace', quote: '“Wherever life plants you, bloom with grace.” – French Proverb' },
    { label: '🌟 Shine Bright', quote: '“Stars can’t shine without darkness.” – D.H. Sidebottom' },
    { label: '🍀 Good Vibes Only', quote: '“Keep your face to the sunshine and you cannot see a shadow.” – Helen Keller' },
    { label: '🌈 Chase Rainbows', quote: '“Try to be a rainbow in someone’s cloud.” – Maya Angelou' },
    { label: '🐝 Just Bee You', quote: '“Don’t change so people will like you. Be yourself and the right people will love you.” – Unknown' },
    { label: '🧁 Sweet Moments', quote: '“Enjoy the little things in life, because one day you’ll look back and realize they were the big things.” – Robert Brault' },
    { label: '🌻 Stay Sunny', quote: '“Keep your face to the sunshine and let the shadows fall behind you.” – Walt Whitman' },
    { label: '🍓 Squeeze the Day', quote: '“Do something today that your future self will thank you for.” – Sean Patrick Flanery' },
    { label: '🫧 Breathe & Let Go', quote: '“Sometimes you just need to take a deep breath and remind yourself that you’re okay.” – Unknown' },
    { label: '✨ Dream & Do', quote: '“You are never too old to set another goal or to dream a new dream.” – C.S. Lewis' },
  ];

  return (
    <IonAccordionGroup onIonChange={accordionGroupChange}>
      {quotes.map((item, index) => (
        <IonAccordion key={index} value={`accordion-${index}`}>
          <IonItem slot="header" color="light">
            <IonLabel>{item.label}</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            <blockquote style={{ fontStyle: 'italic', fontSize: '1rem' }}>
              {item.quote}
            </blockquote>
          </div>
        </IonAccordion>
      ))}
    </IonAccordionGroup>
  );
}

export default Feed;
