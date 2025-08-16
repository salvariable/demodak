import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { SortOption } from '../hooks/useStore';

interface Props {
  sortBy: SortOption;
  onSortChange: (sortOption: SortOption) => void;
}

const sortOptions = [
  { key: 'name-asc', label: 'Name (A-Z)' },
  { key: 'name-desc', label: 'Name (Z-A)' },
  { key: 'price-asc', label: 'Price (Low to High)' },
  { key: 'price-desc', label: 'Price (High to Low)' },
  { key: 'rating-asc', label: 'Rating (Low to High)' },
  { key: 'rating-desc', label: 'Rating (High to Low)' },
];

export const SortSelector = ({ sortBy, onSortChange }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.key === sortBy);
    return option ? option.label : 'Sort by';
  };

  const handleSortSelect = (sortOption: SortOption) => {
    onSortChange(sortOption);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>{getCurrentSortLabel()}</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort by</Text>
            <FlatList
              data={sortOptions}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    sortBy === item.key && styles.optionSelected
                  ]}
                  onPress={() => handleSortSelect(item.key as SortOption)}
                >
                  <Text style={[
                    styles.optionText,
                    sortBy === item.key && styles.optionTextSelected
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginHorizontal: 16,
    marginVertical: 4,
  },
  selectorText: {
    fontSize: 14,
    color: '#333',
  },
  arrow: {
    fontSize: 10,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  optionSelected: {
    backgroundColor: '#2196F3',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionTextSelected: {
    color: 'white',
    fontWeight: '500',
  },
});
