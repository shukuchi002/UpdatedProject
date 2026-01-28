(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/validation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Field validation utilities for form inputs
 */ __turbopack_context__.s([
    "filterPhoneInput",
    ()=>filterPhoneInput,
    "getFieldInputType",
    ()=>getFieldInputType,
    "getFieldPattern",
    ()=>getFieldPattern,
    "validateFieldInput",
    ()=>validateFieldInput,
    "validateFormData",
    ()=>validateFormData
]);
const getFieldInputType = (fieldName)=>{
    const lowerField = fieldName.toLowerCase();
    if (lowerField.includes("phone") || lowerField.includes("contact")) {
        return "tel";
    }
    if (lowerField.includes("email")) {
        return "email";
    }
    if (lowerField.includes("date")) {
        return "date";
    }
    if (lowerField.includes("ip")) {
        return "text";
    }
    return "text";
};
const getFieldPattern = (fieldName)=>{
    const lowerField = fieldName.toLowerCase();
    if (lowerField.includes("phone") || lowerField.includes("contact")) {
        return "[0-9\\-()\\+ ]*";
    }
    return undefined;
};
const validateFieldInput = (fieldName, value)=>{
    if (!value) {
        return {
            valid: true
        }; // Empty is valid for optional fields
    }
    const lowerField = fieldName.toLowerCase();
    // Phone/Contact validation - only numbers, dashes, parentheses, plus, spaces
    if (lowerField.includes("phone") || lowerField.includes("contact")) {
        const phoneRegex = /^[0-9\-()+ ]*$/;
        if (!phoneRegex.test(value)) {
            return {
                valid: false,
                error: "Phone number can only contain numbers, dashes, parentheses, plus sign, and spaces"
            };
        }
        return {
            valid: true
        };
    }
    // Email validation
    if (lowerField.includes("email")) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return {
                valid: false,
                error: "Please enter a valid email address"
            };
        }
        return {
            valid: true
        };
    }
    // Title - should not be empty if required
    if (lowerField.includes("title")) {
        if (value.trim().length === 0) {
            return {
                valid: false,
                error: "Title cannot be empty"
            };
        }
        if (value.length > 100) {
            return {
                valid: false,
                error: "Title must be 100 characters or less"
            };
        }
        return {
            valid: true
        };
    }
    // Description - should not be empty if required
    if (lowerField.includes("description")) {
        if (value.trim().length === 0) {
            return {
                valid: false,
                error: "Description cannot be empty"
            };
        }
        if (value.length > 500) {
            return {
                valid: false,
                error: "Description must be 500 characters or less"
            };
        }
        return {
            valid: true
        };
    }
    // Default validation
    return {
        valid: true
    };
};
const validateFormData = (data)=>{
    const errors = {};
    Object.entries(data).forEach(([key, value])=>{
        const result = validateFieldInput(key, value);
        if (!result.valid && result.error) {
            errors[key] = result.error;
        }
    });
    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
};
const filterPhoneInput = (value)=>{
    // Allow numbers, dashes, parentheses, plus sign, and spaces
    return value.replace(/[^0-9\-()+ ]/g, "");
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/dashboard/requests/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RequestsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function RequestsPage() {
    _s();
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedRequest, setSelectedRequest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isEditModalOpen, setIsEditModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editFormData, setEditFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Default to showing all so users immediately see requests; users can filter to active/resolved
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [deleteConfirmModal, setDeleteConfirmModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        id: null
    });
    // sortConfig: key is the column to sort by, direction is asc/desc
    const [sortConfig, setSortConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        key: null,
        direction: "asc"
    });
    const [pageSize, setPageSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSearchOpen, setIsSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const searchRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RequestsPage.useEffect": ()=>{
            const onDocClick = {
                "RequestsPage.useEffect.onDocClick": (e)=>{
                    if (!searchRef.current) return;
                    if (e.target instanceof Node && !searchRef.current.contains(e.target)) {
                        setIsSearchOpen(false);
                    }
                }
            }["RequestsPage.useEffect.onDocClick"];
            document.addEventListener("mousedown", onDocClick);
            return ({
                "RequestsPage.useEffect": ()=>document.removeEventListener("mousedown", onDocClick)
            })["RequestsPage.useEffect"];
        }
    }["RequestsPage.useEffect"], [
        searchRef
    ]);
    const [categoryFilter, setCategoryFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [priorityFilter, setPriorityFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchRequests = async ()=>{
        const res = await fetch("/dashboard/requests/api");
        const data = await res.json();
        setRequests(data);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RequestsPage.useEffect": ()=>{
            const fetchData = {
                "RequestsPage.useEffect.fetchData": async ()=>{
                    try {
                        const res = await fetch("/dashboard/requests/api");
                        const data = await res.json();
                        setRequests(data);
                    } catch (err) {
                        console.error("Failed to fetch requests:", err);
                    }
                }
            }["RequestsPage.useEffect.fetchData"];
            fetchData();
        }
    }["RequestsPage.useEffect"], []);
    const deleteRequest = async (id)=>{
        try {
            const res = await fetch("/dashboard/requests/api", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id
                })
            });
            if (res.ok) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToast"])("Request deleted successfully!", "success");
                fetchRequests();
                setSelectedRequest(null);
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToast"])("Failed to delete request", "error");
            }
        } catch (err) {
            console.error("Delete failed:", err);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToast"])("Error deleting request", "error");
        }
        setDeleteConfirmModal({
            isOpen: false,
            id: null
        });
    };
    const resolveRequest = async (request)=>{
        try {
            const res = await fetch("/dashboard/requests/api", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...request,
                    status: "resolved"
                })
            });
            if (res.ok) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToast"])("Request marked as resolved!", "success");
                fetchRequests();
                setSelectedRequest(null);
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToast"])("Failed to resolve request", "error");
            }
        } catch (err) {
            console.error("Resolve failed:", err);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToast"])("Error resolving request", "error");
        }
    };
    const openEditModal = (request)=>{
        setSelectedRequest(null); // Close view panel
        setEditFormData({
            ...request
        });
        setIsEditModalOpen(true);
    };
    const handleEditInputChange = (key, value)=>{
        // Filter phone input to only allow valid characters
        const filteredValue = key === "contact" || key === "phone" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filterPhoneInput"])(value) : value;
        if (editFormData) {
            setEditFormData({
                ...editFormData,
                [key]: filteredValue
            });
        }
    };
    const saveEditedRequest = async ()=>{
        if (!editFormData) return;
        try {
            const res = await fetch("/dashboard/requests/api", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editFormData)
            });
            if (res.ok) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToast"])("Request updated successfully!", "success");
                setIsEditModalOpen(false);
                setEditFormData(null);
                fetchRequests();
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToast"])("Failed to update request", "error");
            }
        } catch (err) {
            console.error("Update failed:", err);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToast"])("Error updating request", "error");
        }
    };
    const viewRequest = (request)=>setSelectedRequest(request);
    // Filter requests based on status filter
    const filteredRequests = requests.filter((r)=>{
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
            const requestId = (r.requestId || "").toString();
            if (!title.includes(searchTerm.trim().toLowerCase()) && !requestId.includes(searchTerm.trim())) return false;
        }
        return true; // passes filters
    });
    // quick filter lists
    const categories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RequestsPage.useMemo[categories]": ()=>Array.from(new Set(requests.map({
                "RequestsPage.useMemo[categories]": (r)=>r.category
            }["RequestsPage.useMemo[categories]"]).filter(Boolean)))
    }["RequestsPage.useMemo[categories]"], [
        requests
    ]);
    // Sorting logic
    const sortedRequests = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RequestsPage.useMemo[sortedRequests]": ()=>{
            const arr = [
                ...filteredRequests
            ];
            if (!sortConfig.key) return arr;
            const direction = sortConfig.direction === "asc" ? 1 : -1;
            // helper for priority ordering
            const priorityRank = {
                "RequestsPage.useMemo[sortedRequests].priorityRank": (p)=>{
                    if (!p) return 2; // treat missing as medium
                    const s = String(p).toLowerCase();
                    if (s === "low") return 1;
                    if (s === "medium") return 2;
                    if (s === "high") return 3;
                    return 2;
                }
            }["RequestsPage.useMemo[sortedRequests].priorityRank"];
            arr.sort({
                "RequestsPage.useMemo[sortedRequests]": (a, b)=>{
                    const key = sortConfig.key;
                    if (key === "category") {
                        const aa = (a.category || "").toString().toLowerCase();
                        const bb = (b.category || "").toString().toLowerCase();
                        if (aa < bb) return -1 * direction;
                        if (aa > bb) return 1 * direction;
                        return a.id - b.id;
                    }
                    if (key === "priority") {
                        const pa = priorityRank(a.priority);
                        const pb = priorityRank(b.priority);
                        if (pa < pb) return -1 * direction;
                        if (pa > pb) return 1 * direction;
                        return a.id - b.id;
                    }
                    if (key === "status") {
                        // active requests first (status !== 'resolved') when ascending
                        const activeA = a.status !== "resolved" ? 0 : 1;
                        const activeB = b.status !== "resolved" ? 0 : 1;
                        if (activeA < activeB) return -1 * direction;
                        if (activeA > activeB) return 1 * direction;
                        return a.id - b.id;
                    }
                    return 0;
                }
            }["RequestsPage.useMemo[sortedRequests]"]);
            return arr;
        }
    }["RequestsPage.useMemo[sortedRequests]"], [
        filteredRequests,
        sortConfig
    ]);
    // Pagination: compute current page slice
    const totalRequests = sortedRequests.length;
    const totalPages = Math.max(1, Math.ceil(totalRequests / pageSize));
    // compute effective page (don't force state updates in effects)
    const effectivePage = Math.min(currentPage, totalPages);
    const currentPageRequests = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RequestsPage.useMemo[currentPageRequests]": ()=>{
            const start = (effectivePage - 1) * pageSize;
            return sortedRequests.slice(start, start + pageSize);
        }
    }["RequestsPage.useMemo[currentPageRequests]"], [
        sortedRequests,
        effectivePage,
        pageSize
    ]);
    const handleSort = (key)=>{
        setSelectedRequest(null);
        setDeleteConfirmModal({
            isOpen: false,
            id: null
        });
        setSortConfig((prev)=>{
            if (prev.key !== key) {
                // start with asc for new column
                setCurrentPage(1);
                return {
                    key,
                    direction: "asc"
                };
            }
            // toggle direction
            setCurrentPage(1);
            return {
                key,
                direction: prev.direction === "asc" ? "desc" : "asc"
            };
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold mb-6 text-gray-800",
                children: "Requests"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setStatusFilter("active");
                                    setSelectedRequest(null);
                                    setCurrentPage(1);
                                },
                                className: `px-4 py-2 rounded-lg font-medium transition cursor-pointer ${statusFilter === "active" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`,
                                children: [
                                    "Active (",
                                    requests.filter((r)=>r.status !== "resolved").length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 266,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setStatusFilter("resolved");
                                    setSelectedRequest(null);
                                    setCurrentPage(1);
                                },
                                className: `px-4 py-2 rounded-lg font-medium transition cursor-pointer ${statusFilter === "resolved" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`,
                                children: [
                                    "Resolved (",
                                    requests.filter((r)=>r.status === "resolved").length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setStatusFilter("all");
                                    setSelectedRequest(null);
                                    setCurrentPage(1);
                                },
                                className: `px-4 py-2 rounded-lg font-medium transition cursor-pointer ${statusFilter === "all" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`,
                                children: [
                                    "All (",
                                    requests.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 290,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                        lineNumber: 265,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto relative",
                        ref: searchRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex items-center bg-white border border-gray-300 px-3 py-1 shadow-sm w-80 cursor-text ` + (isSearchOpen ? "rounded-t-lg border-b-0" : "rounded-lg"),
                                onClick: ()=>setIsSearchOpen(true),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5 text-gray-400 mr-2",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                            lineNumber: 313,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 312,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: searchTerm,
                                        onChange: (e)=>{
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                            setSelectedRequest(null);
                                        },
                                        placeholder: "Search",
                                        className: "w-full outline-none text-gray-800 placeholder-gray-400",
                                        onFocus: ()=>setIsSearchOpen(true)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 315,
                                        columnNumber: 13
                                    }, this),
                                    searchTerm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setSearchTerm("");
                                            setCurrentPage(1);
                                        },
                                        className: "ml-2 text-sm text-gray-500",
                                        "aria-label": "Clear search",
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 327,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 305,
                                columnNumber: 11
                            }, this),
                            isSearchOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-0 top-full mt-0 w-80 bg-white border border-gray-200 rounded-b-lg p-3 shadow-lg z-50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-500 mb-2 font-semibold",
                                                    children: "Category"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        setCategoryFilter((prev)=>prev === c ? null : c);
                                                                        setCurrentPage(1);
                                                                        setSelectedRequest(null);
                                                                    },
                                                                    className: `min-w-22 flex items-center justify-center px-3 py-1 rounded-full text-sm border ${categoryFilter === c ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "truncate",
                                                                        children: c
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                                        lineNumber: 356,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                                    lineNumber: 348,
                                                                    columnNumber: 25
                                                                }, this),
                                                                categoryFilter === c && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: (e)=>{
                                                                        e.stopPropagation();
                                                                        setCategoryFilter(null);
                                                                        setCurrentPage(1);
                                                                    },
                                                                    className: "absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow",
                                                                    "aria-label": `Remove category ${c}`,
                                                                    title: "Remove",
                                                                    children: "×"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                                    lineNumber: 359,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, c, true, {
                                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                            lineNumber: 347,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                            lineNumber: 343,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-500 mb-2 font-semibold",
                                                    children: "Priority"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: [
                                                        {
                                                            value: 'Low',
                                                            label: 'Low'
                                                        },
                                                        {
                                                            value: 'Medium',
                                                            label: 'Mid'
                                                        },
                                                        {
                                                            value: 'High',
                                                            label: 'High'
                                                        }
                                                    ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        setPriorityFilter((prev)=>prev === p.value ? null : p.value);
                                                                        setCurrentPage(1);
                                                                        setSelectedRequest(null);
                                                                    },
                                                                    className: `min-w-22 flex items-center justify-center px-3 py-1 rounded-full text-sm border ${priorityFilter === p.value ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "truncate",
                                                                        children: p.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                                        lineNumber: 394,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                                    lineNumber: 386,
                                                                    columnNumber: 25
                                                                }, this),
                                                                priorityFilter === p.value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: (e)=>{
                                                                        e.stopPropagation();
                                                                        setPriorityFilter(null);
                                                                        setCurrentPage(1);
                                                                    },
                                                                    className: "absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow",
                                                                    "aria-label": `Remove priority ${p.value}`,
                                                                    title: "Remove",
                                                                    children: "×"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                                    lineNumber: 397,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, p.value, true, {
                                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                            lineNumber: 385,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                    lineNumber: 379,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                            lineNumber: 377,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-500 mb-2 font-semibold",
                                                    children: "Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: [
                                                        'active',
                                                        'resolved'
                                                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        setStatusFilter(s);
                                                                        setCurrentPage(1);
                                                                        setSelectedRequest(null);
                                                                    },
                                                                    className: `min-w-22 flex items-center justify-center px-3 py-1 rounded-full text-sm border ${statusFilter === s ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "truncate",
                                                                        children: s === 'active' ? 'Active' : 'Resolved'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                                        lineNumber: 428,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                                    lineNumber: 420,
                                                                    columnNumber: 25
                                                                }, this),
                                                                statusFilter === s && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: (e)=>{
                                                                        e.stopPropagation();
                                                                        setStatusFilter('all');
                                                                        setCurrentPage(1);
                                                                    },
                                                                    className: "absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow",
                                                                    "aria-label": `Remove status ${s}`,
                                                                    title: "Remove",
                                                                    children: "×"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                                    lineNumber: 431,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, s, true, {
                                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                            lineNumber: 419,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                    lineNumber: 417,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                            lineNumber: 415,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "col-span-3 mt-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setCategoryFilter(null);
                                                        setPriorityFilter(null);
                                                        setStatusFilter('all');
                                                        setSelectedRequest(null);
                                                    },
                                                    className: "px-3 py-1 rounded text-sm bg-gray-100 text-gray-800 border border-gray-200",
                                                    children: "Clear"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                    lineNumber: 451,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                lineNumber: 450,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                            lineNumber: 449,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                    lineNumber: 342,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 341,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                        lineNumber: 304,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                lineNumber: 264,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow-md overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-gray-900 text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-4 text-left font-semibold",
                                        children: "Request ID"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 474,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-4 text-left font-semibold",
                                        children: "Title"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 475,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-4 text-left font-semibold",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "flex items-center gap-2",
                                            onClick: ()=>handleSort("category"),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Category"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                    lineNumber: 481,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `inline-flex items-center justify-center w-6 h-6 text-xs rounded border transition-colors ` + (sortConfig.key === "category" ? "bg-white text-gray-900 border-gray-200" : "bg-transparent text-gray-300 border-gray-400"),
                                                        "aria-hidden": true,
                                                        children: sortConfig.key === "category" ? sortConfig.direction === "asc" ? "▲" : "▼" : "↕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                        lineNumber: 483,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                    lineNumber: 482,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                            lineNumber: 477,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 476,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-4 text-left font-semibold",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "flex items-center gap-2",
                                            onClick: ()=>handleSort("priority"),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Priority"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                    lineNumber: 506,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `inline-flex items-center justify-center w-6 h-6 text-xs rounded border transition-colors ` + (sortConfig.key === "priority" ? "bg-white text-gray-900 border-gray-200" : "bg-transparent text-gray-300 border-gray-400"),
                                                        "aria-hidden": true,
                                                        children: sortConfig.key === "priority" ? sortConfig.direction === "asc" ? "▲" : "▼" : "↕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                        lineNumber: 508,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                    lineNumber: 507,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                            lineNumber: 502,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 501,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-4 text-left font-semibold",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "flex items-center gap-2",
                                            onClick: ()=>handleSort("status"),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                    lineNumber: 531,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `inline-flex items-center justify-center w-6 h-6 text-xs rounded border transition-colors ` + (sortConfig.key === "status" ? "bg-white text-gray-900 border-gray-200" : "bg-transparent text-gray-300 border-gray-400"),
                                                        "aria-hidden": true,
                                                        children: sortConfig.key === "status" ? sortConfig.direction === "asc" ? "▲" : "▼" : "↕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                        lineNumber: 533,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                    lineNumber: 532,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                            lineNumber: 527,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 526,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-4 text-center font-semibold",
                                        children: "Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 551,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 473,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                            lineNumber: 472,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: currentPageRequests.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b hover:bg-gray-50 transition",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 font-mono text-gray-800",
                                            children: r.requestId
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                            lineNumber: 557,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 font-medium text-gray-800",
                                            children: r.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                            lineNumber: 558,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 text-gray-700",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm",
                                                children: r.category
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                lineNumber: 560,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                            lineNumber: 559,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 text-gray-700",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `px-3 py-1 rounded-full text-sm font-semibold ${r.priority === "High" ? "bg-red-100 text-red-800" : r.priority === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`,
                                                children: r.priority || "N/A"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                lineNumber: 565,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                            lineNumber: 564,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 text-gray-700",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `px-3 py-1 rounded-full text-sm font-semibold ${r.status === "resolved" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`,
                                                children: r.status === "resolved" ? "Resolved" : "Active"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                lineNumber: 574,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                            lineNumber: 573,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 text-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>viewRequest(r),
                                                        title: "View",
                                                        "aria-label": "View request",
                                                        className: "w-9 h-9 flex items-center justify-center rounded border transition cursor-pointer bg-blue-700 hover:bg-blue-800 text-white",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: "2",
                                                                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                                    lineNumber: 592,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: "2",
                                                                    d: "M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                                    lineNumber: 593,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                            lineNumber: 591,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                        lineNumber: 585,
                                                        columnNumber: 21
                                                    }, this),
                                                    r.status !== "resolved" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>resolveRequest(r),
                                                        title: "Mark resolved",
                                                        "aria-label": "Mark request as resolved",
                                                        className: "w-9 h-9 flex items-center justify-center rounded border transition cursor-pointer bg-green-700 hover:bg-green-800 text-white",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: "2",
                                                                d: "M5 13l4 4L19 7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                                lineNumber: 606,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                            lineNumber: 605,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                        lineNumber: 599,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setDeleteConfirmModal({
                                                                isOpen: true,
                                                                id: r.id
                                                            }),
                                                        title: "Delete",
                                                        "aria-label": "Delete request",
                                                        className: "w-9 h-9 flex items-center justify-center rounded border transition cursor-pointer bg-red-700 hover:bg-red-800 text-white",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: "2",
                                                                d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                                lineNumber: 619,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                            lineNumber: 618,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                        lineNumber: 612,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                lineNumber: 583,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                            lineNumber: 582,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, r.id, true, {
                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                    lineNumber: 556,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                            lineNumber: 554,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                    lineNumber: 471,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                lineNumber: 470,
                columnNumber: 7
            }, this),
            totalRequests === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-yellow-800",
                        children: "No requests found for the current filters."
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                        lineNumber: 632,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setCategoryFilter(null);
                                setPriorityFilter(null);
                                setStatusFilter('all');
                                setSearchTerm('');
                                setSelectedRequest(null);
                            },
                            className: "px-3 py-1 bg-white border rounded text-sm",
                            children: "Clear filters"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                            lineNumber: 634,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                        lineNumber: 633,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                lineNumber: 631,
                columnNumber: 9
            }, this),
            selectedRequest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-gray-800",
                                children: "Request Details"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 654,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded font-medium transition cursor-pointer",
                                        onClick: ()=>openEditModal(selectedRequest),
                                        children: "Edit"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 656,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "text-gray-500 hover:text-gray-700 text-2xl cursor-pointer",
                                        onClick: ()=>setSelectedRequest(null),
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 662,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 655,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                        lineNumber: 653,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-6",
                        children: Object.entries(selectedRequest).map(([key, value])=>{
                            if (key === "id") return null;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-b pb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 font-semibold uppercase",
                                        children: key
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 676,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg text-gray-800 mt-1",
                                        children: value || "N/A"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 677,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 675,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                        lineNumber: 671,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                lineNumber: 652,
                columnNumber: 9
            }, this),
            isEditModalOpen && editFormData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 p-6 bg-white rounded-lg shadow-lg border-l-4 border-gray-900",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-gray-800",
                                children: "Edit Request"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 689,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-gray-500 hover:text-gray-700 text-2xl",
                                onClick: ()=>{
                                    setIsEditModalOpen(false);
                                    setEditFormData(null);
                                },
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 690,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                        lineNumber: 688,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-6",
                        children: Object.entries(editFormData).map(([key, value])=>{
                            if (key === "id") return null;
                            const inputType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFieldInputType"])(key);
                            const pattern = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFieldPattern"])(key);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-700 mb-2 uppercase",
                                        children: key
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 710,
                                        columnNumber: 19
                                    }, this),
                                    key === "description" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: value || "",
                                        onChange: (e)=>handleEditInputChange(key, e.target.value),
                                        className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 min-h-32",
                                        placeholder: `Enter ${key}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 714,
                                        columnNumber: 21
                                    }, this) : key === "priority" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: value || "",
                                        onChange: (e)=>handleEditInputChange(key, e.target.value),
                                        className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select Priority"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                lineNumber: 726,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "High",
                                                children: "High"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                lineNumber: 727,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Medium",
                                                children: "Medium"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                lineNumber: 728,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Low",
                                                children: "Low"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                                lineNumber: 729,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 721,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: inputType,
                                        value: value || "",
                                        onChange: (e)=>handleEditInputChange(key, e.target.value),
                                        pattern: pattern,
                                        className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900",
                                        placeholder: `Enter ${key}`,
                                        title: inputType === "tel" ? "Phone number can contain numbers, dashes, parentheses, and plus sign" : ""
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 732,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 709,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                        lineNumber: 701,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky bottom-0 bg-gray-100 px-6 py-4 flex justify-end gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition cursor-pointer",
                                onClick: ()=>{
                                    setIsEditModalOpen(false);
                                    setEditFormData(null);
                                },
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 748,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "px-6 py-2 bg-gray-900 hover:bg-black text-white font-medium rounded-lg transition cursor-pointer",
                                onClick: saveEditedRequest,
                                children: "Save Changes"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 757,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                        lineNumber: 747,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                lineNumber: 687,
                columnNumber: 9
            }, this),
            deleteConfirmModal.isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 flex items-center justify-center z-40 pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 pointer-events-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-red-50 px-6 py-4 border-b border-red-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold text-red-700",
                                children: "Delete Request"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 772,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                            lineNumber: 771,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-6 py-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-700 text-base mb-4",
                                    children: "Are you sure you want to delete this request? This action cannot be undone."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                    lineNumber: 776,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500",
                                    children: "The request will be marked as deleted and will no longer appear in your dashboard."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                    lineNumber: 779,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                            lineNumber: 775,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition cursor-pointer",
                                    onClick: ()=>setDeleteConfirmModal({
                                            isOpen: false,
                                            id: null
                                        }),
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                    lineNumber: 785,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition cursor-pointer",
                                    onClick: ()=>{
                                        if (deleteConfirmModal.id) {
                                            deleteRequest(deleteConfirmModal.id);
                                        }
                                    },
                                    children: "Delete"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                    lineNumber: 791,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/requests/page.tsx",
                            lineNumber: 784,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/requests/page.tsx",
                    lineNumber: 770,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                lineNumber: 769,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-600",
                        children: [
                            "Showing ",
                            Math.min((currentPage - 1) * pageSize + 1, totalRequests || 0),
                            " - ",
                            Math.min(currentPage * pageSize, totalRequests),
                            " of ",
                            totalRequests
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                        lineNumber: 808,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCurrentPage((p)=>Math.max(1, p - 1)),
                                disabled: currentPage === 1,
                                className: `px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-gray-800 text-white'}`,
                                children: "Prev"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 812,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: Array.from({
                                    length: totalPages
                                }).map((_, i)=>{
                                    const page = i + 1;
                                    // show up to 5 page buttons centered around current
                                    if (totalPages > 7) {
                                        if (page !== 1 && page !== totalPages && Math.abs(page - currentPage) > 2) {
                                            // skip rendering in-between pages to keep control compact
                                            return null;
                                        }
                                    }
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setCurrentPage(page),
                                        className: `w-8 h-8 flex items-center justify-center rounded ${page === currentPage ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border'}`,
                                        children: page
                                    }, page, false, {
                                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                        lineNumber: 830,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 819,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCurrentPage((p)=>Math.min(totalPages, p + 1)),
                                disabled: currentPage === totalPages,
                                className: `px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-gray-800 text-white'}`,
                                children: "Next"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                                lineNumber: 840,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/requests/page.tsx",
                        lineNumber: 811,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/requests/page.tsx",
                lineNumber: 807,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/requests/page.tsx",
        lineNumber: 258,
        columnNumber: 5
    }, this);
}
_s(RequestsPage, "Wq+QmJ0LbiDgEJwqQ4yIWkYS7A8=");
_c = RequestsPage;
var _c;
__turbopack_context__.k.register(_c, "RequestsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_131a1ec7._.js.map