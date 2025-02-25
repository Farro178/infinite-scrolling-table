import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import classes from "./styles.module.scss";

const ESTIMATED_SIZE = 30;

interface TableProps<T> {
  id: string;
  data: T[];
  columns: ColumnDef<T>[];
  onScroll: (containerRefElement?: HTMLDivElement | null | undefined) => void;
}

function Table<T>({ id, data, columns, onScroll }: TableProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => ESTIMATED_SIZE,
    getScrollElement: () => containerRef.current,
  });

  useEffect(() => {
    onScroll(containerRef.current);
  }, [onScroll]);

  return (
    <div
      id={`${id}-table`}
      className={classes["table__container"]}
      onScroll={(e) => onScroll(e.target as HTMLDivElement)}
      ref={containerRef}
    >
      <table role="table">
        <thead className={classes["table__header"]}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className={classes["table__row"]}
              role="row"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className={classes["table__cell"]}
                    key={header.id}
                    style={{
                      background: "white",
                      width: header.getSize(),
                    }}
                    scope="col"
                    role="columnheader"
                  >
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody
          style={{
            display: "grid",
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<T>;
            return (
              <tr
                className={classes["table__row"]}
                data-index={virtualRow.index}
                ref={(node) => rowVirtualizer.measureElement(node)}
                key={row.id}
                style={{
                  position: "absolute",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                role="row"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      className={classes["table__cell"]}
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                      }}
                      role="cell"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
