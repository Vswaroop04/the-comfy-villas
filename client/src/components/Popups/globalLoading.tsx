import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Loader } from "lucide-react";
import globalLoadingAtom from "@/store/loading";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const GlobalLoading: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useAtom(globalLoadingAtom);
  console.log("Loadin ....")
  // if route changes, close the dialog
  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      if (!loading.isLoading) {
        setLoading({
          isLoading: true,
          reason: `Navigating to ${url}...`,
        });
      }
    });
    router.events.on("routeChangeComplete", () => {
      if (loading.isLoading) {
        setLoading({
          isLoading: false,
          reason: undefined,
        });
      }
    });
    router.events.on("routeChangeError", () => {
      if (loading.isLoading) {
        setLoading({
          isLoading: false,
          reason: undefined,
        });
      }
    });
  }, [router, loading, setLoading]);

  return (
    <AlertDialog open={loading.isLoading}>
      <AlertDialogContent className="h-screen max-w-full bg-transparent p-0">
        <AlertDialogHeader className="relative w-full overflow-hidden text-ellipsis whitespace-nowrap">
          <Loader className="m-auto bg-transparent pt-14" />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GlobalLoading;
