"use client"

import {
  CellContext,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmployeeData } from "@/src/http/@types/employee/employee"

interface EmployeeTableProps {
  data: EmployeeData[]
}

export function DataTable({ data }: EmployeeTableProps) {
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      size: 200,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 250,
    },
    {
      accessorKey: "birth_date",
      header: "Data de Aniversário",
      size: 150,
      cell: (info: CellContext<EmployeeData, string>) =>
        new Date(info.getValue() as string).toLocaleDateString(),
    },
    {
      accessorKey: "job_title",
      header: "Trabalho",
      size: 150,
    },
    {
      accessorKey: "department",
      header: "Departamento",
      size: 200,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
