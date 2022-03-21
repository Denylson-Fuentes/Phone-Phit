import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';



const ApiKeys   = {
    // Each API key will have your IP address plus the API route
    // example : 'http://116.515.8.808.5002/predict
    login: 'IP/login',
    signup: 'IP/signup',
    details: 'IP/details',
    prediction: 'IP/predict',
    friends: 'IP/friends',
}

export default ApiKeys;