import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const OnboardingScreen = ({ navigation }) => {
    return (
        <LinearGradient colors={['#80DEEA', '#0a6c7b']} style={styles.container}>

            <View style={styles.imageWrapper}>
                <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop' }} 
                    style={styles.image} 
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Welcome to Ride Premium</Text>
                <Text style={styles.subtitle}>Experience the best ride-hailing service in town. Fast, reliable, and comfortable rides at your fingertips.</Text>
                
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.replace('SignIn')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageWrapper: {
        width: '80%',
        height: 300,
        borderRadius: 20,
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        backgroundColor: '#FFFFFF',
        marginBottom: 40,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        resizeMode: 'cover',
    },
    textContainer: {
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#E0F2FE',
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 24,
    },
    button: {
        marginTop: 40,
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: '#2563EB',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OnboardingScreen;