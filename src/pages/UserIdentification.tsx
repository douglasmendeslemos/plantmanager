import { Jost_900Black } from '@expo-google-fonts/jost';
import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View, Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Button} from '../components/button';

export function UserIdentification(){

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled,setIsFilled] = useState(false);
    const [name,setName] = useState<string>();
    const navigation = useNavigation();

    async function handleSubmit(){
        if(!name)
            return Alert.alert('Diga-me como chamar você 😢')
        try{
            await AsyncStorage.setItem('@plantmanager:user', name);
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        }catch{
            Alert.alert('Não foi possivel salvar o seu nome. 😢')
        }
        
    }
    function handleInputBlur(){
        setIsFocused(false)
    }

    function handleInputFocus(){
        setIsFocused(true)
    }

    function handleInputChange(value: string){
        setIsFilled(!!value);
        setName(value);
    }
    return(
        <SafeAreaView style={style.container}>
             <KeyboardAvoidingView
                style={style.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
             >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={style.content}>
                    <View style={style.form}>
                        <View style={style.header}>
                            <Text style={style.emoji}>
                                { isFilled ? '😄' : '😃'}
                            </Text>

                            <Text style={style.title}>
                                Como podemos {'\n'}
                                chamar você?
                            </Text>
                        </View>
                        <TextInput
                            style={[style.input, (isFocused || isFilled) && { borderColor: colors.green}]}
                            placeholder="Digite um nome"
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                        />
                        <View style={style.footer}>
                            <Button title="Confirmar"
                            onPress={handleSubmit}/>
                        </View>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 54
    },
    header:{
        alignItems: 'center'
    },
    emoji:{
        fontSize: 44
    },
    input:{
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    title:{
        fontSize:24,
        lineHeight:32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.headings,
        marginTop: 20
    },
    footer:{
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20

    }
});