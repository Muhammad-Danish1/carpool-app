import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["custom"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
LocaleConfig.defaultLocale = "custom";

interface DateSelectionProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  onSelectDate: (date: string) => void;
}

const initialDate = "2025-09-30"; // Current date

export const SelectDateBottomSheet: React.FC<DateSelectionProps> = ({
  bottomSheetModalRef,
  onSelectDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const snapPoints = useMemo(() => ["75%"], []);

  const marked = useMemo(() => {
    return {
      [selectedDate]: {
        selected: true,
        selectedColor: "red",
        selectedTextColor: "#000",
      },
    };
  }, [selectedDate]);

  const handleApply = () => {
    onSelectDate(selectedDate);
    bottomSheetModalRef.current?.close();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
      handleIndicatorStyle={{
        backgroundColor: "#E5E7EB",
        width: 40,
        height: 4,
      }}
    >
      <BottomSheetView style={styles.container}>
        <Text style={styles.headerText}>Trip Date</Text>

        <Calendar
          style={{ width: "100%", backgroundColor: "#5390D9" }}
          // Initially visible month. Default = now
          initialDate={"2012-03-01"}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={"2012-05-10"}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={"2012-05-30"}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            console.log("selected day", day);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            console.log("selected day", day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={"MMMM, yyyy"}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          renderArrow={
            (direction) =>
              direction === "left" ? (
                <Ionicons name="arrow-back" size={24} color="#374151" />
              ) : (
                <Ionicons name="arrow-forward" size={24} color="#374151" />
              )
            // <Ionicons name="arrow-back" size={24} color="#374151" />
          }
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames={true}
          // Show week numbers to the left. Default = false
          // showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={true}
          // Disable right arrow. Default = false
          disableArrowRight={true}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          // Replace default month and year title with custom one. the function receive a date as parameter

          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
          renderHeader={(date) => {
            return (
              <View
                style={{ backgroundColor: "#48BFE3", width: "100%", margin: 0 }}
              >
                <Text style={styles.headerText}>
                  {date.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
              </View>
            );
          }}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

// Updated renderCustomHeader with debug
function renderCustomHeader(dateInput: any) {
  // Determine if input is a Date object or string
  let date;
  if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    // Handle string like "30/09/2025, 5:00:00 am 2025"
    const [datePart] = dateInput.split(",");
    const [day, month, year] = datePart.split("/").map(Number); // ["30", "09", "2025"] -> [30, 9, 2025]
    date = new Date(year, month - 1, day); // Month is 0-indexed, so subtract 1
  }

  console.log("Parsed Header Date:", date.toISOString()); // Debug log
  const month = date.toLocaleString("default", { month: "long" }); // "September"
  const yearNum = date.getFullYear(); // "2025"
  console.log("Header Date:", month, yearNum); // Debug log

  const textStyle: TextStyle = {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  };

  return (
    <View style={styles.header}>
      <Text style={textStyle}>
        {month}, {yearNum}
      </Text>
    </View>
  );
}

function DayComponent(props: any) {
  return <Text>{props.day.dateString}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    // textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#48BFE3",
  },
  calendar: {
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default SelectDateBottomSheet;
