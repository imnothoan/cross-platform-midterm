import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Image, Alert, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import RNFS from 'react-native-fs';
import { COLORS, SIZES, FONTS } from '../constants/theme';

const otherBackground = require('../assets/images/Mine_other.jpeg');

function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo', maxWidth: 600, maxHeight: 600 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) Alert.alert('Loi', 'Khong the chon anh.');
      else if (response.assets && response.assets.length > 0) setImageUri(response.assets[0].uri);
    });
  };

  const handleRegister = async () => {
    if (!email || !password || !username || !imageUri) {
      Alert.alert('Loi', 'Vui long dien day du thong tin va chon anh.');
      return;
    }
    setProcessing(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const imageBase64 = await RNFS.readFile(imageUri, 'base64');
      const imageForDb = `data:image/jpeg;base64,${imageBase64}`;
      await firestore().collection('users').doc(user.uid).set({
        username: username,
        email: email,
      
        image: imageForDb,
      });
      setProcessing(false);
      Alert.alert('Thanh Cong', 'Tao tai khoan thanh cong!', [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
    } catch (error) {
      setProcessing(false);
      Alert.alert('Loi Dang Ky', error.message);
    }
  };

  return (
    <ImageBackground source={otherBackground} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.avatarPicker}>
          {imageUri ? <Image source={{ uri: imageUri }} style={styles.avatar} /> : <Text style={styles.avatarPlaceholderText}>Chon Skin</Text>}
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Ten Nhan Vat..." value={username} onChangeText={setUsername} placeholderTextColor={COLORS.placeholder} />
        <TextInput style={styles.input} placeholder="Email..." value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor={COLORS.placeholder} />
        <TextInput style={styles.input} placeholder="Password..." value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor={COLORS.placeholder} />
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={processing}>
          {processing ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.buttonText}>Tao Moi</Text>}
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

export default RegisterScreen;