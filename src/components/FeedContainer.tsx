import {
  IonButton,
  IonInput,
  IonCard,
  IonContent,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonAlert,
  IonText,
  IonAvatar,
  IonCol,
  IonRow,
  IonPopover,
  IonModal,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonTextarea,
  IonFooter,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'; 
import { User } from '@supabase/supabase-js';

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
}

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });

  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user) {
        setUser(authData.user);
        const { data: userData } = await supabase
          .from('users')
          .select('user_id, username, user_avatar_url')
          .eq('user_email', authData.user.email)
          .single();

        if (userData) {
          setUser({ ...authData.user, id: userData.user_id });
          setUsername(userData.username);
        }
      }

      const { data: postData } = await supabase
        .from('posts')
        .select('*')
        .order('post_created_at', { ascending: false });

      if (postData) setPosts(postData as Post[]);
    };

    fetchUserAndData();
  }, []);

  const createPost = async () => {
    if (!postContent.trim() || !user || !username) return;

    const { data: userData } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();

    const avatarUrl = userData?.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg';

    const { data } = await supabase
      .from('posts')
      .insert([{ post_content: postContent.trim(), user_id: user.id, username, avatar_url: avatarUrl }])
      .select('*');

    if (data) {
      setPosts([data[0] as Post, ...posts]);
      setPostContent('');
    }
  };

  const deletePost = async (post_id: string) => {
    await supabase.from('posts').delete().match({ post_id });
    setPosts(posts.filter(post => post.post_id !== post_id));
  };

  const startEditingPost = (post: Post) => {
    setEditingPost(post);
    setPostContent(post.post_content);
    setIsModalOpen(true);
  };

  const savePost = async () => {
    if (!postContent.trim() || !editingPost) return;

    const { data } = await supabase
      .from('posts')
      .update({ post_content: postContent.trim() })
      .match({ post_id: editingPost.post_id })
      .select('*');

    if (data) {
      const updatedPost = data[0] as Post;
      setPosts(posts.map(post => (post.post_id === updatedPost.post_id ? updatedPost : post)));
      setPostContent('');
      setEditingPost(null);
      setIsModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      {user && (
        <IonCard style={{ borderRadius: '20px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', background: '#ffffff' }}>
          <IonCardHeader style={{ background: '#f5f5f5', padding: '20px' }}>
            <IonCardTitle style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4c6ef5' }}>🌟 What's on your mind?</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput
              value={postContent}
              onIonChange={e => setPostContent(e.detail.value!)}
              placeholder= "🗯️ Let your imagination shine "
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '12px',
                background: '#f9f9f9',
                marginBottom: '16px',
                fontSize: '1rem',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
              }}
            />
            <IonButton
              expand="block"
              onClick={createPost}
              disabled={!postContent.trim()}
              style={{
                backgroundColor: '#4c6ef5',
                color: 'white',
                fontSize: '1.1rem',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              🖱️ Click It!
            </IonButton>
          </IonCardContent>
        </IonCard>
      )}

      {posts.map(post => (
        <IonCard
          key={post.post_id}
          style={{
            marginTop: '1.5rem',
            borderRadius: '20px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
            backgroundColor: '#ffffff',
            border: '1px solid #ddd',
            paddingBottom: '20px'
          }}
        >
          <IonCardHeader style={{ padding: '16px', backgroundColor: '#fafafa' }}>
            <IonRow>
              <IonCol size="auto">
                <IonAvatar>
                  <img src={post.avatar_url} alt={`${post.username}'s avatar`} />
                </IonAvatar>
              </IonCol>
              <IonCol>
                <IonCardTitle style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{post.username}</IonCardTitle>
                <IonCardSubtitle style={{ color: '#888', fontSize: '1rem' }}>
                  {new Date(post.post_created_at).toLocaleString()}
                </IonCardSubtitle>
              </IonCol>
              <IonCol size="auto">
                <IonButton
                  fill="clear"
                  onClick={(e) =>
                    setPopoverState({ open: true, event: e.nativeEvent, postId: post.post_id })
                  }
                  style={{ fontSize: '0.9rem', color: '#4c6ef5' }}
                >
                  ⋮
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCardHeader>

          <IonCardContent>
            <IonText style={{ fontSize: '1.2rem', color: '#333', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
              💬 {post.post_content}
            </IonText>
          </IonCardContent>

          <IonPopover
            isOpen={popoverState.open && popoverState.postId === post.post_id}
            event={popoverState.event}
            onDidDismiss={() => setPopoverState({ open: false, event: null, postId: null })}
          >
            <div style={{ padding: '10px' }}>
              <IonButton fill="clear" onClick={() => { startEditingPost(post); setPopoverState({ open: false, event: null, postId: null }); }}>
              🖋️ Edit
              </IonButton>
              <IonButton fill="clear" color="danger" onClick={() => { deletePost(post.post_id); setPopoverState({ open: false, event: null, postId: null }); }}>
                🧹 Delete
              </IonButton>
            </div>
          </IonPopover>
        </IonCard>
      ))}

      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>🛠️ Edit Your Post</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonTextarea
            autoGrow
            value={postContent}
            placeholder="Make your post shine even brighter ✨"
            onIonChange={e => setPostContent(e.detail.value!)}
            style={{ background: '#f5f5f5', padding: '10px', borderRadius: '10px', fontSize: '1rem' }}
          />
        </IonContent>
        <IonFooter className="ion-padding" style={{ display: 'flex', gap: '10px' }}>
          <IonButton expand="block" onClick={savePost} style={{ backgroundColor: '#4c6ef5', color: 'white' }}>✅ Save</IonButton>
          <IonButton expand="block" color="medium" onClick={() => setIsModalOpen(false)}>🚫 Cancel</IonButton>
        </IonFooter>
      </IonModal>

      <IonAlert
        isOpen={isAlertOpen}
        onDidDismiss={() => setIsAlertOpen(false)}
        header="Success"
        message="Post updated successfully! 🎉"
        buttons={['OK']}
      />
    </div>
  );
};

export default FeedContainer;
