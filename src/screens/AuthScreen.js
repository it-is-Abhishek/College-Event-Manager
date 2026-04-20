import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { User, Lock, Mail, BookOpen, Shield } from 'lucide-react-native';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';


const AuthScreen = () => {
    const { signIn } = useUser();
    const [authMode, setAuthMode] = useState('student-login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const isAdminMode = authMode === 'admin-login';
    const isLogin = authMode !== 'student-signup';

    const handleAuth = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        const isAdmin = isAdminMode;
        const isStudentSignup = authMode === 'student-signup';

        if (isAdmin && (email !== 'admin@college.edu' || password !== 'admin')) {
            Alert.alert('Admin Login Failed', 'Use the configured admin credentials to access admin tools.');
            return;
        }

        if (isStudentSignup && !name) {
            Alert.alert('Error', 'Please enter your name');
            return;
        }

        const userObj = {
            name: isAdmin ? 'Admin User' : name || email.split('@')[0],
            email,
            isAdmin,
        };

        if (!isAdmin && isStudentSignup) {
            if (rollNo) userObj.rollNumber = rollNo;
        }

        const result = await signIn(userObj);

        if (!result.success) {
            Alert.alert('Sign In Failed', result.message || 'Please try again');
        }
    };

    const switchMode = (mode) => {
        setAuthMode(mode);
        setEmail('');
        setPassword('');
        setName('');
        setRollNo('');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        <BookOpen size={40} color="#007AFF" />
                    </View>
                    <Text style={styles.appName}>CampusHub</Text>
                    <Text style={styles.tagline}>College Event Manager</Text>
                </View>

                <View style={styles.formContainer}>
                    {!isAdminMode && (
                        <TouchableOpacity onPress={() => switchMode('admin-login')} style={styles.adminEntryButton}>
                            <Shield size={18} color="#007AFF" />
                            <Text style={styles.adminEntryButtonText}>Admin Login</Text>
                        </TouchableOpacity>
                    )}

                    <Text style={styles.headerText}>
                        {isAdminMode ? 'Admin Login' : isLogin ? 'Welcome Back' : 'Create Account'}
                    </Text>
                    <Text style={styles.subHeaderText}>
                        {isAdminMode ? 'Sign in to manage campus events and participants.' : 'Access your campus event account.'}
                    </Text>

                    {authMode === 'student-signup' && (
                        <>
                            <View style={styles.inputContainer}>
                                <User size={20} color="#666" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Full Name"
                                    value={name}
                                    onChangeText={setName}
                                    autoCapitalize="words"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.hashIcon}>#</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Roll Number (Optional)"
                                    value={rollNo}
                                    onChangeText={setRollNo}
                                />
                            </View>
                        </>
                    )}

                    <View style={styles.inputContainer}>
                        {isAdminMode ? <Shield size={20} color="#666" style={styles.inputIcon} /> : <Mail size={20} color="#666" style={styles.inputIcon} />}
                        <TextInput
                            style={styles.input}
                            placeholder={isAdminMode ? 'Admin Email' : 'Email Address'}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Lock size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
                        <Text style={styles.authButtonText}>
                            {isAdminMode ? 'Login as Admin' : isLogin ? 'Login' : 'Sign Up'}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.modeActions}>
                        {authMode === 'student-login' && (
                            <TouchableOpacity onPress={() => switchMode('student-signup')} style={styles.switchButton}>
                                <Text style={styles.switchText}>{"Don't have an account? Sign Up"}</Text>
                            </TouchableOpacity>
                        )}

                        {authMode !== 'student-login' && (
                            <TouchableOpacity onPress={() => switchMode('student-login')} style={styles.switchButton}>
                                <Text style={styles.switchText}>Back to Student Login</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {authMode === 'student-signup' && (
                        <View style={styles.adminCard}>
                            <View style={styles.adminCardHeader}>
                                <Shield size={18} color="#007AFF" />
                                <Text style={styles.adminCardTitle}>Admin access</Text>
                            </View>
                            <Text style={styles.adminCardText}>
                                The admin login button is available at the top of this card for event management access.
                            </Text>
                        </View>
                    )}

                    {isAdminMode && (
                        <TouchableOpacity
                            onPress={() => {
                                setEmail('admin@college.edu');
                                setPassword('admin');
                            }}
                            style={styles.adminHint}
                        >
                            <Text style={styles.adminHintText}>Use demo admin credentials</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    tagline: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    formContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    adminEntryButton: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: '#F2F8FF',
        borderWidth: 1,
        borderColor: '#D7E8FF',
        marginBottom: 16,
    },
    adminEntryButtonText: {
        color: '#007AFF',
        fontWeight: '700',
        fontSize: 14,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
        color: '#333',
    },
    subHeaderText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    inputIcon: {
        marginRight: 10,
    },
    hashIcon: {
        fontSize: 20,
        color: '#666',
        marginRight: 14,
        marginLeft: 4,
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    authButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    authButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    switchButton: {
        marginTop: 16,
        alignItems: 'center',
    },
    switchText: {
        color: '#007AFF',
        fontSize: 14,
    },
    modeActions: {
        marginTop: 4,
    },
    adminCard: {
        marginTop: 24,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#F2F8FF',
        borderWidth: 1,
        borderColor: '#D7E8FF',
    },
    adminCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    adminCardTitle: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '700',
        color: '#1F3B63',
    },
    adminCardText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#46617F',
    },
    adminHint: {
        marginTop: 20,
        alignItems: 'center',
    },
    adminHintText: {
        color: '#999',
        fontSize: 12,
        fontStyle: 'italic',
    }
});

export default AuthScreen;
