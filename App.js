import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  StatusBar,
  Platform 
} from 'react-native';
import TaskList from './components/TaskList';
import AddTaskButton from './components/AddTaskButton';
import AddTaskModal from './components/AddTaskModal';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      createdAt: new Date()
    }]);
    setIsModalVisible(false);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <TaskList 
          tasks={tasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
        <AddTaskButton onPress={() => setIsModalVisible(true)} />
      </View>
      <AddTaskModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={addTask}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    padding: 16,
  },
}); 