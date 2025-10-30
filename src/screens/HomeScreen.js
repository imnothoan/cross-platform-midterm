import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { COLORS, SIZES, FONTS } from '../constants/theme';

const otherBackground = require('../assets/images/Mine_other.jpeg');

function HomeScreen({ navigation }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const subscriber = firestore().collection('users').onSnapshot(querySnapshot => {
            const usersData = [];
            querySnapshot.forEach(documentSnapshot => {
                usersData.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
            });
            setUsers(usersData);
            if (loading) setLoading(false);
        });
        return () => subscriber();
    }, [loading]);

    const handleDelete = (item) => {
        Alert.alert("Xac Nhan Xoa", `Ban co chac muon xoa nguoi choi "${item.username}"?`, [
            { text: "Huy" },
            { text: "Xoa", onPress: async () => {
                try {
                    await firestore().collection('users').doc(item.id).delete();
                    Alert.alert('Thanh Cong', 'Da xoa nguoi choi.');
                } catch (e) {
                    Alert.alert('Loi', 'Khong the xoa nguoi choi.');
                }
            }, style: 'destructive' }
        ]);
    };
    
    const handleLogout = () => { auth().signOut().then(() => navigation.replace('Login')); };

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Nguoi Choi</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.buttonText}>Thoat</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.userCard}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.userInfo}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.email}>{item.email}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={[styles.actionButton, {backgroundColor: COLORS.diamondBlue}]} onPress={() => navigation.navigate('EditUser', { user: item })}>
                    <Text style={styles.buttonText}>Sua</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, {backgroundColor: COLORS.dangerRed}]} onPress={() => handleDelete(item)}>
                    <Text style={styles.buttonText}>Xoa</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return <ImageBackground source={otherBackground} style={styles.background}><ActivityIndicator size="large" color={COLORS.white} /></ImageBackground>;
    }

    return (
        <ImageBackground source={otherBackground} style={styles.background}>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding, paddingBottom: SIZES.padding }}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, paddingTop: 40 },
    header: {
        paddingBottom: SIZES.padding,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        ...FONTS.h1,
        color: COLORS.white,
        textShadowColor: COLORS.black,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    logoutButton: {
        backgroundColor: COLORS.dirtBrown,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: COLORS.black,
    },
    userCard: {
        flexDirection: 'row',
        padding: SIZES.base * 2,
        marginBottom: SIZES.base * 2,
        backgroundColor: COLORS.transparentBlack,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.transparentWhite,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: SIZES.base * 2,
        borderWidth: 2,
        borderColor: COLORS.black,
    },
    userInfo: { flex: 1 },
    username: { ...FONTS.h3, color: COLORS.white },
    email: { ...FONTS.body, color: COLORS.stoneGray, fontSize: 12 },
    actions: { flexDirection: 'row' },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginLeft: 8,
        borderWidth: 2,
        borderColor: COLORS.black,
    },
    buttonText: {
        ...FONTS.body,
        color: COLORS.white,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
});

export default HomeScreen;