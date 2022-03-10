import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

function UploadImage(){
    const [image, setImage] = useState(null);
    const addImage = async() =>{
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(JSON.stringify(_image));

        if(!_image.cancelled){
            setImage(_image.uri);
        }
    };

    // const checkForCameraRollPersmission = async() => {
    //     const {status} = await ImagePicker.getMediaLibraryPermissionsAsync();
    //     if (status !== 'granted'){
    //         alert("Please grant camera roll permission inside your system's settings")
    //     }else{
    //         console.log('Media Permission are granted')
    //     }
    // }

    // useEffect(() =>{
    //     checkForCameraRollPersmission()
    // }, [])

    return (
        <View style = {styles.container}>
            {
                image && <Image source = {{uri: image}} style = {{width: 200, height: 200}}/>
            }

            <View style = {styles.buttoncontainer}>
                <TouchableOpacity onPress={addImage}  style = {styles.uploadButton}>
                    <Text> {image ? 'Edit' : 'Upload'} Image</Text>
                    <AntDesign name = 'camera' size = {20} color = 'black' />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        elevation:2,
        height: 200,
        width: 200,
        backgroundColor: '#00FFFF',
        position: 'relative',
        borderRadius: 999,
        overflow: 'hidden'
    },

    buttoncontainer:{
        opacity: 0.8,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        width: '100%',
        height: '25%',
    },

    uploadButton:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default UploadImage;