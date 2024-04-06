-- CreateTable
CREATE TABLE "check-in" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendee_id" INTEGER NOT NULL,
    CONSTRAINT "check-in_attendee_id_fkey" FOREIGN KEY ("attendee_id") REFERENCES "attendess" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "check-in_attendee_id_key" ON "check-in"("attendee_id");
