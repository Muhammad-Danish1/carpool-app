import CustomButton from "@/src/components/ui/Button";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 w-full items-center justify-center bg-red-700 p-4">
      <Text>NotFoundScreen</Text>
      <CustomButton
        title="Go Back"
        onPress={() => {}}
        disabled={false}
        loading={false}
        className="w-full mt-4 bg-blue-700 rounded-md"
      />
    </View>
  );
}
