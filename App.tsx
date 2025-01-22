import * as React from 'react'
import { createStaticNavigation, StaticParamList } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import BlogForm from './components/BlogForm';

type RootType = {
  View: { mode?: 'view' | 'add' | 'edit'; index: number };
  Edit: { mode?: 'view' | 'add' | 'edit'; index: number };
  New: { mode?: 'view' | 'add' | 'edit' };
  Home: undefined
}


const Root = createNativeStackNavigator<RootType>({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: "Blog Posts"
      }
    },
    New: {
      screen: BlogForm,
      initialParams: { mode: 'add' }
    },
    Edit: {
      screen: BlogForm,
      initialParams: { mode: 'edit', index: -1 }
    },
    View: {
      screen: BlogForm,
      initialParams: { mode: 'view', index: -1 }
    }
  },
  initialRouteName: "Home",
  screenOptions: {
    headerTitleAlign: "center"
  }
})


const Navigation = createStaticNavigation(Root);

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootType { }
  }
}

const App = () => (
  <Navigation />
)

export default App
