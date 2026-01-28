/*
  Warnings:

  - Added the required column `requestId` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "requestId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "userId" INTEGER NOT NULL,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Request" ("createdAt", "deletedAt", "description", "id", "phone", "status", "title", "updatedAt", "userId") SELECT "createdAt", "deletedAt", "description", "id", "phone", "status", "title", "updatedAt", "userId" FROM "Request";
DROP TABLE "Request";
ALTER TABLE "new_Request" RENAME TO "Request";
CREATE UNIQUE INDEX "Request_requestId_key" ON "Request"("requestId");
CREATE INDEX "Request_userId_idx" ON "Request"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
