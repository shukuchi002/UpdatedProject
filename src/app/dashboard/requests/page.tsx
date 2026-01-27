"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { RequestType } from "@/types/request";
import {
  getFieldInputType,
  getFieldPattern,
  filterPhoneInput,
} from "@/lib/validation";
import { addToast } from "@/lib/toast";

export default function RequestsPage() {
  const [requests, setRequests] = useState<RequestType[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RequestType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<RequestType | null>(null);
  // Default to showing all so users immediately see requests; users can filter to active/resolved
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "resolved">("all");
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{ isOpen: boolean; id: number | null }>({
    isOpen: false,
    id: null,
  });

  // sortConfig: key is the column to sort by, direction is asc/desc
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: "asc" | "desc" }>({
    key: null,
    direction: "asc",
  });
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!searchRef.current) return;
      if (e.target instanceof Node && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [searchRef]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  const fetchRequests = async () => {
    const res = await fetch("/dashboard/requests/api");
    const data: RequestType[] = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/dashboard/requests/api");
        const data: RequestType[] = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      }
    };

    fetchData();
  }, []);

  const deleteRequest = async (id: number) => {
    try {
      const res = await fetch("/dashboard/requests/api", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      
      if (res.ok) {
        addToast("Request deleted successfully!", "success");
        fetchRequests();
        setSelectedRequest(null);
      } else {
        addToast("Failed to delete request", "error");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      addToast("Error deleting request", "error");
    }
    setDeleteConfirmModal({ isOpen: false, id: null });
  };

  const resolveRequest = async (request: RequestType) => {
    try {
      const res = await fetch("/dashboard/requests/api", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...request, status: "resolved" }),
      });
      
      if (res.ok) {
        addToast("Request marked as resolved!", "success");
        fetchRequests();
        setSelectedRequest(null);
      } else {
        addToast("Failed to resolve request", "error");
      }
    } catch (err) {
      console.error("Resolve failed:", err);
      addToast("Error resolving request", "error");
    }
  };

  const openEditModal = (request: RequestType) => {
    setSelectedRequest(null); // Close view panel
    setEditFormData({ ...request });
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (key: string, value: string) => {
    // Filter phone input to only allow valid characters
    const filteredValue =
      key === "contact" || key === "phone" ? filterPhoneInput(value) : value;

    if (editFormData) {
      setEditFormData({ ...editFormData, [key]: filteredValue });
    }
  };

  const saveEditedRequest = async () => {
    if (!editFormData) return;

    try {
      const res = await fetch("/dashboard/requests/api", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (res.ok) {
        addToast("Request updated successfully!", "success");
        setIsEditModalOpen(false);
        setEditFormData(null);
        fetchRequests();
      } else {
        addToast("Failed to update request", "error");
      }
    } catch (err) {
      console.error("Update failed:", err);
      addToast("Error updating request", "error");
    }
  };

  const viewRequest = (request: RequestType) => setSelectedRequest(request);

  // Filter requests based on status filter
  const filteredRequests = requests.filter((r) => {
    if (statusFilter === "active" && r.status === "resolved") return false;
    if (statusFilter === "resolved" && r.status !== "resolved") return false;
    if (categoryFilter && categoryFilter !== "") {
      if ((r.category || "") !== categoryFilter) return false;
    }
    if (priorityFilter && priorityFilter !== "") {
      if ((r.priority || "") !== priorityFilter) return false;
    }
    if (searchTerm && searchTerm.trim() !== "") {
      const title = (r.title || "").toString().toLowerCase();
      if (!title.includes(searchTerm.trim().toLowerCase())) return false;
    }
    return true; // passes filters
  });

  // quick filter lists
  const categories = useMemo(() => Array.from(new Set(requests.map((r) => r.category).filter(Boolean))) as string[], [requests]);

  // Sorting logic
  const sortedRequests = useMemo(() => {
    const arr = [...filteredRequests];

    if (!sortConfig.key) return arr;

    const direction = sortConfig.direction === "asc" ? 1 : -1;

    // helper for priority ordering
    const priorityRank = (p?: string | number) => {
      if (!p) return 2; // treat missing as medium
      const s = String(p).toLowerCase();
      if (s === "low") return 1;
      if (s === "medium") return 2;
      if (s === "high") return 3;
      return 2;
    };

    arr.sort((a, b) => {
      const key = sortConfig.key;

      if (key === "category") {
        const aa = (a.category || "").toString().toLowerCase();
        const bb = (b.category || "").toString().toLowerCase();
        if (aa < bb) return -1 * direction;
        if (aa > bb) return 1 * direction;
        return (a.id as number) - (b.id as number);
      }

      if (key === "priority") {
        const pa = priorityRank(a.priority);
        const pb = priorityRank(b.priority);
        if (pa < pb) return -1 * direction;
        if (pa > pb) return 1 * direction;
        return (a.id as number) - (b.id as number);
      }

      if (key === "status") {
        // active requests first (status !== 'resolved') when ascending
        const activeA = a.status !== "resolved" ? 0 : 1;
        const activeB = b.status !== "resolved" ? 0 : 1;
        if (activeA < activeB) return -1 * direction;
        if (activeA > activeB) return 1 * direction;
        return (a.id as number) - (b.id as number);
      }

      return 0;
    });

    return arr;
  }, [filteredRequests, sortConfig]);

  // Pagination: compute current page slice
  const totalRequests = sortedRequests.length;
  const totalPages = Math.max(1, Math.ceil(totalRequests / pageSize));

  // compute effective page (don't force state updates in effects)
  const effectivePage = Math.min(currentPage, totalPages);

  const currentPageRequests = useMemo(() => {
    const start = (effectivePage - 1) * pageSize;
    return sortedRequests.slice(start, start + pageSize);
  }, [sortedRequests, effectivePage, pageSize]);

  const handleSort = (key: string) => {
    setSelectedRequest(null);
    setDeleteConfirmModal({ isOpen: false, id: null });
    setSortConfig((prev) => {
      if (prev.key !== key) {
        // start with asc for new column
        setCurrentPage(1);
        return { key, direction: "asc" };
      }
      // toggle direction
      setCurrentPage(1);
      return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Requests</h1>

      {/* KPI cards intentionally omitted here (dashboard page contains KPIs) */}

      {/* Filters combined with search (search aligned to the right like before) */}
      <div className="mb-4 flex items-center">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setStatusFilter("active");
              setSelectedRequest(null);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
              statusFilter === "active" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Active ({requests.filter((r) => r.status !== "resolved").length})
          </button>
          <button
            onClick={() => {
              setStatusFilter("resolved");
              setSelectedRequest(null);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
              statusFilter === "resolved" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Resolved ({requests.filter((r) => r.status === "resolved").length})
          </button>
          <button
            onClick={() => {
              setStatusFilter("all");
              setSelectedRequest(null);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
              statusFilter === "all" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All ({requests.length})
          </button>
        </div>

          <div className="ml-auto relative" ref={searchRef}>
          <div
            className={
              `flex items-center bg-white border border-gray-300 px-3 py-1 shadow-sm w-80 cursor-text ` +
              (isSearchOpen ? "rounded-t-lg border-b-0" : "rounded-lg")
            }
            onClick={() => setIsSearchOpen(true)}
          >
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"></path>
            </svg>
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
                setSelectedRequest(null);
              }}
              placeholder="Search"
              className="w-full outline-none text-gray-800 placeholder-gray-400"
              onFocus={() => setIsSearchOpen(true)}
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
                className="ml-2 text-sm text-gray-500"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {isSearchOpen && (
            <div className="absolute right-0 top-full mt-0 w-80 bg-white border border-gray-200 rounded-b-lg p-3 shadow-lg z-50">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-2 font-semibold">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <div key={c} className="relative">
                        <button
                          onClick={() => {
                            setCategoryFilter((prev) => (prev === c ? null : c));
                            setCurrentPage(1);
                            setSelectedRequest(null);
                          }}
                          className={`min-w-22 flex items-center justify-center px-3 py-1 rounded-full text-sm border ${categoryFilter === c ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
                        >
                          <span className="truncate">{c}</span>
                        </button>
                        {categoryFilter === c && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCategoryFilter(null);
                              setCurrentPage(1);
                            }}
                            className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow"
                            aria-label={`Remove category ${c}`}
                            title="Remove"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-2 font-semibold">Priority</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'Low', label: 'Low' },
                      { value: 'Medium', label: 'Mid' },
                      { value: 'High', label: 'High' },
                    ].map((p) => (
                      <div key={p.value} className="relative">
                        <button
                          onClick={() => {
                            setPriorityFilter((prev) => (prev === p.value ? null : p.value));
                            setCurrentPage(1);
                            setSelectedRequest(null);
                          }}
                          className={`min-w-22 flex items-center justify-center px-3 py-1 rounded-full text-sm border ${priorityFilter === p.value ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
                        >
                          <span className="truncate">{p.label}</span>
                        </button>
                        {priorityFilter === p.value && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPriorityFilter(null);
                              setCurrentPage(1);
                            }}
                            className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow"
                            aria-label={`Remove priority ${p.value}`}
                            title="Remove"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-2 font-semibold">Status</p>
                  <div className="flex flex-wrap gap-2">
                    {['active', 'resolved'].map((s) => (
                      <div key={s} className="relative">
                        <button
                          onClick={() => {
                            setStatusFilter(s as 'active' | 'resolved');
                            setCurrentPage(1);
                            setSelectedRequest(null);
                          }}
                          className={`min-w-22 flex items-center justify-center px-3 py-1 rounded-full text-sm border ${statusFilter === s ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
                        >
                          <span className="truncate">{s === 'active' ? 'Active' : 'Resolved'}</span>
                        </button>
                        {statusFilter === s && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setStatusFilter('all');
                              setCurrentPage(1);
                            }}
                            className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow"
                            aria-label={`Remove status ${s}`}
                            title="Remove"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-3 mt-2">
                  <div className="mt-1">
                    <button
                      onClick={() => {
                        setCategoryFilter(null);
                        setPriorityFilter(null);
                        setStatusFilter('all');
                        setSelectedRequest(null);
                      }}
                      className="px-3 py-1 rounded text-sm bg-gray-100 text-gray-800 border border-gray-200"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Title</th>
              <th className="px-6 py-4 text-left font-semibold">
                <button
                  className="flex items-center gap-2"
                  onClick={() => handleSort("category")}
                >
                  <span>Category</span>
                  <span className="ml-2">
                    <span
                      className={
                        `inline-flex items-center justify-center w-6 h-6 text-xs rounded border transition-colors ` +
                        (sortConfig.key === "category"
                          ? "bg-white text-gray-900 border-gray-200"
                          : "bg-transparent text-gray-300 border-gray-400")
                      }
                      aria-hidden
                    >
                      {sortConfig.key === "category"
                        ? sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"
                        : "↕"}
                    </span>
                  </span>
                </button>
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                <button
                  className="flex items-center gap-2"
                  onClick={() => handleSort("priority")}
                >
                  <span>Priority</span>
                  <span className="ml-2">
                    <span
                      className={
                        `inline-flex items-center justify-center w-6 h-6 text-xs rounded border transition-colors ` +
                        (sortConfig.key === "priority"
                          ? "bg-white text-gray-900 border-gray-200"
                          : "bg-transparent text-gray-300 border-gray-400")
                      }
                      aria-hidden
                    >
                      {sortConfig.key === "priority"
                        ? sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"
                        : "↕"}
                    </span>
                  </span>
                </button>
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                <button
                  className="flex items-center gap-2"
                  onClick={() => handleSort("status")}
                >
                  <span>Status</span>
                  <span className="ml-2">
                    <span
                      className={
                        `inline-flex items-center justify-center w-6 h-6 text-xs rounded border transition-colors ` +
                        (sortConfig.key === "status"
                          ? "bg-white text-gray-900 border-gray-200"
                          : "bg-transparent text-gray-300 border-gray-400")
                      }
                      aria-hidden
                    >
                      {sortConfig.key === "status"
                        ? sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"
                        : "↕"}
                    </span>
                  </span>
                </button>
              </th>
              <th className="px-6 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageRequests.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">{r.title}</td>
                <td className="px-6 py-4 text-gray-700">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {r.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    r.priority === "High" ? "bg-red-100 text-red-800" :
                    r.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {r.priority || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    r.status === "resolved"
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}>
                    {r.status === "resolved" ? "Resolved" : "Active"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    {/* View (eye) */}
                    <button
                      onClick={() => viewRequest(r)}
                      title="View"
                      aria-label="View request"
                      className="w-9 h-9 flex items-center justify-center rounded border transition cursor-pointer bg-blue-700 hover:bg-blue-800 text-white"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
                      </svg>
                    </button>

                    {/* Resolved (check) */}
                    {r.status !== "resolved" && (
                      <button
                        onClick={() => resolveRequest(r)}
                        title="Mark resolved"
                        aria-label="Mark request as resolved"
                        className="w-9 h-9 flex items-center justify-center rounded border transition cursor-pointer bg-green-700 hover:bg-green-800 text-white"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    )}

                    {/* Delete (trash) */}
                    <button
                      onClick={() => setDeleteConfirmModal({ isOpen: true, id: r.id })}
                      title="Delete"
                      aria-label="Delete request"
                      className="w-9 h-9 flex items-center justify-center rounded border transition cursor-pointer bg-red-700 hover:bg-red-800 text-white"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalRequests === 0 && (
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-yellow-800">No requests found for the current filters.</p>
          <div className="mt-2">
            <button
              onClick={() => {
                setCategoryFilter(null);
                setPriorityFilter(null);
                setStatusFilter('all');
                setSearchTerm('');
                setSelectedRequest(null);
              }}
              className="px-3 py-1 bg-white border rounded text-sm"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* View Details Section */}
      {selectedRequest && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-600">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Request Details</h2>
            <div className="flex gap-2">
              <button
                className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded font-medium transition cursor-pointer"
                onClick={() => openEditModal(selectedRequest)}
              >
                Edit
              </button>
              <button
                className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
                onClick={() => setSelectedRequest(null)}
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(selectedRequest).map(([key, value]) => {
              if (key === "id") return null;
              return (
                <div key={key} className="border-b pb-3">
                  <p className="text-sm text-gray-600 font-semibold uppercase">{key}</p>
                  <p className="text-lg text-gray-800 mt-1">{value || "N/A"}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Edit Modal - Inline Panel */}
      {isEditModalOpen && editFormData && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border-l-4 border-gray-900">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Request</h2>
            <button
              className="text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => {
                setIsEditModalOpen(false);
                setEditFormData(null);
              }}
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {Object.entries(editFormData).map(([key, value]) => {
              if (key === "id") return null;
              
              const inputType = getFieldInputType(key);
              const pattern = getFieldPattern(key);
              
              return (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    {key}
                  </label>
                  {key === "description" ? (
                    <textarea
                      value={value || ""}
                      onChange={(e) => handleEditInputChange(key, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 min-h-32"
                      placeholder={`Enter ${key}`}
                    />
                  ) : key === "priority" ? (
                    <select
                      value={value || ""}
                      onChange={(e) => handleEditInputChange(key, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer"
                    >
                      <option value="">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  ) : (
                    <input
                      type={inputType}
                      value={value || ""}
                      onChange={(e) => handleEditInputChange(key, e.target.value)}
                      pattern={pattern}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder={`Enter ${key}`}
                      title={inputType === "tel" ? "Phone number can contain numbers, dashes, parentheses, and plus sign" : ""}
                    />
                  )}
                </div>
              );
            })}
          </div>

            <div className="sticky bottom-0 bg-gray-100 px-6 py-4 flex justify-end gap-3">
              <button
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition cursor-pointer"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditFormData(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-gray-900 hover:bg-black text-white font-medium rounded-lg transition cursor-pointer"
                onClick={saveEditedRequest}
              >
                Save Changes
              </button>
            </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmModal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 pointer-events-auto">
            <div className="bg-red-50 px-6 py-4 border-b border-red-200">
              <h2 className="text-xl font-bold text-red-700">Delete Request</h2>
            </div>

            <div className="px-6 py-6">
              <p className="text-gray-700 text-base mb-4">
                Are you sure you want to delete this request? This action cannot be undone.
              </p>
              <p className="text-sm text-gray-500">
                The request will be marked as deleted and will no longer appear in your dashboard.
              </p>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition cursor-pointer"
                onClick={() => setDeleteConfirmModal({ isOpen: false, id: null })}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition cursor-pointer"
                onClick={() => {
                  if (deleteConfirmModal.id) {
                    deleteRequest(deleteConfirmModal.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Pagination controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {Math.min((currentPage - 1) * pageSize + 1, totalRequests || 0)} - {Math.min(currentPage * pageSize, totalRequests)} of {totalRequests}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-gray-800 text-white'}`}
            >
              Prev
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                // show up to 5 page buttons centered around current
                if (totalPages > 7) {
                  if (page !== 1 && page !== totalPages && Math.abs(page - currentPage) > 2) {
                    // skip rendering in-between pages to keep control compact
                    return null;
                  }
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded ${page === currentPage ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border'}`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-gray-800 text-white'}`}
            >
              Next
            </button>
          </div>
        </div>
    </div>
  );
}
