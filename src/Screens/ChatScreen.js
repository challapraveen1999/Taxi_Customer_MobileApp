import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatScreen = ({ navigation, route }) => {
    const driverName = route?.params?.driverName || 'Driver';
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: '1', text: 'I am on my way!', sender: 'driver', time: '10:00 AM' },
        { id: '2', text: 'Okay, I am waiting at the pickup point.', sender: 'user', time: '10:01 AM' },

    ]);

    const sendMessage = () => {
        if (message.trim().length > 0) {
            setMessages([...messages, { id: Date.now().toString(), text: message, sender: 'user', time: 'Now' }]);
            setMessage('');
        }
    };

    const renderMessage = ({ item }) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.driverBubble]}>
                <Text style={[styles.messageText, isUser ? styles.userText : styles.driverText]}>
                    {item.text}
                </Text>
                <Text style={styles.timeText}>{item.time}</Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <LinearGradient colors={['#80DEEA', '#0a6c7b']} style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />

                    {/* HEADER */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#FFF" />
                        </TouchableOpacity>
                        <View style={styles.headerInfo}>
                            <Text style={styles.headerTitle}>{driverName}</Text>
                            <Text style={styles.headerSub}>Toyota Camry • 7XRP920</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.callButton}
                            onPress={() => Linking.openURL('tel:0409889888988')}
                        >
                            <Ionicons name="call" size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>

                    {/* CHAT AREA */}
                    <View style={styles.chatArea}>
                        <FlatList
                            data={messages}
                            keyExtractor={item => item.id}
                            renderItem={renderMessage}
                            contentContainerStyle={styles.messageList}
                            showsVerticalScrollIndicator={false}
                        />

                        {/* INPUT AREA */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Type a message..."
                                placeholderTextColor="#474646"
                                value={message}
                                onChangeText={setMessage}
                            />
                            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                                <Ionicons name="send" size={20} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 15 },
    backButton: { padding: 5 },
    headerInfo: { flex: 1, marginLeft: 15 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
    headerSub: { fontSize: 13, color: '#E0F7FA', marginTop: 2 },
    callButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },

    chatArea: {
        flex: 1,
        backgroundColor: '#F5F6FA',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: 'hidden',
    },
    messageList: { padding: 20, paddingBottom: 10 },

    messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 16, marginBottom: 15 },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#0a6c7b',
        borderBottomRightRadius: 4,
    },
    driverBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    messageText: { fontSize: 15 },
    userText: { color: '#FFF' },
    driverText: { color: '#333' },
    timeText: { fontSize: 11, color: '#999', alignSelf: 'flex-end', marginTop: 5 },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#EAEAEA',
    },
    input: {
        flex: 1,
        height: 45,
        backgroundColor: '#F1F3F6',
        borderRadius: 22,
        paddingHorizontal: 20,
        fontSize: 15,
        color: '#333',
    },
    sendButton: {
        width: 45, height: 45, borderRadius: 22, backgroundColor: '#0a6c7b',
        justifyContent: 'center', alignItems: 'center', marginLeft: 10,
    },
});