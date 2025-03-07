import Logout from "@/app/_utilsComponents/Logout";

function LayoutOwnerProperties({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex justify-end m-5">
        <Logout />
      </div>

      <>{children}</>
    </>
  );
}

export default LayoutOwnerProperties;
