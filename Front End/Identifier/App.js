import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler';
import LoginScreen from './Components/Login';
import SignUp from './Components/SignUp';
import PredictionScreen from './Components/Prediction';
import HomeScreen from './Components/Home';
import Friend from './Components/Friends';
import { IconButton } from 'react-native-paper'


const Stack = createStackNavigator();

export default function App() {

  return(
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Home'>

        <Stack.Screen
          name = 'Login'
          component = {LoginScreen}
        />

        <Stack.Screen
          name = 'Sign Up'
          component= {SignUp}
        />
        
        <Stack.Screen 
          name = 'Home' 
          component = {HomeScreen} 
        />

        <Stack.Screen 
          name = 'Friends'
          component = {Friend}
        />

        <Stack.Screen 
          name = 'Prediction'
          component = {PredictionScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  top:{
    backgroundColor: '#008080',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },

  navigator:{
    backgroundColor: '#000080',
    flexDirection: 'row',
  },

  nav_text:{
    color: '#ffffff',
    margin: 10,
    fontSize: 20,
    height: 30,
  },

  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightcorner:{
    flexDirection: 'row'
  }
});

// options={ ({navigation}) => ({
//   headerRight: () => (
//     <View style = {styles.rightcorner}>
//       <Text style = {{top: 13, left: 12, fontSize: 18}}>Predictions</Text>
//       <IconButton
//         icon = 'arrow-right'
//         onPress={() => navigation.navigate('Prediction')}
//         color="#4169e1"
//       />
//     </View>
//     ),
// })}

// options={ ({navigation}) => ({
//   headerRight: () => (
//     <View style = {styles.rightcorner}>
//       <Text style = {{top: 13, left: 12, fontSize: 18}}>Friends</Text>
//       <IconButton
//         icon = 'arrow-right'
//         onPress={() => console.log(this)}
//         color="#4169e1"
//       />
//     </View>
//     ),
// })}