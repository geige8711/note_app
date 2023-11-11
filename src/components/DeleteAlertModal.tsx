import { Pressable, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import tw from '../common/tailwind';

export interface DeleteAlertModalProps {
  visible: boolean;
  alertMessage: string;
  onYesPress: () => void;
  onNoPress: () => void;
}

export default function DeleteAlertModal({
  alertMessage,
  visible,
  onNoPress,
  onYesPress,
}: DeleteAlertModalProps) {
  return (
    <Modal isVisible={visible} style={tw.style('px-10')}>
      <View style={tw.style('w-full h-40 bg-white p-5 rounded-2xl')}>
        <Text style={tw.style('font-sans-semibold text-lg text-center')}>{alertMessage}</Text>
        <View style={tw.style('flex flex-row mt-4 justify-center')}>
          <Pressable
            style={tw.style(
              'border w-20 h-9 flex flex-row items-center justify-center rounded-full',
            )}
            onPress={onNoPress}
          >
            <Text>NO</Text>
          </Pressable>
          <Pressable
            style={tw.style(
              'border w-20 h-9 flex flex-row items-center justify-center rounded-full ml-3',
            )}
            onPress={onYesPress}
          >
            <Text>YES</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
