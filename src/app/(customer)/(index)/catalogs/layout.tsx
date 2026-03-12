import ClientWrapper from "./client-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClientWrapper>{children}</ClientWrapper>;
}
