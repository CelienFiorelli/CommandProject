import React, { useContext, useState } from 'react';
import { Image, Pressable, Text } from 'react-native';
import { View } from 'react-native';
import globalStyle from '../styles/globalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet } from 'react-native';
import { uploadProduct } from '../utils/api';
import { UserContext } from './UserProvider';

function CreateProduct({route, navigation}: any) {
    const { type } = route.params;
    const { token } = useContext(UserContext);
    const [imagePreview, setImagePreview] = useState({uri: null, height: null, width: null})
    const [formField, setFormField] = useState({
        name: null,
        price: null,
    });

    const displayImagePicker = async () => {
        const response = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (response.granted) {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                selectionLimit: 1,
                mediaTypes: ImagePicker.MediaTypeOptions.Images
            });
            if (!result && result.assets[0].uri.split('.')[result.assets[0].uri.split('.').length - 1] != "png") return;
            
            setImagePreview({
                width: result.assets[0].width,
                height: result.assets[0].height,
                uri: result.assets[0].uri
            })
        }
    }

    const createProduct = async () => {
        if (!imagePreview.uri || Object.values(formField).filter(v => v == null).length) return;
        const image: any = new FormData()
        image.append("image", {
            uri: imagePreview.uri,
            name: "fichier.png",
            type: "image/png"
        })

        await uploadProduct(token, type, formField.name, formField.price, image)
        navigation.goBack();
    }

    return (
        <View style={{ backgroundColor: "#303030", height: "100%" }}>
            <View style={globalStyle.header}>
                <View>
                    <Pressable style={globalStyle.buttonIcon} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color={"white"} />
                    </Pressable>
                </View>
                <View>
                    <Text style={{fontSize: 20, color: "white"}}>Création de {type.toLowerCase()}</Text>
                </View>
                <Pressable style={globalStyle.buttonText} onPress={() => {createProduct()}}>
                    <MaterialIcons name="playlist-add-check" size={24} color={"white"} />
                    <Text style={{color: "white"}}>Enregistrer</Text>
                </Pressable>
            </View>
            <View>
                <View style={[globalStyle.mainBorder, { backgroundColor: "#202020", margin: 16, padding: 8, display: "flex", alignItems: "center"}]}>
                    <TextInput placeholder="Nom" style={defaultStyle.textInput} onChangeText={(text) => setFormField({...formField, name: text})}/>
                    <TextInput placeholder="Prix" style={defaultStyle.textInput} onChangeText={(text) => setFormField({...formField, price: text})}/>
                    <Pressable onPress={() => displayImagePicker()} style={defaultStyle.fileInput}>
                        <Feather name="upload" size={24} color={"white"} />
                        <Text style={{color: "white", marginLeft: 8}}>Choisir une image</Text>
                    </Pressable>
                    {imagePreview.uri != null &&
                        <Image style={{ width: 250, height: 250 / imagePreview.width * imagePreview.height }} source={{ uri: imagePreview.uri}}/>
                    }
                </View>
            </View>
        </View>
    );
}

const defaultStyle = StyleSheet.create({
    textInput: {
        borderColor: "#009E27",
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 24,
        width: "100%"
    },
    fileInput: {
        borderColor: "#009E27",
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 24,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        borderRadius: 8,
        padding: 2,
        backgroundColor: "#009E27",
        alignItems: 'center',
        width: '50%',
        paddingVertical: 8,
    }
})

export default CreateProduct;