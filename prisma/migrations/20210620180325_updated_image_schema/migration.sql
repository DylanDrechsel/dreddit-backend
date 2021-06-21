/*
  Warnings:

  - You are about to drop the column `filename` on the `Image` table. All the data in the column will be lost.
  - Added the required column `name` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "filename",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "path" DROP NOT NULL,
ALTER COLUMN "mimetype" DROP NOT NULL,
ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "originalname" DROP NOT NULL,
ALTER COLUMN "encoding" DROP NOT NULL,
ALTER COLUMN "destination" DROP NOT NULL;
