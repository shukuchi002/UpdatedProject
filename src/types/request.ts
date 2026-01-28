export type RequestType = {
  id: number;
  requestId: string; // 6-digit code, fixed
  category: string;
  title: string; // fixed, based on category
  description: string;
  requester?: string;
  department?: string;
  contact?: string;
  phone?: string;
  priority?: string;
  date?: string;
  status?: "active" | "resolved" | "pending" | "approved" | "rejected";
  deletedAt?: string; // ISO timestamp for soft deletes
  createdAt?: string;
  updatedAt?: string;
  [key: string]: string | number | undefined; // for category-specific fields
};


export type category = {
  id: number;
  name: string;
  description?: string;
};


export interface req_response {
  id : RequestType["id"];
  category : category["name"];
}