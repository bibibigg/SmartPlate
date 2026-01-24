import { useQuery } from "@tanstack/react-query";
import { redirect } from "react-router-dom";
import { fetchData, HttpError } from "../utils/http";
import { BodyInfo } from "../types";
import BodyInfoForm from "../components/bodyInfo/BodyInfoForm";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorBlock from "../components/UI/ErrorBlock";
import { queryClient } from "../utils/http";
import { QUERY_KEYS } from "../constants/queryKeys";
import { useAuthStore } from "../store/auth/authSlice";

export default function BodyInfoPage() {
  const { data, isPending, isError, error } = useQuery<BodyInfo[]>({
    queryKey: QUERY_KEYS.BODY_INFO,
    queryFn: ({ signal }) => fetchData<BodyInfo[]>({ signal, params: "bodyinfo" }),
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    const httpError = error as HttpError | undefined;
    return (
      <ErrorBlock
        title="에러!"
        message={httpError?.info?.message || "데이터를 불러올 수 없습니다."}
      />
    );
  }

  let latestData: BodyInfo | null = null;

  if (data && data.length > 0) {
    latestData = data[data.length - 1];
  }

  return <BodyInfoForm bodyData={latestData} />;
}

export function loader() {
  // 인증 상태 확인
  const isAuthenticated = useAuthStore.getState().isAuthenticated;
  if (!isAuthenticated) {
    return redirect("/login");
  }

  return queryClient.fetchQuery({
    queryKey: QUERY_KEYS.BODY_INFO,
    queryFn: ({ signal }) => fetchData({ signal, params: "bodyinfo" }),
  });
}
