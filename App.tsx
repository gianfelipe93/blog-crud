import * as React from 'react'
import { createStaticNavigation, StaticParamList } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';

const Root = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: "Blog Posts"
      }
    }
  },
  initialRouteName: "Home",
  screenOptions: {
    headerTitleAlign: "center"
  }
})

const Navigation = createStaticNavigation(Root);

type RootStackParamList = StaticParamList<typeof Root>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

const App = () => (
  <Navigation />
)

export default App
