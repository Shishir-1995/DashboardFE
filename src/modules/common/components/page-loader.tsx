import { CircularProgress } from "@mui/material";

interface PageLoaderProps {}

const PageLoader: React.FC<PageLoaderProps> = () => {
  return (
    <div className="w-full flex justify-center py-24">
      <CircularProgress size={50} />
    </div>
  );
};

export default PageLoader;
