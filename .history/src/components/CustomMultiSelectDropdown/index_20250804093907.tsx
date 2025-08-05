import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {colors, fontSize} from '../../services/utilities';
import Modal from 'react-native-modal';

type Option = {
  id: number;
  label: string;
};

type Props = {
  options: Option[];
  selected: number[];
  onChange: (selected: number[]) => void;
  placeholder?: string;
};

const CustomMultiSelectDropdown: React.FC<Props> = ({
  options,
  selected,
  onChange,
  placeholder = 'Select items',
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSelection = (id: number) => {
    if (selected.includes(id)) {
      onChange(selected.filter(item => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const selectedLabels = options
    .filter(opt => selected.includes(opt.id))
    .map(opt => opt.label)
    .join(', ');

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownText}>
          {selected.length > 0 ? selectedLabels : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={modalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        backdropOpacity={0.5}>
        <Pressable style={styles.modalContent}>
          <Text style={styles.title}>Select Items</Text>
          <ScrollView>
            {options.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.option}
                onPress={() => toggleSelection(option.id)}>
                <Text style={styles.optionLabel}>
                  {selected.includes(option.id) ? '✓ ' : ''}
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </Pressable>
      </Modal>
    </View>
  );
};

export default CustomMultiSelectDropdown;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: colors.inputBackground || '#2a2a2a',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  dropdownText: {
    fontFamily: 'Regular',
    fontSize: fontSize.smallM,
    color: '#fff',
    flexWrap: 'wrap',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    maxHeight: '80%',
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '600',
    color: colors.disabledBg,
    fontFamily: 'Bold',
  },
  option: {
    paddingVertical: 10,
    // borderBottomColor: '#eee',
    // borderBottomWidth: 1,
  },
  optionLabel: {
    fontSize: 16,
    color: colors.disabledBg,
    fontFamily: 'Regular',
  },
  doneButton: {
    marginTop: 16,
    backgroundColor: colors.appOrange,
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
