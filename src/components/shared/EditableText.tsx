// src/components/shared/EditableText.tsx
import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface EditableTextProps extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
    value,
    onChangeText,
    placeholder,
    ...rest
}) => {
    return (
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#999"
            {...rest}
        />
    );
};

export default EditableText;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
});
