import { useInfiniteQuery } from "react-query";
interface PaginationParams {
  size: number;
}
// interface QueryFunctionContext {
//   pageParam?: number;
// }

// interface PaginationResponse<T> {
//   data: T[];
//   isLastPage: boolean;
//   pageNumber: number;
// }

interface Article {
  name: string;
  url: string;
}

// // const userKeys = {
// //   all: ["users"] as const,
// //   lists: () => [...userKeys.all, "list"] as const,
// //   list: (filters: string) => [...userKeys.lists(), { filters }] as const,
// //   details: () => [...userKeys.all, "detail"] as const,
// //   detail: (id: number) => [...userKeys.details(), id] as const,
// // };

const ArticleKeys = {
  all: ["articles"] as const,
  lists: () => [...ArticleKeys.all, "list"] as const,
  list: (filters: string) => [...ArticleKeys.lists(), { filters }] as const,
};
// const useFetchArticles = ({ size }: PaginationParams) => {
//   console.log(size);
//   useInfiniteQuery(
//     "d",
//     ({ pageParam = 1 }: QueryFunctionContext) =>
//       fetch(
//         `https://pokeapi.co/api/v2/pokemon?limit=${size}&offset=${
//           size * pageParam
//         }`
//       ).then((res) => res.json()),
//     {
//       getNextPageParam: ({ data: { isLastPage, pageNumber } }) =>
//         isLastPage ? undefined : pageNumber + 1,
//     }
//   );
// };
// export default useFetchArticles;

interface PokemonResponse {
  // 응답으로 받을 JSON 객체의 구조를 정의합니다.
  results: {
    name: string;
    url: string;
  }[];
  count: number;
}

export const useFetchArticles = ({ size }: PaginationParams) => {
  const getPageBoard = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${size}&offset=${
        size * pageParam
      }`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      const data: PokemonResponse = await res.json();
      console.log("포켓몬 진화", data.results);
      return {
        board_page: data.results,
        // 반환 값에 현재 페이지를 넘겨주자
        current_page: pageParam,
        // 페이지가 마지막인지 알려주는 서버에서 넘겨준 true/false 값
        isLast: pageParam === data.count,
      };
    }
  };

  const {
    data: getBoard,
    fetchNextPage: getNextPage,
    isSuccess: getBoardIsSuccess,
    hasNextPage: getNextPageIsPossible,
    isFetching,
  } = useInfiniteQuery(ArticleKeys.lists(), getPageBoard, {
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
