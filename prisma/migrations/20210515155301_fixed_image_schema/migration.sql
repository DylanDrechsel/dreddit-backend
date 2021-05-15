/*
  Warnings:

  - You are about to drop the column `filename` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `filepath` on the `Image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fieldname]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fieldname` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalname` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encoding` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Image.filename_unique";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "filename",
DROP COLUMN "filepath",
ADD COLUMN     "fieldname" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "originalname" TEXT NOT NULL,
ADD COLUMN     "encoding" TEXT NOT NULL,
ADD COLUMN     "destination" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image.fieldname_unique" ON "Image"("fieldname");
