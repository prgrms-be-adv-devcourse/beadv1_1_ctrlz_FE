"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  // QueryClient는 client 컴포넌트 내에서 생성해야 함
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* react-query devtools */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

      {/* react-hot-toast 알림 */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}