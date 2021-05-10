import React, {useEffect, useState} from 'react';
import { View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import useImg from '../assets/douglas.png';
import fonts from '../styles/fonts';



export function Header(){
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '')
        }

        loadStorageUserName();
    },[]);

    return (
        <View style={style.container}>
           
           <View>
                <Text style={style.greeting}>Olá,</Text>
                <Text style={style.userName}>
                    {userName}
                </Text>
            
            </View>
            
            <Image source={useImg} style={style.image}/>

        </View>
    )
}

const style = StyleSheet.create({
    container:{
        borderColor: colors.red,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingVertical: 20,
        marginTop: 50
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 40
    },
    greeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName:{
        fontSize: 32,
        fontFamily: fonts.headings,
        color: colors.heading
    }
});