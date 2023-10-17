import React from 'react';
import { View, Pressable, Text, Alert, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


const ImageVideoDownload = () => {

    const VIDEO_LINK = "https://firebasestorage.googleapis.com/v0/b/rl-dbms.appspot.com/o/Ceiling%20Pool%2Fdirections%2Fla6xlj3?alt=media&token=5d37ce02-cec3-477f-a572-e31a343cdd64";
    const IMAGE_LINK = "https://firebasestorage.googleapis.com/v0/b/rl-dbms.appspot.com/o/Ceiling%20Pool%20dfhfd%20gh%2Fdirections%2Ft0sa8wv?alt=media&token=5a0c2ecd-1c4e-4dac-928f-e996d52615a9";

    // url is for link URL, filename is for the name that the file will be saved as. 
    const downloadFile = async (url, filename) => {
        // Requesting permissions
        const { granted } = await MediaLibrary.requestPermissionsAsync();

        if (!granted) {
            Alert.alert('Permission failed', 'You need to give permission to save files');
            return;
        }
        console.log("permission granted");

        const fileUri = FileSystem.cacheDirectory + filename; // change to cacheDirectory to store file temporarily

        FileSystem.downloadAsync(url, fileUri)
            .then(async ({ uri }) => {
                // save the downloaded file to the phone media library
                const asset = await MediaLibrary.createAssetAsync(uri);
                console.log(asset);

                Alert.alert('Success', `File saved to camera roll`);
            })
            .catch(error => {
                console.error(error);
                Alert.alert('Error', 'Could not save the file');
            });
    };

    return (
        <View>
            <Text>Image + Video Download</Text>
            <Pressable style={styles.downloadButton} onPress={() => downloadFile(IMAGE_LINK, 'downloadedImage.jpg')}>
                <Text>Download Image</Text>
            </Pressable>
            <Pressable style={styles.downloadButton} onPress={() => downloadFile(VIDEO_LINK, 'downloadedVideo.mp4')}>
                <Text>Download Video</Text>
            </Pressable>
        </View>
    );
};

styles = StyleSheet.create({
    downloadButton: {
        backgroundColor: 'green',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ImageVideoDownload;