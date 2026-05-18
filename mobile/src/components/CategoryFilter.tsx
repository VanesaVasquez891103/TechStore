import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Category } from '../types';

interface Props {
  categories: Category[];
  selectedId?: number;
  onSelect: (categoryId?: number) => void;
}

export function CategoryFilter({ categories, selectedId, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={[styles.button, selectedId === undefined && styles.selected]} onPress={() => onSelect(undefined)}>
          <Text style={styles.text}>Todas</Text>
        </TouchableOpacity>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[styles.button, selectedId === category.id && styles.selected]}
            onPress={() => onSelect(category.id)}
          >
            <Text style={styles.text}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
  },
  selected: {
    backgroundColor: '#1f6f8b',
  },
  text: {
    color: '#111111',
  },
});
