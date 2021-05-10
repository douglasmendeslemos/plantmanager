import React from 'react';
import {
    StyleSheet, Text, View, Animated
} from 'react-native';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri} from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps{
    data:{
        name: string;
        photo: string;
        hour: string;
    };
    handleRemove: () => void;
}

export const PlantCardSecundary = ({data, handleRemove, ...rest} : PlantProps) => {
    return(
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={style.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather name="trash" size={32} color={colors.white}/>

                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton 
                style={style.container}
                {...rest}
            >

                <SvgFromUri 
                    uri={data.photo} 
                    width={50} 
                    height={50} 
                />
                <Text style={style.title}>
                    { data.name }
                </Text>
                <View style={style.datails}>
                    <Text style={style.timeLabel}>
                        Regar às
                    </Text>
                    <Text style={style.time}>
                        {data.hour}
                    </Text>
                </View>
                
            </RectButton>
        </Swipeable>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5,
    },
    title:{
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.headings,
        fontSize: 17,
        color: colors.heading
    },
    datails:{
        alignItems: 'flex-end'
    },
    timeLabel:{
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light
    },
    time:{
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.headings,
        color: colors.body_dark 
    },
    buttonRemove:{
        width: 120,
        height: 90,
        backgroundColor: colors.red,
        marginTop: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems:'center',
        position: 'relative',
        right: 20,
        paddingLeft: 10
    }
});