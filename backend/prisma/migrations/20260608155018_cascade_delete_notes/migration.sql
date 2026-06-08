-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_gameId_fkey";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
