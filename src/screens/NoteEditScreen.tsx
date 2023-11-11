import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStackScreenProps } from '../navigation/HomeNavigation';
import tw from '../common/tailwind';
import { AntDesign } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import Data from "../data/data.json"
import { EvilIcons } from '@expo/vector-icons'; 
import { Dropdown } from 'react-native-element-dropdown';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateNotes } from '../store/noteSlice';



export type Note = {
  client: string;
  category: string;
  description: string;
  id: number;
}

function NoteEditScreen({
  navigation,
  route
}: HomeStackScreenProps<'NoteEdit'>) {
  const insets = useSafeAreaInsets();

  const [category, setCategory] = useState<string|undefined>(route.params.category)
  const [client, setClient] = useState<string|undefined>(route.params.client)
  const [description, setDescription] = useState<string|undefined>(route.params.description)

  const [isCategoryError, setIsCategoryError] = useState<boolean>(false);
  const [isClientError, setIsClientError] = useState<boolean>(false);
  const [isDescriptionError, setIsDescriptionError] = useState<boolean>(false);
  const notes = useAppSelector(
    s => s.note.notes,
  );

  const dispatch = useAppDispatch();


  const onDonePress = useCallback(()=>{
    console.log(description); 
    let isValid = true;

    if(!category){
      setIsCategoryError(true)
      isValid = false;
    }
    if(!client){
      setIsClientError(true)
      isValid = false;
    }
    if(!description || String(description).trim().length===0){
      setIsDescriptionError(true)
      isValid = false;
    }

    if(!isValid){
      return;
    }
    if(client && category && description){
      const copiedNotes: Note[] = JSON.parse(JSON.stringify(notes));
      if(route.params.id){
        copiedNotes.forEach((t, i)=>{
          if(t.id===route.params.id){
            copiedNotes[i] = {id: route.params.id, category, description, client}
          }
        })
      } else {
        copiedNotes.push({client, category, description, id: Date.now()})
      }

      console.log(JSON.stringify(copiedNotes))

      FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'notes.json', JSON.stringify(copiedNotes)).then(()=>{
        dispatch(updateNotes(copiedNotes));
      })
    }

    navigation.goBack();
  },[category, client, description])

  return (
    <View style={tw.style('w-screen bg-white')}>
      <View
        style={tw`mx-4.5 flex h-full flex-col items-center justify-between`}
      >
        <View
          style={tw`relative flex flex-row mt-${
            insets.top + 26
          }px w-full items-center justify-between relative`}
        >
          <Pressable onPress={()=>{navigation.goBack()}}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </Pressable>
          <Text style={tw.style('text-2xl')}>{route.params.id ? "Edit" : "Add"} Note</Text>
          <Pressable onPress={onDonePress}>
            <Text style={tw.style("font-sans-bold text-blue-700")}>Done</Text>
          </Pressable>
        </View>
        <View style={tw`mt-10 flex grow flex-col w-full`}>
            <View style={tw.style("relative")}>
              <Text>Client</Text>
              <Dropdown
                data={Data.clients}
                labelField="label"
                valueField="value"
                onChange={(t)=>{setClient(t.value)}}
                value={client}
                style={tw.style("border h-14 px-2 rounded-lg")}
                placeholder='Please select a client'
                placeholderStyle={tw.style("text-gray-400")}
              />
              {isClientError && <Text style={tw.style("text-red-400 absolute -bottom-5 left-0")}>Client is required</Text>}
            </View>
            <View style={tw.style("relative")}>
              <Text style={tw.style("mt-10")}>Category</Text>
              <Dropdown
                data={Data.categories}
                labelField="label"
                valueField="value"
                onChange={(t)=>{setCategory(t.value)}} 
                value={category}
                style={tw.style("border h-14 px-2 rounded-lg")}
                placeholder='Please select a category'
                placeholderStyle={tw.style("text-gray-400")}
              />
              {isCategoryError && <Text style={tw.style("text-red-400 absolute -bottom-5 left-0")}>Category is required</Text>}
            </View>
            <View style={tw.style("relative")}>
              <Text style={tw.style("mt-10")}>Description</Text>
              <TextInput 
                multiline
                placeholder='please enter note content'
                value={description}
                style={tw.style("border min-h-14 px-2 rounded-lg")}
                onChange={(e)=>{setDescription(e.nativeEvent.text)}}
              />
              {isDescriptionError && <Text style={tw.style("text-red-400 absolute -bottom-5 left-0")}>Note content can not be empty</Text>}
            </View>
        </View>
      </View>
    </View>
  );
}

export default NoteEditScreen;
