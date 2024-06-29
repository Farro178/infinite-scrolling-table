import mockData from "./../assets/mock-data.json";
import { Pagination } from "./types/Pagination";
import { Product } from "./types/Product";

export type ProductResponse = {
  data: Product[];
  pagination: Pagination;
};

/*
 * Altered slightly from example to add pagination functionality.
 */
export const fetchProducts = async (pageNumber: number, pageSize = 10) => {
  return new Promise<ProductResponse>((resolve) => {
    setTimeout(() => {
      const start = (pageNumber - 1) * pageSize;
      const end = start + pageSize;
      const data = mockData.slice(start, end);

      resolve({
        data,
        pagination: {
          pageSize: pageSize,
          pageTotal: mockData.length,
        },
      });
    }, 1000);
  });
};
