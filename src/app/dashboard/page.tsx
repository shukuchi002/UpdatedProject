"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { RequestType } from "@/types/request";

export default function DashboardPage() {
  const [activeCount, setActiveCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [highPriorityCount, setHighPriorityCount] = useState(0);
  const [showTotalImg, setShowTotalImg] = useState(true);
  const [showHighImg, setShowHighImg] = useState(true);
  const [showResolvedImg, setShowResolvedImg] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/dashboard/requests/api");
        const data: RequestType[] = await res.json();

        const active = data.filter((r) => r.status !== "resolved").length;
        const resolved = data.filter((r) => r.status === "resolved").length;
        const high = data.filter((r) => r.priority === "High").length;

        setActiveCount(active);
        setResolvedCount(resolved);
        setHighPriorityCount(high);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Total Requests */}
        <div className="rounded-lg shadow p-6 text-center bg-blue-50 border border-blue-100">
          <div className="flex justify-center mb-3">
            <Image
              src="/icons/total.svg"
              alt="Total icon"
              width={48}
              height={48}
              className="w-12 h-12"
              onError={() => setShowTotalImg(false)}
              style={{ display: showTotalImg ? "block" : "none" }}
            />
            {!showTotalImg && (
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 2h6a2 2 0 012 2v1h1a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h1V4a2 2 0 012-2zM9 4v1h6V4" />
              </svg>
            )}
          </div>
          <p className="text-sm text-blue-600 font-medium">Total requests</p>
          <p className="text-4xl font-bold mt-1 text-blue-900">{activeCount + resolvedCount}</p>
        </div>

        {/* High Priority */}
        <div className="rounded-lg shadow p-6 text-center bg-red-50 border border-red-100">
          <div className="flex justify-center mb-3">
            <Image
              src="/icons/high.svg"
              alt="High priority icon"
              width={48}
              height={48}
              className="w-12 h-12"
              onError={() => setShowHighImg(false)}
              style={{ display: showHighImg ? "block" : "none" }}
            />
            {!showHighImg && (
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />
              </svg>
            )}
          </div>
          <p className="text-sm text-red-600 font-medium">High priority</p>
          <p className="text-4xl font-bold mt-1 text-red-900">{highPriorityCount}</p>
        </div>

        {/* Resolved Requests */}
        <div className="rounded-lg shadow p-6 text-center bg-green-50 border border-green-100">
          <div className="flex justify-center mb-3">
            <Image
              src="/icons/resolved.svg"
              alt="Resolved icon"
              width={48}
              height={48}
              className="w-12 h-12"
              onError={() => setShowResolvedImg(false)}
              style={{ display: showResolvedImg ? "block" : "none" }}
            />
            {!showResolvedImg && (
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <p className="text-sm text-green-600 font-medium">Resolved</p>
          <p className="text-4xl font-bold mt-1 text-green-900">{resolvedCount}</p>
        </div>
      </div>
    </>
  );
}
