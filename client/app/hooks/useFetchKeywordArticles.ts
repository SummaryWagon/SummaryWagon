import { useQuery } from "react-query";
import { getKeywordArticle } from "../api/getKeywordArticle";

const ArticleKeys = {
  all: ["articles"] as const,
  lists: (keyword: string, page: number) =>
    [...ArticleKeys.all, `${keyword}&page=${page}`] as const,
  list: (filters: string, keyword: string, page: number) =>
    [...ArticleKeys.lists(keyword, page), { filters }] as const,
};
const useFetchKeywordArticles = (
  keyword: string,
  limit: number,
  page: number
) => {
  const { data, isLoading, isError } = useQuery(
    ArticleKeys.lists(keyword, page),
    () => getKeywordArticle(keyword, limit, page)
  );

  return { data, isLoading, isError };
};
export default useFetchKeywordArticles;
