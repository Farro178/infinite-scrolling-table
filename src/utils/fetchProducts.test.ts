// fetchProducts.test.ts
import { fetchProducts, ProductResponse } from "./fetchProducts";

// Mock data imported for testing purposes
import { describe, expect, it } from "vitest";
import mockData from "./../assets/mock-data.json";
import { Product } from "./types/Product";

describe("fetchProducts Function", () => {
  const pageSize = 5;

  it("fetches products based on page number and page size", async () => {
    const expectedPage1Data = mockData.slice(0, pageSize);
    const expectedPage2Data = mockData.slice(pageSize, pageSize * 2);

    const page1Result = await fetchProducts(1, pageSize);
    verifyProductResponse(page1Result, expectedPage1Data, mockData.length);

    const page2Result = await fetchProducts(2, pageSize);
    verifyProductResponse(page2Result, expectedPage2Data, mockData.length);
  });

  const verifyProductResponse = (
    result: ProductResponse,
    expectedData: Product[],
    expectedTotal: number
  ) => {
    expect(result.data).toEqual(expectedData);
    expect(result.pagination.pageSize).toBe(pageSize);
    expect(result.pagination.pageTotal).toBe(expectedTotal);
  };
});
