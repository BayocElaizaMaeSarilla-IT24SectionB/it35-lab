import {
  IonAlert,
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonToast,
  useIonRouter,
} from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient'; 

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({
  message,
  isOpen,
  onClose,
}) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true);
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 500);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding" scrollY={false}>
        {/* Animated background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(-45deg, #6a11cb, #2575fc, #6a11cb, #2575fc)',
            backgroundSize: '400% 400%',
            animation: 'moveBg 12s ease infinite',
            zIndex: 0,
          }}
        ></div>

        {/* Login Card */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '400px',
            margin: 'auto',
            marginTop: '12vh',
            background: 'white',
            padding: '45px 30px',
            borderRadius: '20px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          className="card-hover"
        >
          <h1 style={{ fontWeight: 700, fontSize: '28px', marginBottom: '20px', color: '#333' }}>
            Hello Again! 👋
          </h1>
          <p style={{ marginBottom: '30px', fontSize: '14px', color: '#666' }}>
            Welcome back, you've been missed!
          </p>

          <IonInput
            label="Email"
            labelPlacement="floating"
            fill="outline"
            type="email"
            placeholder="Enter your email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            style={{ marginBottom: '20px' }}
          />

          <IonInput
            label="Password"
            labelPlacement="floating"
            fill="outline"
            type="password"
            placeholder="Enter your password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            style={{ marginBottom: '30px' }}
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>

          <IonButton
            expand="block"
            shape="round"
            onClick={doLogin}
            style={{
              marginBottom: '20px',
              background: 'linear-gradient(to right, #6a11cb, #2575fc)',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0 4px 12px rgba(106,17,203,0.4)',
            }}
          >
            Sign In
          </IonButton>

          <IonButton
            routerLink="/it35-lab/Register"
            fill="clear"
            size="small"
            shape="round"
            style={{
              textTransform: 'none',
              color: '#2575fc',
              fontWeight: 500,
              fontSize: '14px',
            }}
          >
            Don’t have an account? <strong>Register</strong>
          </IonButton>
        </div>

        {/* Alert & Toast */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="success"
        />
      </IonContent>

      {/* Styles and Keyframes */}
      <style>
        {`
          @keyframes moveBg {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
          .card-hover:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 36px rgba(0,0,0,0.25);
          }
        `}
      </style>
    </IonPage>
  );
};

export default Login;
