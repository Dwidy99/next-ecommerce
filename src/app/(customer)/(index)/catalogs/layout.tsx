import ClientWrapper from "./clientWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClientWrapper>{children}</ClientWrapper>;
}
