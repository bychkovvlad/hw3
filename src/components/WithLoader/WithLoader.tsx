import { Loader } from "../Loader/Loader";

type WithLoaderProps = {
  loading?: boolean;
  children?: React.ReactNode;
};

export const WithLoader: React.FC<WithLoaderProps> = ({
  children,
  loading,
}) => {
  return <>{loading ? <Loader /> : children}</>;
};
