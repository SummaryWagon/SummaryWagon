import { useInfiniteQuery } from "react-query";

interface PaginationParams {
  next?: any;
}

const ArticleKeys = {
  all: ["articles"] as const,
  lists: () => [...ArticleKeys.all, "hotList"] as const,
  list: (filters: string) => [...ArticleKeys.lists(), { filters }] as const,
};

export const useFetchHotArticles = (size: number) => {
  const getBoardPage = async ({ pageParam = 1 }) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/hot/all?page=${pageParam}&limit=${size}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return {
        board_page: data.articles,
        current_page: pageParam,
        isLast: pageParam === Math.ceil(data.total / size),
      };
    }
  };

  const {
    data: getBoard,
    fetchNextPage: getNextPage,
    isSuccess: getBoardIsSuccess,
    hasNextPage: getNextPageIsPossible,
    isFetching,
  } = useInfiniteQuery(ArticleKeys.lists(), getBoardPage, {
    getNextPageParam: (lastPage, pages) => {
      // lastPage와 pages는 콜백함수에서 리턴한 값을 의미한다!!
      // lastPage: 직전에 반환된 리턴값, pages: 여태 받아온 전체 페이지
      if (!lastPage!.isLast) return lastPage!.current_page + 1;
      // 마지막 페이지면 undefined가 리턴되어서 hasNextPage는 false가 됨!
      return undefined;
    },
  });

  return {
    getBoard,
    getNextPage,
    getBoardIsSuccess,
    getNextPageIsPossible,
    isFetching,
  };
};
