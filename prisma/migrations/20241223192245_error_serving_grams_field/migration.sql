/*
  Warnings:

  - You are about to drop the column `servig_grams` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `serving_grams` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "kcal" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "carbs" INTEGER NOT NULL,
    "ingredients" TEXT NOT NULL,
    "instruccions" TEXT NOT NULL,
    "serving" INTEGER NOT NULL,
    "serving_grams" INTEGER NOT NULL,
    "cookTime" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("carbs", "cookTime", "createdAt", "description", "fat", "id", "ingredients", "instruccions", "kcal", "protein", "serving", "title", "userId") SELECT "carbs", "cookTime", "createdAt", "description", "fat", "id", "ingredients", "instruccions", "kcal", "protein", "serving", "title", "userId" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;