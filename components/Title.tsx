import React from 'react';
import { Text, StyleSheet, View} from 'react-native';

//Define Props
interface TitleProps {
    text: string;
    backgroundColor?: string;
    textColor?: string;
}

const Title: React.FC<TitleProps> = ({ text, backgroundColor, textColor }) => {
    return(
        <View style={[
            styles.container, 
            backgroundColor ? { backgroundColor }: null
        ]}>
            <Text style={[styles.title, 
            textColor ? {color: textColor} : null
            ]}>
                {text}
            </Text>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#f0f0f0', // Default background color
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', // Default text color
      },
})

export default Title;