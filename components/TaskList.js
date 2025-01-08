import React from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Text,
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity 
        style={styles.checkbox}
        onPress={() => onToggleTask(item.id)}
      >
        {item.completed && (
          <Ionicons name="checkmark-circle" size={24} color="#007AFF" />
        )}
        {!item.completed && (
          <Ionicons name="ellipse-outline" size={24} color="#C7C7CC" />
        )}
      </TouchableOpacity>
      <Text style={[
        styles.taskText,
        item.completed && styles.completedTask
      ]}>
        {item.title}
      </Text>
      <TouchableOpacity 
        onPress={() => onDeleteTask(item.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  checkbox: {
    marginRight: 12,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  deleteButton: {
    padding: 4,
  },
}); 