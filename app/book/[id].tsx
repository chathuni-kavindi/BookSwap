import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-[#1A2744]">Book Detail: {id}</Text>
    </View>
  );
}