-- CreateTable
CREATE TABLE "Reports" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "item" INTEGER NOT NULL,
    "units" INTEGER NOT NULL,
    "subscribers" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);
