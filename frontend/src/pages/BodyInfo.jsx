import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/http";
import BodyInfoForm from "../components/bodyInfo/BodyInfoForm";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorBlock from "../components/UI/ErrorBlock";
import { queryClient } from "../utils/http";

export default function BodyInfoPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["bodyInfo"],
    queryFn: ({ signal }) => fetchData({ signal, params: "bodyinfo" }),
  });

  // if (isPending) {
  //   return <LoadingSpinner />;
  // }
  let latestData;

  if (isError) {
    return (
      <ErrorBlock
        title="에러!"
        message={error.info?.message || "fail to fetch"}
      />
    );
  }
  // console.log(data);
  if (!data || data.length === 0) {
    latestData = null;
    return <BodyInfoForm bodyData={latestData} />;
  }

  if (data) {
    latestData = data[data.length - 1];
    return <BodyInfoForm bodyData={latestData} />;
  }
}
export function loader() {
  queryClient.fetchQuery({
    queryKey: ["bodyInfo"],
    queryFn: ({ signal }) => fetchData({ signal, params: "bodyinfo" }),
  });
}
