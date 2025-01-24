import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

type BlogRowType = {
    title: string;
    body: string;
    onRemovePressed: VoidFunction;
    onTitlePressed: VoidFunction
}

const BlogRow = ({ title, body, onRemovePressed, onTitlePressed }: BlogRowType) => {
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={onTitlePressed}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={{ ...styles.body, width: screenWidth * .8 }} numberOfLines={1} ellipsizeMode='tail'>{body}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onRemovePressed}><AntDesign name="delete" size={24} color="black" /></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'lightgrey',
        padding: 5,
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    body: {
        fontSize: 10,
    }
});

export default BlogRow
