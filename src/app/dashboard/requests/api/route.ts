import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { RequestType } from "@/types/request";

const filePath = path.join(process.cwd(), "src", "app", "data", "requests.txt");

/* ---------------- HELPERS ---------------- */
const readRequests = (): RequestType[] => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  if (!data || data.trim() === "") return [];
  try {
    return JSON.parse(data) as RequestType[];
  } catch {
    return [];
  }
};

const writeRequests = (requests: RequestType[]) => {
  fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));
};

/* ---------------- GET (excludes soft-deleted) ---------------- */
export async function GET() {
  const requests = readRequests();
  // Filter out deleted requests (where deletedAt is set)
  const activeRequests = requests.filter((r) => !r.deletedAt);
  return NextResponse.json(activeRequests);
}

/* ---------------- POST (CREATE) ---------------- */
export async function POST(request: Request) {
  let incomingRequest: Omit<RequestType, "id">;

  // Safe JSON parse
  try {
    incomingRequest = await request.json();
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return NextResponse.json(
      { success: false, message: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  const { category, title, description, ...optionalFields } = incomingRequest;

  // Validate required fields
  if (!category || !title || !description) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  // Safe file write with type coercion
  try {
    const requests = readRequests();
    const id = Date.now(); // unique ID

    const newRequest: RequestType = {
      id,
      category: String(category),
      title: String(title),
      description: String(description),
      // Convert all optional fields to string to satisfy RequestType
      ...Object.fromEntries(
        Object.entries(optionalFields).map(([k, v]) => [k, String(v)])
      ),
    };

    requests.push(newRequest);
    writeRequests(requests);

    return NextResponse.json({ success: true, request: newRequest });
  } catch (err) {
    console.error("Failed to write request:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

/* ---------------- DELETE (SOFT DELETE) ---------------- */
export async function DELETE(request: Request) {
  const { id }: { id: number } = await request.json();
  let requests = readRequests();

  let found = false;
  requests = requests.map((r) => {
    if (r.id === id) {
      found = true;
      // Soft delete: mark with deletedAt timestamp instead of removing
      return {
        ...r,
        deletedAt: new Date().toISOString(),
      };
    }
    return r;
  });

  if (!found) {
    return NextResponse.json(
      { success: false, message: "Request not found" },
      { status: 404 }
    );
  }

  writeRequests(requests);
  return NextResponse.json({ success: true });
}

/* ---------------- PUT (UPDATE) ---------------- */
export async function PUT(request: Request) {
  const updatedRequest: RequestType = await request.json();

  if (
    !updatedRequest.id ||
    !updatedRequest.category ||
    !updatedRequest.title ||
    !updatedRequest.description
  ) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  let requests = readRequests();
  let found = false;

  requests = requests.map((r) => {
    if (r.id === updatedRequest.id) {
      found = true;
      const { id, category, title, description, ...rest } = updatedRequest;
      return { ...r, id, category, title, description, ...rest };
    }
    return r;
  });

  if (!found) {
    return NextResponse.json(
      { success: false, message: "Request not found" },
      { status: 404 }
    );
  }

  writeRequests(requests);
  return NextResponse.json({ success: true });
}
