import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Image, Alert, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import RNFS from 'react-native-fs';
import { COLORS, SIZES, FONTS } from '../constants/theme';

const otherBackground = require('../assets/images/Mine_other.jpeg');

function EditUserScreen({ route, navigation }) {
    const { user } = route.params;
    const [username, setUsername] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [newImageSelected, setNewImageSelected] = useState(false);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setImageUri(user.image);
        }
    }, [user]);

    const handleChoosePhoto = () => {
        launchImageLibrary({ mediaType: 'photo', maxWidth: 600, maxHeight: 600 }, (response) => {
            if (response.didCancel) return;
            if (response.errorCode) Alert.alert('Loi', 'Khong the chon anh.');
            else if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri);
                setNewImageSelected(true);
            }
        });
    };

    const handleUpdate = async () => {
        if (!username) {
            Alert.alert('Loi', 'Ten nhan vat khong duoc de trong.');
            return;
        }
        setProcessing(true);
        try {
            const dataToUpdate = { username: username };
            if (newImageSelected && imageUri) {
                const imageBase64 = await RNFS.readFile(imageUri, 'base64');
                dataToUpdate.image = `data:image/jpeg;base64,${imageBase64}`;
            }
            await firestore().collection('users').doc(user.id).update(dataToUpdate);
            setProcessing(false);
            Alert.alert('Thanh Cong', 'Cap nhat thong tin thanh cong!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
        } catch (error) {
            setProcessing(false);
            Alert.alert('Loi Cap Nhat', error.message);
        }
    };

    return (
        <ImageBackground source={otherBackground} style={styles.background}>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity onPress={handleChoosePhoto} style={styles.avatarPicker}>
                    {imageUri ? <Image source={{ uri: imageUri }} style={styles.avatar} /> : <Text style={styles.avatarPlaceholderText}>Chon Skin</Text>}
                </TouchableOpacity>
                
                <Text style={styles.label}>Ten Nhan Vat</Text>
                <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholderTextColor={COLORS.placeholder} />

                <Text style={styles.label}>Email (Khong The Doi)</Text>
                <TextInput style={[styles.input, styles.disabledInput]} value={user.email} editable={false} />
                
                <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={processing}>
                    {processing ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.buttonText}>Luu Thay Doi</Text>}
                </TouchableOpacity> 
               
                
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: SIZES.padding,
    },
    avatarPicker: {
        width: 100,
        height: 100,
        backgroundColor: COLORS.stoneGray,
        alignSelf: 'center',
        marginBottom: SIZES.padding,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: COLORS.black,
    },
    avatar: { width: '100%', height: '100%' },
    avatarPlaceholderText: { ...FONTS.body, color: COLORS.white },
    label: { ...FONTS.h3, color: COLORS.white, marginBottom: SIZES.base, textShadowColor: COLORS.black, textShadowOffset: {width: 1, height: 1}, textShadowRadius: 1 },
    input: {
        ...FONTS.body,
        backgroundColor: COLORS.stoneGray,
        height: 50,
        paddingHorizontal: SIZES.padding,
        marginBottom: SIZES.base * 2,
        color: COLORS.white,
        borderWidth: 3,
        borderColor: COLORS.black,
    },
    disabledInput: {
        backgroundColor: '#505050'
    },
    button: {
        backgroundColor: COLORS.grassGreen,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZES.base * 2,
        borderWidth: 3,
        borderColor: COLORS.black,
        borderBottomWidth: 6,
    },
    buttonText: {
        ...FONTS.h3,
        color: COLORS.white,
        textShadowColor: COLORS.black,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
});

export default EditUserScreen;
