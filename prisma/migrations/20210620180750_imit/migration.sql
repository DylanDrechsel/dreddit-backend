/*
  Warnings:

  - Made the column `path` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mimetype` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `originalname` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `encoding` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `destination` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `filename` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "path" SET NOT NULL,
ALTER COLUMN "mimetype" SET NOT NULL,
ALTER COLUMN "size" SET NOT NULL,
ALTER COLUMN "originalname" SET NOT NULL,
ALTER COLUMN "encoding" SET NOT NULL,
ALTER COLUMN "destination" SET NOT NULL,
ALTER COLUMN "filename" SET NOT NULL;
