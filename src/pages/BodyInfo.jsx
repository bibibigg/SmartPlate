import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/http";
import BodyInfoForm from "../components/bodyInfo/bodyInfoForm";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorBlock from "../components/UI/ErrorBlock";

export default function BodyInfoPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["bodyInfo"],
    queryFn: ({ signal }) => fetchData({ signal, params: "bodyinfo" }),
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    <ErrorBlock
      title="에러!"
      message={error.info?.message || "fail to fetch"}
    />;
  }

  if (data) {
    const latestData = data[data.length - 1];
    return <BodyInfoForm bodyData={latestData} />;
  }
}
