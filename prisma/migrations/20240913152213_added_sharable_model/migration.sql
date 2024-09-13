-- CreateTable
CREATE TABLE "Sharable" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "image" TEXT,
    "createLinkObjects" JSONB,

    CONSTRAINT "Sharable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sharable_userId_key" ON "Sharable"("userId");

-- CreateIndex
CREATE INDEX "Sharable_userId_idx" ON "Sharable"("userId");

-- AddForeignKey
ALTER TABLE "Sharable" ADD CONSTRAINT "Sharable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
