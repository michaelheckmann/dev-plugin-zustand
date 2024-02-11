import {
  Button,
  ButtonIcon,
  ButtonText,
  ChevronDownIcon,
  RepeatIcon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
} from "@gluestack-ui/themed";
import ReactJson from "@microlink/react-json-view";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useShowErrorToast } from "./useErrorToast";
import { usePluginStore } from "./usePluginStore";

const SHOW_DEFAULT_DATA = false;

export function Main() {
  const showToast = useShowErrorToast();

  const [stores, setStores] = useState<string[]>([]);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const { entries, update, set, ready } = usePluginStore((error: unknown) => {
    showToast(error);
    console.error(error);
  });

  useEffect(() => {
    if (ready && stores.length === 0 && entries.length > 0) {
      setStores(entries.map((entry) => entry.name));
    }
  }, [entries, ready, stores.length]);

  const data =
    entries.find((entry) => entry.name === selectedStore)?.state ??
    (SHOW_DEFAULT_DATA
      ? {
          id: "usr-6fbe95da-4fa7-4914-8f86-99362b51e548",
          createdAt: "2024-02-10T23:06:01.646Z",
          licenseKey: "0.66196",
          isOnboarded: true,
          hasCriticalScore: false,
          courseProgress: {
            currentCourseId: "csp_course",
            currentModuleId: null,
            currentFragmentId: null,
            currentFragmentProgress: 0,
          },
          personalInfo: {
            name: null,
            gender: null,
            dateOfBirth: null,
            mentalIllness: null,
          },
          personalInfo1: {
            name: null,
            gender: null,
            dateOfBirth: null,
            mentalIllness: null,
          },
          personalInfo2: {
            name: null,
            gender: null,
            dateOfBirth: null,
            mentalIllness: null,
          },
          personalInfo3: {
            name: "usr-6fbe95da-4fa7-4914-8f86-99362b51e548-usr-6fbe95da-4fa7-4914-8f86-99362b51e548-usr-6fbe95da-4fa7-4914-8f86-99362b51e548-usr-6fbe95da-4fa7-4914-8f86-99362b51e548",
            gender: null,
            dateOfBirth: null,
            mentalIllness: null,
          },
          personalInfo4: {
            name: null,
            gender: null,
            dateOfBirth: null,
            mentalIllness: null,
          },
          personalInfo5: {
            name: null,
            gender: null,
            dateOfBirth: null,
            mentalIllness: null,
          },
        }
      : null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Select style={styles.headerItem} onValueChange={setSelectedStore}>
            <SelectTrigger
              variant="outline"
              size="sm"
              borderColor="$blueGray700"
            >
              <SelectInput
                placeholderTextColor="$blueGray700"
                placeholder="Select option"
              />
              <SelectIcon mr="$3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {stores.map((store) => (
                  <SelectItem key={store} label={store} value={store} />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </View>
        <Text size="xl" fontWeight="$semibold">
          Zustand Inspector
        </Text>
        <View style={styles.headerItem}>
          <Button
            size="sm"
            variant="outline"
            borderColor="$blueGray700"
            action="default"
            onPress={update}
            $hover-bg="$trueGray50"
          >
            <ButtonIcon color="$blueGray700" as={RepeatIcon} />
            <ButtonText color="$blueGray700"> Refresh</ButtonText>
          </Button>
        </View>
      </View>
      <View style={styles.body}>
        {data ? (
          <ReactJson
            src={data}
            style={{
              width: "100%",
              height: "100%",
            }}
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
            collapseStringsAfterLength={100}
          />
        ) : (
          <Text color="$blueGray400" fontFamily="$mono">
            {ready ? "select a store" : "loading..."}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  headerItem: {
    width: 200,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: 20,
    overflow: "scroll",
  },
});
