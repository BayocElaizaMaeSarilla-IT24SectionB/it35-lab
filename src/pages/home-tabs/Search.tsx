import React, { useState } from 'react';
import { IonAlert, IonButton } from '@ionic/react';


function Search() {
  const [showAlert, setShowAlert] = useState(false);
  const [quote, setQuote] = useState('');

  const funnyQuotes = [
    "I'm not lazy, I'm on energy-saving mode.",
    "I'm not arguing, I'm just explaining why I'm right.",
    "My bed and I love each other, only the alarm clock comes between us.",
    "I'm not great at the advice. Can I interest you in a sarcastic comment?",
    "Common sense is like deodorant. The people who need it most never use it.",
  ];

  const handleClick = () => {
    const randomQuote = funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)];
    setQuote(randomQuote);
    setShowAlert(true);
  };

  return (
    <>
      <IonButton expand="block" className="funny-btn" onClick={handleClick}>
        Don't Press Me!
      </IonButton>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="You pressed it!"
        message={quote}
        buttons={['LOL!']}
      />
    </>
  );
}

export default Search;
