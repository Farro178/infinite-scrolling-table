import { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { useCallback, useMemo } from "react";
import { useInfiniteProductQuery } from "../../utils/hooks/useInfiniteProductQuery";
import { Product } from "../../utils/types/Product";
import Table from "../Table/Table";
import classes from "./styles.module.scss";

interface ProductTableProps {
  id: string;
  handleScroll: (
    containerRefElement?: HTMLDivElement | null | undefined
  ) => void;
}

function ProductTable({ id, handleScroll }: ProductTableProps) {
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 60,
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "price",
        header: "Price",
      },
    ],
    []
  );

  const { data, fetchNextPage, isFetching, isLoading } =
    useInfiniteProductQuery();

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );

  const totalDBRowCount = data?.pages?.[0]?.pagination?.pageTotal ?? 0;
  const totalFetched = flatData.length;

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [isFetching, totalFetched, totalDBRowCount, fetchNextPage]
  );

  if (isLoading) {
    return <div className={classes["product-table-loader"]}>Loading</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      <Table
        id={id}
        data={flatData}
        columns={columns}
        onScroll={(e) => {
          fetchMoreOnBottomReached(e);
          handleScroll(e);
        }}
      />
    </motion.div>
  );
}

export default ProductTable;
