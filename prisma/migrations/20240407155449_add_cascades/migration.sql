-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_attendess" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_id" TEXT NOT NULL,
    CONSTRAINT "attendess_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_attendess" ("created_at", "email", "event_id", "id", "name") SELECT "created_at", "email", "event_id", "id", "name" FROM "attendess";
DROP TABLE "attendess";
ALTER TABLE "new_attendess" RENAME TO "attendess";
CREATE UNIQUE INDEX "attendess_event_id_email_key" ON "attendess"("event_id", "email");
CREATE TABLE "new_check-in" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendee_id" INTEGER NOT NULL,
    CONSTRAINT "check-in_attendee_id_fkey" FOREIGN KEY ("attendee_id") REFERENCES "attendess" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_check-in" ("attendee_id", "createdAt", "id") SELECT "attendee_id", "createdAt", "id" FROM "check-in";
DROP TABLE "check-in";
ALTER TABLE "new_check-in" RENAME TO "check-in";
CREATE UNIQUE INDEX "check-in_attendee_id_key" ON "check-in"("attendee_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
