/*
  Warnings:

  - You are about to drop the column `userid` on the `UserSetting` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserSetting` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `UserSetting` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserSetting" DROP CONSTRAINT "UserSetting_userid_fkey";

-- DropIndex
DROP INDEX "UserSetting_userid_key";

-- AlterTable
ALTER TABLE "UserSetting" DROP COLUMN "userid",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserSetting_userId_key" ON "UserSetting"("userId");

-- AddForeignKey
ALTER TABLE "UserSetting" ADD CONSTRAINT "UserSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
