import { useQuery } from "react-query";
import { getKeywordArticle } from "../api/getKeywordArticle";

const ArticleKeys = {
  all: ["articles"] as const,
  lists: (keyword: string) => [...ArticleKeys.all, keyword] as const,
  list: (filters: string, keyword : string) => [...ArticleKeys.lists(keyword), { filters }] as const,
};
const useFetchKeywordArticles = (
  keyword: string,
  limit: number,
  page: number
) => {
  console.log(keyword, limit, page);
  const { data, isLoading, isError } = useQuery(
    ArticleKeys.lists(keyword),
    () => getKeywordArticle(keyword, limit, page)
  );

  return { data, isLoading, isError };
};
export default useFetchKeywordArticles;
