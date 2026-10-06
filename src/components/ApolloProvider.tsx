import { ApolloProvider } from "@apollo/client/react";
import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { useState, useEffect } from "react";

type Props = {
  client: ApolloClient<NormalizedCacheObject> | null;
  children: React.ReactNode;
};

export default function ApolloProviderWrapper({ client, children }: Props) {
  const [apolloClient, setApolloClient] = useState(client);

  useEffect(() => {
    if (!apolloClient && client) {
      setApolloClient(client);
    }
  }, [client, apolloClient]);

  if (!apolloClient) {
    return <>{children}</>;
  }

  return (
    <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
  );
}
