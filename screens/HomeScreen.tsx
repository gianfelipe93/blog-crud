import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useBlogs } from '../context/blogContext';
import BlogRow from '../components/BlogRow';

const HomeScreen = () => {
    const navigation = useNavigation()
    const { blogs, removeBlog } = useBlogs()

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('New')}>
                        <AntDesign name="plus" size={24} color="black" />
                    </TouchableOpacity>
                )
            }
        })
    }, [navigation])

    return (
        <View>
            <FlatList
                data={blogs}
                keyExtractor={(i) => i.title}
                renderItem={i => <BlogRow
                    title={i.item.title}
                    index={i.index}
                    onRemovePressed={() => removeBlog(i.index)}
                    onTitlePressed={() => navigation.navigate('Blog')}
                />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({

});

export default HomeScreen