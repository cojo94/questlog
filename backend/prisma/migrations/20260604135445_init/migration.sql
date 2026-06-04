-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "platform" TEXT[],
    "status" TEXT NOT NULL,
    "genre" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
