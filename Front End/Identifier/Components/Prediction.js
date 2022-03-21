import React,{ Component, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import axios from 'axios';
import * as FS from 'expo-file-system'
import ApiKeys from './Api';


function PredictionScreen (){

  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [hasAudioPermission, setHasAudioPermission] = useState(null)
  const [camera, setCamera] = useState(null)
  const [record, setRecord] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const video = useRef(null)
  const [status, setStatus] = useState({})
  const [data, setData] = useState('None')
  

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === 'granted');

    })();
  }, []);


  const getPrediction = async() =>{
    console.log("Called get Predictions")
    await FS.uploadAsync(ApiKeys.prediction,  record, {
      headers:{
        "content-type": "video/mp4"
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT
    })
    .then(response =>{
      response.body
    })
    .then(data =>{
      console.log(data.message)
    })
    

  }

  const takeVideo = async () => {
    if(camera){
        const data = await camera.recordAsync({
          maxDuration:5,
        })
        setRecord(data.uri);
        console.log(data.uri);
    }
  }

  const stopVideo = async () => {
    this.state.camera.stopRecording();
  }


  if ( hasCameraPermission === null || hasAudioPermission == null ) {
    return <View/>
  }
  if ( hasCameraPermission === false || hasAudioPermission === false ) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#4169e1'}}>
          <View style = {styles.predict_title}>
              <Text style = {{fontSize: 35}} >Prediction Screen</Text>
          </View>

        <View style={styles.cameraContainer}>
            <Camera 
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={type}
            ratio={'16:9'} />
        </View>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: record,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <View style={styles.buttons}>
          <Button
            color="white"
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          />
        </View>
        <Button
            title="Flip Video"
            color="white"
            onPress={() => {
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              ;
            }}>
          </Button>
          <Button color="white" title="Take video" onPress={() => takeVideo()} />
          <Button color="white" title="Stop Video" onPress={() => stopVideo()} />
          <Button color="white" title="Predict" onPress={() => getPrediction()} />
          <Text style = {styles.prediction} >{data}</Text>
          
    </View>
  );
}

export default PredictionScreen;

const styles = StyleSheet.create({
  predict_screen:{
      backgroundColor: '#4169e1',
      height: '100%',
  },

  predict_title:{
      backgroundColor: 'white',
      color: '#ffffff',
      alignItems: 'center',
      height: 40,
      margin: 20,
  },

  camera_container: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'row'
  },

  fixedRatio:{
      flex:1,
      aspectRatio: 1
  },

  video:{
      alignSelf: 'center',
      width: 350,
      height: 220
  },

  buttons:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
  },
  prediction:{
    backgroundColor: 'white',
    alignSelf: 'center'
  }
})