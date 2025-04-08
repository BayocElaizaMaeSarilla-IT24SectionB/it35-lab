import React, { useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonReorder,
  IonReorderGroup,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  ItemReorderEventDetail,
  IonList,
} from '@ionic/react';

function Search() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete math homework', category: 'School', completed: false },
    { id: 2, text: 'Study for history test', category: 'School', completed: false },
    { id: 3, text: 'Clean the kitchen', category: 'Housework', completed: false },
    { id: 4, text: 'Do laundry', category: 'Housework', completed: false },
    { id: 5, text: 'Finish client project', category: 'Work', completed: false },
    { id: 6, text: 'Respond to work emails', category: 'Work', completed: false },
    { id: 7, text: 'Read chapter 5 of biology', category: 'School', completed: false },
    { id: 8, text: 'Vacuum the living room', category: 'Housework', completed: false },
    { id: 9, text: 'Write English essay', category: 'School', completed: false },
    { id: 10, text: 'Wash the car', category: 'Housework', completed: false },
  ]);

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    const from = event.detail.from;
    const to = event.detail.to;
    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(from, 1);
    reorderedTasks.splice(to, 0, movedTask);
    setTasks(reorderedTasks);
    event.detail.complete();
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Combined To-Do List</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            <IonList>
              {tasks.map((task, index) => (
                <IonItem key={task.id} style={itemStyle}>
                  <IonLabel style={labelStyle}>
                    <strong>{task.category}:</strong> {task.text}
                  </IonLabel>
                  <IonReorder slot="end" />
                </IonItem>
              ))}
            </IonList>
          </IonReorderGroup>
        </IonCardContent>
      </IonCard>
    </div>
  );
}

// 🎨 Styles
const itemStyle = {
  padding: '12px 16px',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e5e7eb',
};

const labelStyle = {
  fontSize: '1rem',
  fontWeight: 500,
  color: '#111827',
};

export default Search;
