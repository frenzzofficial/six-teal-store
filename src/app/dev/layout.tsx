import { notFound } from "next/navigation";

interface DevLayoutPageProps {
  children: React.ReactNode;
}

const DevLayoutPage = ({ children }: DevLayoutPageProps) => {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col justify-center items-center gap-20 ">
        {children}
      </div>
    </div>
  );
};

export default DevLayoutPage;
