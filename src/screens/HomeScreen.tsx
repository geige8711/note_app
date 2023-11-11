import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStackScreenProps } from '../navigation/HomeNavigation';
import tw from '../common/tailwind';
import { AntDesign } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import Data from "../data/data.json"
import { EvilIcons } from '@expo/vector-icons'; 
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateNotes } from '../store/noteSlice';
import DeleteAlertModal from '../components/DeleteAlertModal';


export type Note = {
  client: string;
  category: string;
  description: string;
  id: number;
}

function HomeScreen({
  navigation,
}: HomeStackScreenProps<'Home'>) {
  const insets = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const notes = useAppSelector(
    s => s.note.notes,
  );
  const dispatch = useAppDispatch();
  const [deleteAlertDisplayed, setDeleteAlertDisplayed] =
    useState<boolean>(false);
  
  const [deletingNote, setDeletingNote] = useState<Note|undefined>(undefined)


  useEffect(()=>{
    FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'notes.json').then(result=>{
      const allNotes = JSON.parse(result) as Note[]
      dispatch(updateNotes(allNotes))
      setIsLoading(false)
    })
  },[])

  const  onAddPress = ()=>{
    navigation.push("NoteEdit",{description: undefined, id: undefined, category: undefined, client: undefined})
  }

  const deleteNotesById = (id: number)=>{
    const copiedNotes: Note[] = [...notes].filter(t=>t.id!==id);
    FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'notes.json', JSON.stringify(copiedNotes)).then(()=>{
      dispatch(updateNotes(copiedNotes));
    })
  }

  return (
    <>
      <View style={tw.style('w-screen bg-white')}>
      {
        isLoading ?
        <View
            style={tw`relative flex flex-row w-full h-full items-center justify-center relative`}
          >
          <ActivityIndicator size="large" color={tw.color('blue')} />
        </View> :
        <View
          style={tw` flex h-full flex-col items-center justify-between`}
        >
          <View
            style={tw`relative flex flex-row mt-${
              insets.top + 26
            }px w-full items-center justify-center relative`}
          >
            <Text style={tw.style('text-2xl')}>Notes</Text>
            <Pressable onPress={onAddPress} style={tw.style("absolute right-6 top-1")}>
              <AntDesign name="plus" size={24} color="black"  />
            </Pressable>
          </View>
          <View style={tw`mt-10 flex flex-1 grow flex-col w-full`}>
            {
              notes.length===0 ?
              <View>
                <Text style={tw.style("text-lg text-gray-500 text-center")}>
                  No Notes, please add a new note!
                </Text>
              </View> :
              <FlatList
              contentContainerStyle={tw.style("grow px-5")}
                keyExtractor={item=>String(item.id)}
                data={notes}
                renderItem={(t)=>{
                  return <View style={tw.style("border w-full relative flex flex-row justify-between items-center mb-2 rounded-lg pl-2")}>
                    <View style={tw.style("h-full py-2 max-w-85%")}>
                      <Text>
                        {t.item.client} - {t.item.category}
                      </Text>
                      <Text style={tw.style("mt-2")}>
                        {t.item.description}
                      </Text>
                    </View>
                    <View style={tw.style("flex flex-row mr-2")}>
                      <Pressable onPress={()=>{
                        navigation.push("NoteEdit",{description: t.item.description, id: t.item.id, category: t.item.category, client: t.item.client})
                      }}>
                        <AntDesign name="edit" size={24} color="orange" style={tw.style('mr-4')} />
                      </Pressable>
                      <Pressable onPress={()=>{setDeletingNote(t.item); setDeleteAlertDisplayed(true);}}>
                        <EvilIcons name="trash" size={24} color="red" />
                      </Pressable>
                    </View>
                  </View>
                }}
              />
            }
          </View>
        </View>
      }
      </View>
      <DeleteAlertModal
        visible={deleteAlertDisplayed}
        alertMessage="Are you sure you want to remove this note?"
        onNoPress={() => {
          setDeleteAlertDisplayed(false);
          setDeletingNote(undefined)
        }}
        onYesPress={() => {
          deleteNotesById(deletingNote!.id);
          setDeleteAlertDisplayed(false);
          setDeletingNote(undefined)
        }}
      />
    </>
  );
}

export default HomeScreen;
