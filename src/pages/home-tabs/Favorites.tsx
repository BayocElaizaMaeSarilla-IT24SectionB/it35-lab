import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from '@ionic/react';
import { rocketOutline, sunnyOutline, schoolOutline, heartOutline, atOutline, flameOutline } from 'ionicons/icons';

const cardData = [
  {
    title: 'Dream Big',
    subtitle: 'Your vision creates your reality',
    content: '“The future belongs to those who believe in the beauty of their dreams.” – Eleanor Roosevelt',
    theme: 'card-dream',
    icon: rocketOutline,
    color: '#6366f1',
  },
  {
    title: 'Stay Positive',
    subtitle: 'Bright days ahead',
    content: '“Keep your face always toward the sunshine—and shadows will fall behind you.” – Walt Whitman',
    theme: 'card-positive',
    icon: sunnyOutline,
    color: '#f59e0b',
  },
  {
    title: 'Keep Learning',
    subtitle: 'Knowledge is power',
    content: '“Live as if you were to die tomorrow. Learn as if you were to live forever.” – Mahatma Gandhi',
    theme: 'card-learn',
    icon: schoolOutline,
    color: '#10b981',
  },
  {
    title: 'Be Kind',
    subtitle: 'Kindness is free',
    content: '“No act of kindness, no matter how small, is ever wasted.” – Aesop',
    theme: 'card-kind',
    icon: heartOutline,
    color: '#ef4444',
  },
  {
    title: 'Stay Focused',
    subtitle: 'Eyes on the goal',
    content: '“Success is the result of preparation, hard work, and learning from failure.” – Colin Powell',
    theme: 'card-focus',
    icon: atOutline,
    color: '#3b82f6',
  },
  {
    title: 'Be Brave',
    subtitle: 'Courage over comfort',
    content: '“Courage doesn’t always roar. Sometimes courage is the quiet voice at the end of the day saying ‘I will try again tomorrow.’” – Mary Anne Radmacher',
    theme: 'card-brave',
    icon: flameOutline,
    color: '#f97316',
  },
];

function Favorites() {
  return (
    <>
      {cardData.map((card, index) => (
        <IonCard
          key={index}
          className={card.theme}
          style={{
            borderRadius: '15px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)';
          }}
        >
          <IonCardHeader
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '20px 16px 10px',
            }}
          >
            <IonIcon
              icon={card.icon}
              style={{
                fontSize: '2.8rem',
                color: card.color,
                animation: 'pulse 2s infinite',
              }}
            />
            <div>
              <IonCardTitle
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '4px',
                  color: '#1f2937',
                }}
              >
                {card.title}
              </IonCardTitle>
              <IonCardSubtitle
                style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                }}
              >
                {card.subtitle}
              </IonCardSubtitle>
            </div>
          </IonCardHeader>
          <IonCardContent
            style={{
              fontSize: '1.05rem',
              color: '#374151',
              padding: '0 20px 20px',
            }}
          >
            {card.content}
          </IonCardContent>
        </IonCard>
      ))}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </>
  );
}

export default Favorites;
