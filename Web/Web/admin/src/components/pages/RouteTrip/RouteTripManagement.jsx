import React, { useEffect, useState } from "react";
import { getRouteTrips, deleteRouteTrip } from "../../../services/apiRouteTrip";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import RouteTripAction from "./RouteTripAction";
import styles from "../User/UserManagement.module.css";

export default function RouteTripManagement() {
  const [routeTrips, setRouteTrips] = useState([]);
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRouteTrips();
  }, []);

  const fetchRouteTrips = async () => {
    try {
      const data = await getRouteTrips();
      setRouteTrips(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách RouteTrip:", error);
      setError("Không thể tải danh sách RouteTrip.");
    }
  };

  const handleDelete = async () => {
    if (selectedTrips.length === 0) return;
    if (!window.confirm(`Xoá ${selectedTrips.length} chuyến?`)) return;

    try {
      await Promise.all(selectedTrips.map((id) => deleteRouteTrip(id)));
      setRouteTrips(routeTrips.filter((r) => !selectedTrips.includes(r.id)));
      setSelectedTrips([]);
    } catch (err) {
      console.error("Xoá thất bại:", err);
      setError("Không thể xoá chuyến.");
    }
  };

  const handleSelect = (id) => {
    setSelectedTrips((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedTrips.length === routeTrips.length) {
      setSelectedTrips([]);
    } else {
      setSelectedTrips(routeTrips.map((r) => r.id));
    }
  };

  const columns = [
    {
      id: "select",
      header: () => (
        <input
          type="checkbox"
          checked={selectedTrips.length === routeTrips.length && routeTrips.length > 0}
          onChange={handleSelectAll}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedTrips.includes(row.original.id)}
          onChange={() => handleSelect(row.original.id)}
        />
      ),
    },
    { accessorKey: "id", header: "ID" },
    { accessorKey: "driverName", header: "Tài xế" },
    { accessorKey: "vehiclePlate", header: "Biển số xe" },
    { accessorKey: "routeName", header: "Tuyến đường" },
    { accessorKey: "departureTime", header: "Giờ đi" },
    { accessorKey: "arrivalTime", header: "Giờ đến" },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: (info) => (
        <span className={info.getValue() === 1 ? styles.activeStatus : styles.inactiveStatus}>
          {info.getValue() === 1 ? "✔ Hoạt động" : "❌ Huỷ"}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data: routeTrips,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className={styles.userManagement}>
      <RouteTripAction
        routeTrips={routeTrips}
        selectedTrips={selectedTrips}
        refreshRouteTrips={fetchRouteTrips}
        onDelete={handleDelete}
      />

      <div className={styles.searchContainer}>
        <i className={`fas fa-search ${styles.searchIcon}`}></i>
        <input
          type="text"
          placeholder="Tìm chuyến theo tuyến, tài xế, xe..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.excelTable}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={styles.sortableHeader}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={
                    selectedTrips.includes(row.original.id) ? styles.selectedRow : ""
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="100%" className={styles.noData}>
                  Không tìm thấy chuyến nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
