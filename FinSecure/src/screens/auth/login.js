import React, {useContext, useState} from 'react';
import {
    StyleSheet,
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Colors, Typography } from '../../styles';
import AuthContext from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import axios from 'axios';
import { backendUrl } from '../../dbHelpers/transactionHelper';

const Login = ({navigation}) => {

    const {authContext} = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    const __register = async () => {
        if (username !== '' && email !== '' && password!=='') {
            const options = {
                method: 'POST',
                url: `${backendUrl}/auth/register/`,
                data: {
                    username,
                    email,
                    password
                }
            }

            try {
                const response = await axios.request(options);
                if (response.status===200) {
                    __login();
                }
            } catch (error) {
                setPassword('');
                setEmail('');
            }
        }
        else {
            Alert.alert('Sorry !', 'Please, enter valid informations.');
        }
    }

    // Login
    const __login = async () => {
        if (email !== '' && password!=='') {
            const options = {
                method: 'POST',
                url: `${backendUrl}/auth/login/`,
                data: {
                    email,
                    password
                }
            }

            try {
                const response = await axios.request(options);
                if (response.status===200) {
                    const res = await axios.get(`${backendUrl}/auth/${email}`);
                    const data = res.data;
                    const { user, userInfo } = data;
                    const userDetails = {
                        user,
                        userInfo
                    }
                    authContext.signIn(userDetails);
                }
            } catch (error) {
                setPassword('');
                setEmail('');
            }
        }
        else {
            Alert.alert('Sorry !', 'Please, enter valid informations.');
        }
    }

    return (
        <View style={styles.container}>
            {/* Body */}
            <View style={styles.bodyContainer} >
                <View style={styles.rowContainer}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.goBack()} >
                            <Icon name="arrow-left" color={Colors.WHITE} size={25} />
                    </TouchableOpacity>
                    <Text style={[Typography.H1, {marginLeft: 10, color: Colors.WHITE}]}>Login</Text>
                </View>

                {/* Username */}
                {!isLogin && <View style={{marginTop: 20}}>
                    <Text style={[Typography.TAGLINE, {color: Colors.GRAY_DARK}]}>Username</Text>
                    <TextInput
                        value={username}
                        placeholder='John Doe'
                        keyboardType='name-phone-pad'
                        onChangeText={(text) => setUsername(text)}
                        style={[styles.input, Typography.BODY]}
                        placeholderTextColor={Colors.GRAY_MEDIUM} />
                </View>}

                {/* Lastname */}
                <View style={{marginTop: 20}}>
                    <Text style={[Typography.TAGLINE, {color: Colors.GRAY_DARK}]}>Email</Text>
                    <TextInput
                        value={email}
                        placeholder='johndoe@email.com'
                        keyboardType='name-phone-pad'
                        onChangeText={(text) => setEmail(text)}
                        style={[styles.input, Typography.BODY]}
                        placeholderTextColor={Colors.GRAY_MEDIUM} />
                </View>

                <View style={{marginTop: 20}}>
                    <Text style={[Typography.TAGLINE, {color: Colors.GRAY_DARK}]}>Password</Text>
                    <TextInput
                        value={password}
                        placeholder='********'
                        textContentType='password'
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                        style={[styles.input, Typography.BODY]}
                        placeholderTextColor={Colors.GRAY_MEDIUM} />
                </View>
            </View>

            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity onPress={() => setIsLogin(prev => !prev)}>
                    <Text style={{ color:'white', textAlign: 'center', textDecorationLine: 'underline'}}>
                        {isLogin? 'New to FinSecure? Register' : 'Already had an account? Login'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
                <Button 
                    title={isLogin? 'Login' : 'Register'}
                    onPress={() => isLogin? __login() : __register()} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLACK
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        color: Colors.WHITE,
        backgroundColor: Colors.LIGHT_BLACK
    },
    // Footer
    footerContainer: {
        padding: 20,
    },
});
 
export default Login;
 