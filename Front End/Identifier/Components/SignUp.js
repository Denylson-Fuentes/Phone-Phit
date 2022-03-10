import React,{ Component } from 'react';
import { Text, View, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


export default class SignUp extends Component {

    constructor(){
        super()
        this.state = {
            username: '',
            confirmUsername: '',
            password: '',
            confirmPassword: '',
            height_feet: null,
            height_inches: null,
            weight: null,
            sign: '',
            bench_personal: null,
            squat_personal: null,
            curl_personal: null,
            mile_minute: null,
            mile_seconds: null,
            workout_total_hours: null,
            workout_total_minutes: null,
            calories_taken: null,
            last_meal: '',
            last_fruit: '',
            last_vegetable: '',
            message: ''
        }
        this.SignUp = this.SignUp.bind(this)
    }

    SignUp = () =>{
        const usernameVal = this.state.username;
        const passwordVal = this.state.password;
        // this.props.navigation.navigate('Home')
        console.log(this.state.username)
        console.log(this.state.confirmUsername)
        console.log(this.state.password)
        console.log(this.state.confirmPassword)

        if(this.state.username == this.state.confirmUsername){
            if(this.state.password == this.state.confirmPassword){

                axios.post("http://192.168.1.111:5000/signup",
                    {
                        username : this.state.username,
                        password: this.state.password,
                        height_feet: this.state.height_feet,
                        height_inches: this.state.height_inches,
                        weight: this.state.weight,
                        sign: this.state.sign,
                        bench_personal: this.state.bench_personal,
                        squat_personal: this.state.squat_personal,
                        curl_personal: this.state.curl_personal,
                        mile_minute: this.state.mile_minute,
                        mile_seconds: this.state.mile_seconds,
                        workout_total_hours: this.state.workout_total_hours,
                        workout_total_minutes: this.state.workout_total_minutes,
                        calories_taken: this.state.calories_taken,
                        last_meal: this.state.last_meal,
                        last_fruit: this.state.last_fruit,
                        last_vegetable: this.state.last_vegetable,
                        
                    })
                    .then((response) =>{
                        console.log(response.data.message)
                        if(response.data.message == 'Signed Up'){
                            this.props.navigation.navigate('Home', {name: this.state.username})
                        }
                        else{
                            this.setState({message : response.data.message})
                        }
                    })
                    .catch((err) =>{
                        console.log(err)
                    })
            }
            else{
                this.setState({message: 'Passwords Do Not Match'})
            }
        }
        else{
            this.setState({message : 'Usernames Do Not Match'})
        }
        
        // this.props.navigation.navigate('Home')
    }

    render() {
        return(
            <View style = {styles.loginscreen}>
                <ScrollView>

                    <View style = {styles.loginError}>
                        <Text style = {styles.errorMessage}>{this.state.message}</Text>
                    </View>

                    <TextInput 
                        value = {this.state.username}
                        placeholder = {'Username'}
                        style = {styles.usernameText}
                        onChangeText={(username) => this.setState({username})}
                        autoCapitalize = {'none'}
                        keyboardType = {'email-address'}
                    />

                    <TextInput 
                        value = {this.state.confirmUsername}
                        placeholder = {'Confirm Username'}
                        style = {styles.usernameText}
                        onChangeText={(text) => this.setState({confirmUsername : text})}
                        autoCapitalize = {'none'}
                        keyboardType = {'email-address'}
                    />

                    <TextInput 
                        value = {this.state.password}
                        style = {styles.passwordText}
                        placeholder = {'Password'}
                        onChangeText = {(password) => this.setState({password})}
                        secureTextEntry
                    />

                    <TextInput 
                        value = {this.state.confirmPassword}
                        style = {styles.passwordText}
                        placeholder = {'Confirm Password'}
                        onChangeText = {(text) => this.setState({confirmPassword : text})}
                        secureTextEntry
                    />

                    <TextInput 
                        value = {this.state.height_feet}
                        placeholder = {'Height Feet'}
                        style = {styles.usernameText}
                        onChangeText={(height_feet) => this.setState({height_feet})}
                        autoCapitalize = {'none'}
                        keyboardType = {'email-address'}
                    />

                    <TextInput 
                        value = {this.state.height_inches}
                        placeholder = {'Height Inches'}
                        style = {styles.usernameText}
                        onChangeText={(height_inches) => this.setState({height_inches})}
                        autoCapitalize = {'none'}
                        keyboardType = {'number-pad'}
                    />

                    <TextInput 
                        value = {this.state.weight}
                        placeholder = {'Weight(lbs)'}
                        style = {styles.usernameText}
                        onChangeText={(weight) => this.setState({weight})}
                        autoCapitalize = {'none'}
                        keyboardType = {'number-pad'}
                    />

                    <TextInput 
                        value = {this.state.sign}
                        placeholder = {'Sign'}
                        style = {styles.usernameText}
                        onChangeText={(sign) => this.setState({sign})}
                        autoCapitalize = {'none'}
                        keyboardType = {'email-address'}
                    />

                    <TextInput 
                        value = {this.state.bench_personal}
                        placeholder = {'Bench Personal (lbs)'}
                        style = {styles.usernameText}
                        onChangeText={(bench_personal) => this.setState({bench_personal})}
                        autoCapitalize = {'none'}
                        keyboardType = {'number-pad'}
                    />

                    <TextInput 
                        value = {this.state.squat_personal}
                        placeholder = {'Squat Personal(lbs)'}
                        style = {styles.usernameText}
                        onChangeText={(squat_personal) => this.setState({squat_personal})}
                        autoCapitalize = {'none'}
                        keyboardType = {'number-pad'}
                    />

                    <TextInput 
                        value = {this.state.curl_personal}
                        placeholder = {'Curl Personal (lbs)'}
                        style = {styles.usernameText}
                        onChangeText={(curl_personal) => this.setState({curl_personal})}
                        autoCapitalize = {'none'}
                        keyboardType = {'number-pad'}
                    />

                    <TextInput 
                        value = {this.state.mile_minute}
                        placeholder = {'Best Mile Time (minute)'}
                        style = {styles.usernameText}
                        onChangeText={(mile_minute) => this.setState({mile_minute})}
                        autoCapitalize = {'none'}
                        keyboardType = {'number-pad'}
                    />

                    <TextInput 
                        value = {this.state.mile_seconds}
                        placeholder = {'Best Mile Time (seconds)'}
                        style = {styles.usernameText}
                        onChangeText={(mile_seconds) => this.setState({mile_seconds})}
                        autoCapitalize = {'none'}
                        keyboardType = {'number-pad'}
                    />

                    <TextInput 
                        value = {this.state.workout_total_hours}
                        placeholder = {'Time Spend Working out (Hours)'}
                        style = {styles.usernameText}
                        onChangeText={(workout_total_hours) => this.setState({workout_total_hours})}
                        autoCapitalize = {'none'}
                        keyboardType = {'number-pad'}
                    />

                    <TextInput 
                        value = {this.state.workout_total_minutes}
                        placeholder = {'Time Spend Working out (minutes)'}
                        style = {styles.usernameText}
                        onChangeText={(workout_total_minutes) => this.setState({workout_total_minutes})}
                        autoCapitalize = {'none'}
                        keyboardType = {'number-pad'}
                    />

                    <TextInput 
                        value = {this.state.calories_taken}
                        placeholder = {'Calorie Intake'}
                        style = {styles.usernameText}
                        onChangeText={(calories_taken) => this.setState({calories_taken})}
                        autoCapitalize = {'none'}
                        keyboardType = {'number-pad'}
                    />

                    <TextInput 
                        value = {this.state.last_meal}
                        placeholder = {'Last Meal'}
                        style = {styles.usernameText}
                        onChangeText={(last_meal) => this.setState({last_meal})}
                        autoCapitalize = {'none'}
                        keyboardType = {'email-address'}
                    />

                    <TextInput 
                        value = {this.state.last_fruit}
                        placeholder = {'Last Fruit'}
                        style = {styles.usernameText}
                        onChangeText={(last_fruit) => this.setState({last_fruit})}
                        autoCapitalize = {'none'}
                        keyboardType = {'email-address'}
                    />

                    <TextInput 
                        value = {this.state.last_vegetable}
                        placeholder = {'Last Vegetable'}
                        style = {styles.usernameText}
                        onChangeText={(last_vegetable) => this.setState({last_vegetable})}
                        autoCapitalize = {'none'}
                        keyboardType = {'email-address'}
                    />

                    <View style = {styles.loginButton}>
                        <TouchableOpacity onPress={this.SignUp}>
                            <Text>{'Sign Up'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {styles.signupButton}>
                        <Text style = {styles.loginText}>
                            {'Already have an account? '}
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style = {styles.loginText}>{'Log In'}</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    loginscreen :{
        backgroundColor: '#00bfff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    usernameText:{
        backgroundColor: '#4169e1',
        color: '#fff',
        borderRadius: 30,
        width: 200,
        height: 45,
        marginBottom: 20,
        alignItems: 'center'
    },

    passwordText:{
        backgroundColor: '#4169e1',
        color: '#fff',
        borderRadius: 30,
        width: 200,
        height: 45,
        marginBottom: 20,
        alignItems: 'center'
    },

    loginButton:{
        height: 30,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    signupButton:{
        width: "100%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#00008b",
        
    },

    loginText:{
        color: '#fff',
        alignItems: 'center'
    },

    loginError :{
        marginBottom: 25,
    },

    errorMessage:{
        color: 'red',
        fontSize: 20
    }
})