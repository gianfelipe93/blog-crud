import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button } from 'react-native'
import { useBlogs } from '../context/BlogContext'
import { useNavigation } from '@react-navigation/native'
import Entypo from '@expo/vector-icons/Entypo';
import { Blog } from '../types/Blog';

type FormType = {
    route: any
}


const BlogForm = ({ route }: FormType) => {
    const { getBlogByIndex, editBlog, addBlog } = useBlogs()
    const navigation = useNavigation()

    const { index, mode } = route.params

    const isEditing = mode === 'edit'
    const isViewing = mode === 'view'
    const isAdding = mode === 'create'

    const currentBlog: Blog = isEditing ? { title: '', body: '' } : getBlogByIndex(index);
    const [form, setForm] = useState<Blog>(currentBlog)

    const editForm = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    useLayoutEffect(() => {
        if (!isViewing) {
            navigation.setOptions({
                headerRight: () => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Edit', { index })}>
                            <Entypo name="pencil" size={24} color="black" />
                        </TouchableOpacity>
                    )
                }
            })
        }
    }, [])

    const onSubmit = () => {
        if (isEditing) {
            editBlog(index, form)
        } else {
            addBlog(form)
        }

        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <View style={styles.panel}>
                <TextInput editable={isEditing} value={form.title} style={styles.title} onChangeText={(text: string) => editForm('title', text)}></TextInput>
                <TextInput editable={isEditing} value={form.body} style={styles.body} onChangeText={(text: string) => editForm('body', text)}></TextInput>
                {(isEditing || isAdding) && <Button title='SUBMIT' onPress={onSubmit} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    },
    panel: {
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'grey'
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    body: {
        fontSize: 12
    }
})

export default BlogForm
