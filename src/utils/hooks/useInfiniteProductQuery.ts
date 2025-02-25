import { useInfiniteQuery } from "react-query";
import { ProductResponse, fetchProducts } from "../fetchProducts";

export const useInfiniteProductQuery = () => {
  const infiniteQueryResponse = useInfiniteQuery<ProductResponse>({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
      const fetchedData = await fetchProducts(pageParam);
      return fetchedData;
    },
    getNextPageParam: (_lastPage, pages) => pages.length + 1,
  });

  return {
    data: infiniteQueryResponse.data,
    fetchNextPage: infiniteQueryResponse.fetchNextPage,
    isFetching: infiniteQueryResponse.isFetching,
    isLoading: infiniteQueryResponse.isLoading,
    isError: infiniteQueryResponse.isError,
  };
};
