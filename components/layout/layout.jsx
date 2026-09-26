import MainHeader from "./main-header";

export const Layout = (props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      <main className="flex-1">{props.children}</main>
    </div>
  );
};
