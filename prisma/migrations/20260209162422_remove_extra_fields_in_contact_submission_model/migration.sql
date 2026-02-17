/*
  Warnings:

  - You are about to drop the column `additionalInfo` on the `ContactSubmission` table. All the data in the column will be lost.
  - You are about to drop the column `availabilityDays` on the `ContactSubmission` table. All the data in the column will be lost.
  - You are about to drop the column `availabilityHours` on the `ContactSubmission` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundCheckAck` on the `ContactSubmission` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `ContactSubmission` table. All the data in the column will be lost.
  - You are about to drop the column `programInterests` on the `ContactSubmission` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `ContactSubmission` table. All the data in the column will be lost.
  - You are about to drop the column `yearsExperience` on the `ContactSubmission` table. All the data in the column will be lost.
  - Made the column `message` on table `ContactSubmission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ContactSubmission" DROP COLUMN "additionalInfo",
DROP COLUMN "availabilityDays",
DROP COLUMN "availabilityHours",
DROP COLUMN "backgroundCheckAck",
DROP COLUMN "phone",
DROP COLUMN "programInterests",
DROP COLUMN "subject",
DROP COLUMN "yearsExperience",
ALTER COLUMN "message" SET NOT NULL;
