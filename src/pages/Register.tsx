import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonTitle,
  IonModal,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAlert,
  IonSpinner,
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

// Reusable Alert Box
const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => (
  <IonAlert
    isOpen={isOpen}
    onDidDismiss={onClose}
    header="Notification"
    message={message}
    buttons={['OK']}
  />
);

// Styles
const inputStyle = {
  margin: '10px 0',
  width: '100%',
  borderRadius: '25px',
  fontFamily: 'Arial, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#333',
  background: 'linear-gradient(to right,rgb(248, 243, 243),rgb(248, 244, 244))',
  transition: 'all 0.3s ease',
};

const cardStyle = {
  marginTop: '5%',
  borderRadius: '20px',
};

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegisterClick = () => {
    if (!email.endsWith('@nbsc.edu.ph') && !email.endsWith('@gmail.com')) {
      setAlertMessage('Please register with a valid email domain (nbsc.edu.ph or gmail.com).');
      setShowAlert(true);
      return;
    }
    if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match.');
      setShowAlert(true);
      return;
    }
    setShowVerificationModal(true);
  };

  const doRegister = async () => {
    setLoading(true);
    setShowVerificationModal(false);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(`Account creation failed: ${error.message}`);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { error: insertError } = await supabase.from('users').insert([{
        username,
        user_email: email,
        user_firstname: firstName,
        user_lastname: lastName,
        user_password: hashedPassword,
      }]);

      if (insertError) throw new Error(`Failed to save user data: ${insertError.message}`);

      setShowSuccessModal(true);
    } catch (err) {
      setAlertMessage(err instanceof Error ? err.message : 'An unknown error occurred.');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>

        {/* Background Design */}
        <div style={{ position: 'absolute', borderRadius: '5  0%', background: 'linear-gradient(45deg, rgb(115, 35, 38), rgb(232, 94, 56))', opacity: 0.6, width: '120px', height: '120px', top: '5%', left: '10%', animation: 'float 10s infinite ease-in-out' }} />
        <div style={{ position: 'absolute', borderRadius: '50%', background: 'linear-gradient(45deg, rgb(115, 35, 38), rgb(232, 94, 56))', opacity: 0.6, width: '200px', height: '200px', top: '30%', left: '70%', animation: 'float 12s infinite ease-in-out' }} />
        <div style={{ position: 'absolute', borderRadius: '50%', background: 'linear-gradient(45deg, rgb(115, 35, 38), rgb(232, 94, 56))', opacity: 0.6, width: '150px', height: '150px', bottom: '15%', left: '20%', animation: 'float 8s infinite ease-in-out' }} />
        <div style={{ position: 'absolute', borderRadius: '50%', background: 'linear-gradient(45deg, rgb(115, 35, 38), rgb(232, 94, 56))', opacity: 0.6, width: '100px', height: '100px', bottom: '5%', right: '15%', animation: 'float 10s infinite ease-in-out' }} />

        {/* Floating Animation */}
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0) rotate(0); }
              50% { transform: translateY(-20px) rotate(45deg); }
            }
            @keyframes fadeIn {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>

        {/* Registration Card */}
        <div
          style={{
            width: '50%',
            maxWidth: 'none',
            margin: '1vh auto 0 auto',
            padding: '10px 20px',
            borderRadius: '30px',
            backgroundColor: 'rgba(247, 243, 243, 0.97)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            position: 'relative',
            zIndex: 1,
            animation: 'fadeIn 1s ease-out',
          }}
        >
          {/* ✅ Logo - Resized */}
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            <img
              src="https://clipground.com/images/eb-logo.jpg"
              alt="Logo"
              style={{
                borderRadius: '15px',
                width: '80px',
                height: 'auto',
              }}
            />
          </div>

          <h1 style={{ textAlign: 'center', fontWeight: '900', color: '#2f3640', fontSize: '26px', marginBottom: '10px' }}>
            Create Your Account
          </h1>
          <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '20px' }}>
            Get started by filling the information below
          </p>

          <IonInput style={inputStyle} label="Username" labelPlacement="floating" fill="outline" type="text" placeholder="Enter your username" value={username} onIonInput={e => setUsername(e.detail.value ?? '')} />
          <IonInput style={inputStyle} label="First Name" labelPlacement="floating" fill="outline" type="text" placeholder="First Name" value={firstName} onIonInput={e => setFirstName(e.detail.value ?? '')} />
          <IonInput style={inputStyle} label="Last Name" labelPlacement="floating" fill="outline" type="text" placeholder="Last Name" value={lastName} onIonInput={e => setLastName(e.detail.value ?? '')} />
          <IonInput style={inputStyle} label="Email" labelPlacement="floating" fill="outline" type="email" placeholder="Enter your email" value={email} onIonInput={e => setEmail(e.detail.value ?? '')} />
          <IonInput style={inputStyle} label="Password" labelPlacement="floating" fill="outline" type="password" placeholder="Enter password" value={password} onIonInput={e => setPassword(e.detail.value ?? '')}>
            <IonInputPasswordToggle slot="end" />
          </IonInput>
          <IonInput style={inputStyle} label="Repeat Password" labelPlacement="floating" fill="outline" type="password" placeholder="Repeat password" value={confirmPassword} onIonInput={e => setConfirmPassword(e.detail.value ?? '')}>
            <IonInputPasswordToggle slot="end" />
          </IonInput>

          <IonButton
            expand="full"
            color="success"
            style={{ marginTop: '20px', borderRadius: '25px', fontWeight: 'bold' }}
            onClick={handleRegisterClick}
            disabled={loading}
          >
            {loading ? <IonSpinner name="dots" /> : 'Register'}
          </IonButton>

          <IonButton
            routerLink="/it35-lab"
            fill="clear"
            style={{ marginTop: '5px', fontSize: '15px', color: '#38ada9' }}
          >
            Already have an account? Sign in
          </IonButton>
        </div>

        {/* Verification Modal */}
        <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)} animated>
          <IonContent className="ion-padding">
            <IonCard style={cardStyle}>
              <IonCardHeader>
                <IonCardTitle>Review Your Details</IonCardTitle>
                <hr />
                <IonCardSubtitle>Username</IonCardSubtitle>
                <IonCardTitle>{username}</IonCardTitle>
                <IonCardSubtitle>Email</IonCardSubtitle>
                <IonCardTitle>{email}</IonCardTitle>
                <IonCardSubtitle>Full Name</IonCardSubtitle>
                <IonCardTitle>{firstName} {lastName}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <IonButton fill="outline" color="medium" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
                  <IonButton color="success" onClick={doRegister}>Confirm</IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonModal>

        {/* Success Modal */}
        <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)} animated>
          <IonContent className="ion-padding" style={{ textAlign: 'center' }}>
            <div style={{
              marginTop: '30%',
              padding: '30px',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)'
            }}>
              <IonTitle style={{ fontSize: '22px', color: '#28a745' }}>✅ Registration Successful!</IonTitle>
              <IonText>
                <p>Your account has been successfully created.</p>
                <p>You can now sign in!</p>
              </IonText>
              <IonButton color="primary" expand="full" style={{ marginTop: '20px' }} onClick={() => setShowSuccessModal(false)}>
                Close
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

      </IonContent>
    </IonPage>
  );
};

export default Register;
