import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useBlogs } from '../context/BlogContext';
import BlogRow from '../components/BlogRow';

const NoDataMessage = () => (
    <View style={styles.noBlogContainer}>
        <Text style={styles.noBlogText}>No blogs found.</Text>
    </View>
)

const HomeScreen = () => {
    const navigation = useNavigation()
    const { blogs, removeBlog } = useBlogs()

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <TouchableOpacity onPressIn={() => navigation.navigate('New', {})}>
                        <AntDesign name="plus" size={24} color="black" />
                    </TouchableOpacity>
                )
            }
        })
    }, [navigation])

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={blogs}
                keyExtractor={(i) => i.title}
                renderItem={i => <BlogRow
                    title={i.item.title}
                    body={i.item.body}
                    onRemovePressed={() => removeBlog(i.index)}
                    onTitlePressed={() => navigation.navigate('View', { index: i.index })}
                />
                }
                ListEmptyComponent={<NoDataMessage />}
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    noBlogContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noBlogText: {
        textAlign: 'center'
    }
});

export default HomeScreen