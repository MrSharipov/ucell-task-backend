/*
  Warnings:

  - You are about to drop the column `title` on the `Reports` table. All the data in the column will be lost.
  - Added the required column `region` to the `Reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reports" DROP COLUMN "title",
ADD COLUMN     "region" VARCHAR(150) NOT NULL;
