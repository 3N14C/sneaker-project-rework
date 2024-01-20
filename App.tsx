import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNativeRouter } from "./router/ReactNativeRouter";
import { AuthContextProvider } from "./context/AuthContext";
import Toast from "react-native-toast-message";
import { ModalPortal } from "react-native-modals";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ReactNativeRouter />
        <ModalPortal />
        <Toast />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
