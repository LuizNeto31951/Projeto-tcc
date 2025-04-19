import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert, Keyboard, TouchableOpacity } from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import { useDispatch } from "react-redux";
import { Creators as shopActions } from "@/app/store/ducks/shopItems";
import { ShopItemProps as ShopItem } from "@/app/types/types";
import { Container, ErrorText, Input, Label, AddButton, ButtonText, ImagePreview } from "./styles";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { InferType } from "yup";

const shopItemSchema = yup.object({
    title: yup.string().required("O título é obrigatório"),
    coinCost: yup
        .number()
        .min(1, "Valor mínimo é 1 moeda")
        .max(10, "Valor máximo é 10 moedas")
        .required("O custo em moedas é obrigatório"),
});

type ShopItemFormData = InferType<typeof shopItemSchema>;

export default function AddShopItem() {
    const dispatch = useDispatch();
    const { idEdit, titleEdit, coinCostEdit, imageSourceEdit } = useLocalSearchParams();
    const [imageUri, setImageUri] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ShopItemFormData>({
        resolver: yupResolver(shopItemSchema),
    });

    useEffect(() => {
        if (idEdit && titleEdit && coinCostEdit) {
            setValue("title", String(titleEdit));
            setValue("coinCost", Number(coinCostEdit));
            const imageEditStr = Array.isArray(imageSourceEdit) ? imageSourceEdit[0] : imageSourceEdit;
            if (imageEditStr)
                setImageUri(imageEditStr);
        }
    }, [idEdit, titleEdit, coinCostEdit, imageSourceEdit]);

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão negada', 'Precisamos da permissão para acessar suas imagens.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled) {
            const pickedUri = result.assets[0].uri;
            const fileName = pickedUri.split('/').pop();
            const newPath = FileSystem?.documentDirectory ? FileSystem.documentDirectory + fileName : '';

            try {
                await FileSystem.copyAsync({
                    from: pickedUri,
                    to: newPath,
                });
                setImageUri(newPath);
            } catch (err) {
                Alert.alert('Erro', 'Não foi possível salvar a imagem.');
            }
        }
    };

    const submitForm = (data: Pick<ShopItem, "title" | "coinCost">) => {
        const itemId = typeof idEdit === 'string' ? idEdit : Math.random().toString(36).substr(2, 9);

        const newItem: ShopItem = {
            id: itemId,
            title: data.title,
            coinCost: data.coinCost,
            imageSource: imageUri ? { uri: imageUri } : require('@/app/assets/images/default.jpg'),
        };

        Keyboard.dismiss();

        if (idEdit) {
            dispatch(shopActions.updateItem(newItem) as any);
        } else {
            dispatch(shopActions.addItem(newItem) as any);
        }

        reset();
        setImageUri(null);

        Alert.alert("Sucesso", `Item ${idEdit ? 'editado' : 'adicionado'} com sucesso!`, [
            { text: "Voltar", onPress: () => router.navigate('/shop') },
        ]);
    };

    return (
        <>
            <Stack.Screen options={{ title: idEdit ? "Editar item" : "Adicionar item à loja!" }} />
            <Container>
                <Label>Imagem do item</Label>
                <TouchableOpacity onPress={handlePickImage}>
                    {imageUri ? (
                        <ImagePreview source={{ uri: imageUri }} resizeMode="stretch" />
                    ) : (
                        <ImagePreview source={require('@/app/assets/images/default.jpg')} resizeMode="stretch" />
                    )}
                </TouchableOpacity>

                <Label>Nome do item</Label>
                <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Ex: Pizza, Episódio extra..."
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.title && <ErrorText>{errors.title.message}</ErrorText>}

                <Label>Preço (em moedas)</Label>
                <Controller
                    control={control}
                    name="coinCost"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="1 a 10"
                            keyboardType="numeric"
                            maxLength={2}
                            value={String(value || "")}
                            onChangeText={(text) => onChange(Number(text))}
                        />
                    )}
                />
                {errors.coinCost && <ErrorText>{errors.coinCost.message}</ErrorText>}

                <AddButton onPress={handleSubmit(submitForm)}>
                    <ButtonText>{idEdit ? "Salvar alterações" : "Adicionar à loja"}</ButtonText>
                </AddButton>
            </Container>
        </>
    );
}
