// For reference here
type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-blue-900">{children}</div>
  );
};
export default Layout;
