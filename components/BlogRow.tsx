import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

type BlogRowType = {
    title: string;
    index: number;
    onRemovePressed: VoidFunction;
    onTitlePressed: VoidFunction
}

const BlogRow = ({ title, index, onRemovePressed, onTitlePressed }: BlogRowType) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onTitlePressed}><Text>{title}</Text></TouchableOpacity>
            <TouchableOpacity onPress={onRemovePressed}><AntDesign name="delete" size={24} color="black" /></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        justifyContent: 'space-between'
    }
});

export default BlogRow
