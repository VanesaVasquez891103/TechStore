import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Category } from '../types';
import { colors, radii, shadows, typography } from '../styles/theme';

interface Props {
  categories: Category[];
  selectedId?: number;
  onSelect: (categoryId?: number) => void;
}

export function CategoryFilter({ categories, selectedId, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Pressable
          style={state => [
            styles.button,
            selectedId === undefined && styles.selected,
            (state.pressed || Boolean((state as { hovered?: boolean }).hovered)) && styles.active,
          ]}
          onPress={() => onSelect(undefined)}
        >
          <Text style={[styles.text, selectedId === undefined && styles.selectedText]}>Todas</Text>
        </Pressable>
        {categories.map(category => (
          <Pressable
            key={category.id}
            style={state => [
              styles.button,
              selectedId === category.id && styles.selected,
              (state.pressed || Boolean((state as { hovered?: boolean }).hovered)) && styles.active,
            ]}
            onPress={() => onSelect(category.id)}
          >
            <Text style={[styles.text, selectedId === category.id && styles.selectedText]}>{category.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    paddingHorizontal: 18,
  },
  scrollContent: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: radii.sm,
    marginRight: 8,
    ...shadows.soft,
  },
  selected: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  active: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  text: {
    ...typography.body,
    color: colors.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  selectedText: {
    color: colors.surface,
    fontWeight: '800',
  },
});
