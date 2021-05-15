-- DropIndex
DROP INDEX "Image.fieldname_unique";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "fieldname" DROP NOT NULL;
