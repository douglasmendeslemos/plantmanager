import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    Alert
} from 'react-native';

import { Header } from '../components/Header';
import { PlantCardSecundary } from '../components/PlantCardSecundary';

import waterdrop from '../assets/waterdrop.png';

import colors from '../styles/colors';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/esm/locale/pt/index.js';
import fonts from '../styles/fonts';
import { Load } from '../components/Load';


export function MyPlants(){
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWaterd] = useState<string>();

    function handleRemove(plant: PlantProps){
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`,[
            {
                text: 'Não 🙏🏼',
                style: 'cancel'
            },
            {
                text: 'Sim 😢',
                onPress: async () => {
                    try {
                        await removePlant(plant.id); 
                        setMyPlants((oldData) =>
                            oldData.filter((item) => item.id !== plant.id)
                        );
                    } catch (error) {
                        Alert.alert('Não foi possível remover! 😢');
                    }
                }
            }
        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const plantStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(), 
                { locale: pt }
            );

            setNextWaterd(
                `Não esqueça de regar a ${plantStoraged[0].name} à ${nextTime} horas.`
            )
            
            setMyPlants(plantStoraged);
            setLoading(false);
        } 

        loadStorageData();
    },[])

    if(loading)
        return <Load/>

    return(
        <View style={style.container}>
            <Header/>

            <View style={style.spotlight}>
                <Image 
                    source={waterdrop}
                    style={style.spotlightImage}
                />

                <Text style={style.spotlightText}>
                    {nextWaterd}
                </Text>

            </View> 

            <View style={style.plants}>
                <Text style={style.plantsTitle}>
                    Próximas regadas
                </Text>

                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <PlantCardSecundary 
                        data={item} 
                        handleRemove={() => {handleRemove(item)}}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1}}
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage:{
        width: 60,
        height: 60,
    },
    spotlightText:{
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 30,
        fontSize: 17
    },
    plants:{
        flex: 1,
        width: '100%',
    },
    plantsTitle:{
        fontSize: 24,
        fontFamily: fonts.headings,
        color: colors.heading,
        marginVertical: 20
    }
});