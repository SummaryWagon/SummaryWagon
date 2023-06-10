import { useQuery } from "react-query";
import { getMainTopicArticle } from "../api/getMainTopicArticle";
const useMainTopic = () => {
  const { data, isLoading, isError } = useQuery(["mainTopic"], () =>
    getMainTopicArticle()
  );

  return { data, isLoading, isError };
};

export default useMainTopic;
