export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Shared UI for this route */}
      {children}
    </div>
  );
}
