import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Table from "./Table";

describe("Table Component", () => {
  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "price", header: "Price" },
  ];

  const data = [
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 19.99 },
  ];

  it("renders table with headers", () => {
    const { getByRole, getAllByRole } = render(
      <Table id="test" data={data} columns={columns} onScroll={() => {}} />
    );

    const tableElement = getByRole("table");
    expect(tableElement).toBeInTheDocument();

    const headerCells = getAllByRole("columnheader");
    expect(headerCells.length).toBe(columns.length);
  });
});
