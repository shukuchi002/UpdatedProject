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
"[project]/src/app/dashboard/create-request/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreateRequestPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function CreateRequestPage() {
    _s();
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [requestId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "CreateRequestPage.useState": ()=>Math.floor(100000 + Math.random() * 900000).toString()
    }["CreateRequestPage.useState"]);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        // Collect and validate data
        const formData = {};
        const newErrors = {};
        form.forEach((value, key)=>{
            if (value !== null) {
                const strValue = value.toString();
                formData[key] = strValue;
                // Validate each field except title and requestId (fixed)
                if (key !== "title" && key !== "requestId") {
                    const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateFieldInput"])(key, strValue);
                    if (!validation.valid && validation.error) {
                        newErrors[key] = validation.error;
                    }
                }
            }
        });
        // Add fixed fields
        formData["requestId"] = requestId;
        formData["title"] = category ? `${capitalize(category)} Request` : "Request";
        // Check for validation errors
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToast"])("Please fix the validation errors", "error");
            return;
        }
        // Clear errors if validation passed
        setErrors({});
        const data = formData;
        data.category = category;
        try {
            const res = await fetch("/dashboard/requests/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            let result;
            try {
                result = await res.json();
            } catch (err) {
                console.error("Failed to parse JSON:", err);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToast"])("Server returned invalid response", "error");
                return;
            }
            if (result.success) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToast"])("Request created successfully!", "success");
                router.push("/dashboard/requests");
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToast"])(result.message || "Failed to create request", "error");
            }
        } catch (err) {
            console.error("Fetch failed:", err);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToast"])("Could not submit request. Check your network or server.", "error");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "w-64 bg-gray-100 border border-gray-300 rounded-lg p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-gray-700 mb-4",
                        children: "Categories"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        name: "category",
                        className: "w-full border border-gray-400 rounded px-3 py-2 cursor-pointer",
                        value: category,
                        onChange: (e)=>setCategory(e.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Select Category"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "network",
                                children: "Network"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "carpentry",
                                children: "Carpentry"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "hardware",
                                children: "Hardware"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "vehicle",
                                children: "Vehicle"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "supplies",
                                children: "Supplies"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "flex-1 bg-white border border-gray-300 rounded-lg p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold text-gray-800 mb-6",
                        children: "Create Service Request"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    category ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "space-y-4",
                        onSubmit: handleSubmit,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                                name: "requestId",
                                label: "Request ID",
                                value: requestId,
                                readOnly: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                                name: "title",
                                label: "Request Title",
                                value: category ? `${capitalize(category)} Request` : "Request",
                                readOnly: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Textarea, {
                                name: "description",
                                label: "Problem Description",
                                error: errors.description
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                                name: "requester",
                                label: "Requester Name",
                                error: errors.requester
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                                name: "department",
                                label: "Department / Office",
                                error: errors.department
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                                name: "contact",
                                label: "Contact Number",
                                error: errors.contact,
                                onPhoneInput: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                lineNumber: 152,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
                                name: "priority",
                                label: "Priority",
                                options: [
                                    "Low",
                                    "Medium",
                                    "High"
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                                name: "date",
                                label: "Date Needed",
                                type: "date",
                                error: errors.date
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, this),
                            category === "network" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
                                        name: "issueType",
                                        label: "Network Issue Type",
                                        options: [
                                            "No Internet",
                                            "Slow Connection",
                                            "Intermittent"
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                        lineNumber: 172,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                                        name: "location",
                                        label: "Location / Room Number",
                                        error: errors.location
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                                        name: "device",
                                        label: "Device Affected",
                                        error: errors.device
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                                        name: "ip",
                                        label: "IP Address (Optional)",
                                        error: errors.ip
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                        lineNumber: 187,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "bg-gray-800 text-white px-6 py-2 rounded hover:bg-black transition cursor-pointer",
                                children: "Submit Request"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                                lineNumber: 195,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500",
                        children: "Please select a category to load the form."
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                        lineNumber: 203,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/create-request/page.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_s(CreateRequestPage, "m4tqrtSqq3yEP6bAKLccSm+wB4g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CreateRequestPage;
function Input({ label, type = "text", name, error, onPhoneInput = false, value, readOnly = false }) {
    const inputType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFieldInputType"])(name) || type;
    const pattern = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFieldPattern"])(name);
    const handlePhoneInput = (e)=>{
        if (onPhoneInput) {
            e.target.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filterPhoneInput"])(e.target.value);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-gray-600 mb-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                lineNumber: 243,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                name: name,
                type: inputType,
                pattern: pattern,
                onChange: handlePhoneInput,
                className: `w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-gray-800"}`,
                title: inputType === "tel" ? "Phone number can only contain numbers, dashes, parentheses, plus sign, and spaces" : "",
                value: value,
                readOnly: readOnly
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-500 text-sm mt-1",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                lineNumber: 262,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/create-request/page.tsx",
        lineNumber: 242,
        columnNumber: 5
    }, this);
    //TURBOPACK unreachable
    ;
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
_c1 = Input;
function Textarea({ label, name, error }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-gray-600 mb-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                lineNumber: 279,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                name: name,
                rows: 3,
                className: `w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-gray-800"}`
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                lineNumber: 280,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-500 text-sm mt-1",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                lineNumber: 289,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/create-request/page.tsx",
        lineNumber: 278,
        columnNumber: 5
    }, this);
}
_c2 = Textarea;
function Select({ label, options, name }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-gray-600 mb-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                lineNumber: 299,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                name: name,
                className: "w-full border rounded px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-800",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        children: "Select"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this),
                    options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            children: opt
                        }, opt, false, {
                            fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                            lineNumber: 306,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/create-request/page.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/create-request/page.tsx",
        lineNumber: 298,
        columnNumber: 5
    }, this);
}
_c3 = Select;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "CreateRequestPage");
__turbopack_context__.k.register(_c1, "Input");
__turbopack_context__.k.register(_c2, "Textarea");
__turbopack_context__.k.register(_c3, "Select");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_bee39cc9._.js.map