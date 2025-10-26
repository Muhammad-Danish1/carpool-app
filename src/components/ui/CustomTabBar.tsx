import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface TabIconProps {
  routeName: string;
  focused: boolean;
  size?: number;
}

const TabIcon: React.FC<TabIconProps> = ({ routeName, focused, size = 24 }) => {
  const iconColor = focused ? "#000000" : "#9CA3AF";

  switch (routeName) {
    case "home":
      return (
        <Ionicons
          name={focused ? "home" : "home-outline"}
          size={size}
          color={iconColor}
        />
      );
    case "trips":
      return <MaterialIcons name="card-travel" size={size} color={iconColor} />;
    case "chat":
      return (
        <Ionicons
          name={focused ? "chatbubbles" : "chatbubbles-outline"}
          size={size}
          color={iconColor}
        />
      );
    case "profile":
      return (
        <FontAwesome5
          name="user"
          size={size}
          color={iconColor}
          solid={focused}
        />
      );
    default:
      return <AntDesign name="home" size={size} color={iconColor} />;
  }
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              //   testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <View style={styles.tabContent}>
                <TabIcon routeName={route.name} focused={isFocused} size={24} />
                <Text
                  style={[
                    styles.tabLabel,
                    { color: isFocused ? "#000000" : "#9CA3AF" },
                  ]}
                >
                  {typeof label === "string" ? label : route.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingTop: 8,
    paddingHorizontal: 16,
    minHeight: 60,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
  },
});

export default CustomTabBar;
