"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RequestType } from "@/types/request";
import {
  getFieldInputType,
  getFieldPattern,
  validateFieldInput,
  filterPhoneInput,
} from "@/lib/validation";
import { addToast } from "@/lib/toast";

function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type Category =
  | ""
  | "network"
  | "carpentry"
  | "hardware"
  | "vehicle"
  | "supplies";

export default function CreateRequestPage() {
  const [category, setCategory] = useState<Category>("");
  const [requestId] = useState<string>(() => Math.floor(100000 + Math.random() * 900000).toString());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // Collect and validate data
    const formData: Record<string, string> = {};
    const newErrors: Record<string, string> = {};

    form.forEach((value, key) => {
      if (value !== null) {
        const strValue = value.toString();
        formData[key] = strValue;
        // Validate each field except title and requestId (fixed)
        if (key !== "title" && key !== "requestId") {
          const validation = validateFieldInput(key, strValue);
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
      addToast("Please fix the validation errors", "error");
      return;
    }

    // Clear errors if validation passed
    setErrors({});

    const data: Omit<RequestType, "id"> = formData;
    data.category = category;

    try {
      const res = await fetch("/dashboard/requests/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let result;
      try {
        result = await res.json();
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        addToast("Server returned invalid response", "error");
        return;
      }

      if (result.success) {
        addToast("Request created successfully!", "success");
        router.push("/dashboard/requests");
      } else {
        addToast(result.message || "Failed to create request", "error");
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      addToast("Could not submit request. Check your network or server.", "error");
    }
  };

  return (
    <div className="flex gap-8">
      <aside className="w-64 bg-gray-100 border border-gray-300 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Categories</h2>
        <select
          name="category"
          className="w-full border border-gray-400 rounded px-3 py-2 cursor-pointer"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          <option value="">Select Category</option>
          <option value="network">Network</option>
          <option value="carpentry">Carpentry</option>
          <option value="hardware">Hardware</option>
          <option value="vehicle">Vehicle</option>
          <option value="supplies">Supplies</option>
        </select>
      </aside>

      <section className="flex-1 bg-white border border-gray-300 rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Create Service Request
        </h1>

        {category ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              name="requestId"
              label="Request ID"
              value={requestId}
              readOnly={true}
            />
            <Input
              name="title"
              label="Request Title"
              value={category ? `${capitalize(category)} Request` : "Request"}
              readOnly={true}
            />
            <Textarea
              name="description"
              label="Problem Description"
              error={errors.description}
            />
            <Input
              name="requester"
              label="Requester Name"
              error={errors.requester}
            />
            <Input
              name="department"
              label="Department / Office"
              error={errors.department}
            />
            <Input
              name="contact"
              label="Contact Number"
              error={errors.contact}
              onPhoneInput={true}
            />
            <Select
              name="priority"
              label="Priority"
              options={["Low", "Medium", "High"]}
            />
            <Input
              name="date"
              label="Date Needed"
              type="date"
              error={errors.date}
            />

            {category === "network" && (
              <>
                <Select
                  name="issueType"
                  label="Network Issue Type"
                  options={["No Internet", "Slow Connection", "Intermittent"]}
                />
                <Input
                  name="location"
                  label="Location / Room Number"
                  error={errors.location}
                />
                <Input
                  name="device"
                  label="Device Affected"
                  error={errors.device}
                />
                <Input
                  name="ip"
                  label="IP Address (Optional)"
                  error={errors.ip}
                />
              </>
            )}

            <button
              type="submit"
              className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-black transition cursor-pointer"
            >
              Submit Request
            </button>
          </form>
        ) : (
          <p className="text-gray-500">
            Please select a category to load the form.
          </p>
        )}
      </section>
    </div>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */
type InputProps = {
  label: string;
  type?: string;
  name: string;
  error?: string;
  onPhoneInput?: boolean;
  value?: string;
  readOnly?: boolean;
};

function Input({
  label,
  type = "text",
  name,
  error,
  onPhoneInput = false,
  value,
  readOnly = false,
}: InputProps) {
  const inputType = getFieldInputType(name) || type;
  const pattern = getFieldPattern(name);

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onPhoneInput) {
      e.target.value = filterPhoneInput(e.target.value);
    }
  };

  return (
    <div>
      <label className="block text-gray-600 mb-1">{label}</label>
      <input
        name={name}
        type={inputType}
        pattern={pattern}
        onChange={handlePhoneInput}
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "focus:ring-gray-800"
        }`}
        title={
          inputType === "tel"
            ? "Phone number can only contain numbers, dashes, parentheses, plus sign, and spaces"
            : ""
        }
        value={value}
        readOnly={readOnly}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
}

type TextareaProps = {
  label: string;
  name: string;
  error?: string;
};

function Textarea({ label, name, error }: TextareaProps) {
  return (
    <div>
      <label className="block text-gray-600 mb-1">{label}</label>
      <textarea
        name={name}
        rows={3}
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "focus:ring-gray-800"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

type SelectProps = { label: string; options: string[]; name: string };

function Select({ label, options, name }: SelectProps) {
  return (
    <div>
      <label className="block text-gray-600 mb-1">{label}</label>
      <select
        name={name}
        className="w-full border rounded px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-800"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
