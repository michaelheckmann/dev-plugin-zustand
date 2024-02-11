import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import { useCallback } from "react";

export const useShowErrorToast = () => {
  const toast = useToast();
  return useCallback(
    (error: unknown) => {
      toast.show({
        placement: "bottom right",
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="error" minWidth="$64">
            <VStack space="xs">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>{String(error)}</ToastDescription>
            </VStack>
          </Toast>
        ),
      });
    },
    [toast]
  );
};
