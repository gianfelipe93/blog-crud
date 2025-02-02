import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button } from 'react-native'
import { useBlogs, BlogProvider } from '../context/BlogContext'
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
    const isAdding = mode === 'add'

    const currentBlog: Blog = isAdding ? { title: '', body: '' } : getBlogByIndex(index);
    const [form, setForm] = useState<Blog>(currentBlog)

    const editForm = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    useLayoutEffect(() => {
        if (isViewing) {
            navigation.setOptions({
                headerRight: () => {
                    return (
                        <TouchableOpacity onPressIn={() => navigation.navigate('Edit', { index })}>
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
                <TextInput placeholder='title' editable={!isViewing} value={form.title} style={styles.title} onChangeText={(text: string) => editForm('title', text)}></TextInput>
                <TextInput placeholder='body' editable={!isViewing} value={form.body} style={styles.body} onChangeText={(text: string) => editForm('body', text)}></TextInput>
                {(isEditing || isAdding) && <Button title='SUBMIT' onPress={onSubmit} />}
            </View>
        </View>
    )
}

const inputStyling = {
    backgroundColor: 'lightgrey'
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    },
    panel: {
        borderColor: 'grey',
        borderWidth: 2,
        backgroundColor: 'white',
        padding: 10
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        ...inputStyling
    },
    body: {
        fontSize: 12,
        marginTop: 10,
        marginBottom: 10,
        ...inputStyling
    }
})

export default BlogForm
