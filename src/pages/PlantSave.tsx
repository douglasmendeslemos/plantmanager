import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    Alert,
    View,
    ScrollView,
    Platform,
    TouchableOpacity,
    Image
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';
import {  PlantProps, savePlant } from '../libs/storage';

import waterdrop from '../assets/waterdrop.png';

import { Button } from '../components/button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';



interface Params{
    plant: PlantProps
}

export function PlantSave(){
    const route = useRoute();
    const { plant } = route.params as Params;

    const navigation = useNavigation();

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    
    function handleChangeTime(event: Event, dateTime: Date | undefined  ){
        if(Platform.OS === 'android'){
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date()) ){
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏰')
        }

        if(dateTime)
            setSelectedDateTime(dateTime);
    }

    function handleOpenDateTimePickerForAndroid(){
        setShowDatePicker(oldState => !oldState)
    }
     
    async function handleSave(){ 
        // const data = await loadPlant();
        // console.log(data); para mostrar no console se está salvando a planta e horario.  

        try {
            await savePlant ({
                ...plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants'
            });

        } catch {
            Alert.alert('Não foi possivel salvar. 😢')
        }
    }
    return(
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={style.container}
        >
            <View style={style.container}>
                <View style={style.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        height={200}
                        width={200}
                    />

                    <Text style={style.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={style.plantAbout}>
                        {plant.about}
                    </Text>
                </View>

                <View style={style.controler}>
                    <View style={style.tipContainer}>
                        <Image 
                            source={waterdrop}
                            style={style.tipImage} 
                        />
                        <Text style={style.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>
                    
                    <Text style={style.alertLabel}>
                        Escolha o melhor horário para ser lembrado:
                    </Text>

                    { showDatePicker && (
                        <DateTimePicker
                            value={selectedDateTime}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeTime}
                        />
                    )}

                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity
                                style={style.dateTimePickerButton}
                                onPress={handleOpenDateTimePickerForAndroid}

                            >
                                <Text style={style.dateTimePickerText}>
                                    {`Mudar Horário: ${format(selectedDateTime, 'HH:mm')} `}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                    <Button 
                        title="Cadastrar Planta"
                        onPress={handleSave}
                    />
                    
                </View>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo:{
        flex:1,
        paddingHorizontal:30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controler:{
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    plantName:{
        fontFamily: fonts.headings,
        fontSize:32,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 25,
        marginTop: 10
    },
    tipContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage:{
        width: 56,
        height: 56,
    },
    tipText:{
        flex:1,
        marginLeft:20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 22,
        textAlign: 'justify'
    },
    alertLabel:{
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 15,
        marginBottom: 5
    },
    dateTimePickerButton:{
        width: '100%',
        alignItems:'center',
        paddingVertical: 40
    },
    dateTimePickerText:{
        color: colors.heading,
        fontSize: 30,
        fontFamily: fonts.text
    }
});