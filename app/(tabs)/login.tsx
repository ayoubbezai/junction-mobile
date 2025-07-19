import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { authServices } from '../../services/authServices';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const primary = '#FB3026';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    console.log('handleLogin called with email:', email);
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    console.log('Starting login process...');
    setLoading(true);
    setError('');
    
    try {
      console.log('Calling authServices.login...');
      const result = await authServices.login(email, password);
      console.log('authServices.login result:', result);
      
      if (result.success) {
        console.log('Login successful, navigating to dashboard');
        router.replace('/(tabs)/dashboard');
      } else {
        console.log('Login failed:', result.error);
        setError(result.error);
      }
    } catch (error) {
      console.error('Login error caught:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.header}>
        <Image source={require('../../assets/images/fishtaLogo.webp')} style={styles.logo} />
        <Text style={styles.title}>Fishta</Text>
        <Text style={styles.subtitle}>Sign in to monitor and protect your ponds</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail" size={20} color={primary} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed" size={20} color={primary} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#aaa" />
          </TouchableOpacity>
        </View>
        {error ? <Text style={{ color: primary, marginTop: 8, textAlign: 'center' }}>{error}</Text> : null}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
          <Text style={styles.loginBtnText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 32,
  },
  logo: {
    width: width * 0.18,
    height: width * 0.18,
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: primary,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
  },
  form: {
    paddingHorizontal: 32,
  },
  label: {
    color: primary,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 16,
    fontSize: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF6F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#FAD2CF',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#222',
  },
  loginBtn: {
    backgroundColor: primary,
    borderRadius: 10,
    marginTop: 28,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
  },
}); 