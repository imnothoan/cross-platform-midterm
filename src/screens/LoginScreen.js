import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { COLORS, SIZES, FONTS } from '../constants/theme';

const loginBackground = require('../assets/images/Mine_Login.jpeg');

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Loi', 'Vui long nhap email va mat khau.');
            return;
        }
        setLoading(true);
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.replace('Home');
            })
            .catch(error => {
                setLoading(false);
                Alert.alert('Loi Dang Nhap', 'Email hoac mat khau khong dung.');
            });
    };

    return (
        <ImageBackground source={loginBackground} style={styles.background}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Text style={styles.title}>MINE-LOGIN</Text>
                <Text style={styles.registerText}> Chao mung ban den voi trang quan li :)</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Email..."
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor={COLORS.placeholder}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password..."
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor={COLORS.placeholder}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                    {loading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.buttonText}>Vao</Text>}
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Chua co tai khoan?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerLink}> Tao tai khoan</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: SIZES.padding,
        backgroundColor: COLORS.transparentBlack,
    },
    title: {
        ...FONTS.h1,
        fontSize: 40,
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: SIZES.padding * 2,
        textShadowColor: COLORS.black,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
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
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SIZES.padding,
    },
    registerText: {
        ...FONTS.body,
        color: COLORS.white,
    },
    registerLink: {
        ...FONTS.body,
        color: COLORS.diamondBlue,
    },
});

export default LoginScreen;