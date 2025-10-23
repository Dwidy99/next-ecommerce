/*
  Warnings:

  - You are about to drop the column `slug` on the `Brand` table. All the data in the column will be lost.
  - The primary key for the `configuration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `alamat` on the `configuration` table. All the data in the column will be lost.
  - You are about to drop the column `bahasa` on the `configuration` table. All the data in the column will be lost.
  - You are about to drop the column `deskripsi` on the `configuration` table. All the data in the column will be lost.
  - You are about to drop the column `id_konfigurasi` on the `configuration` table. All the data in the column will be lost.
  - You are about to drop the column `nama_singkat` on the `configuration` table. All the data in the column will be lost.
  - You are about to drop the column `namaweb` on the `configuration` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal` on the `configuration` table. All the data in the column will be lost.
  - Added the required column `language` to the `configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `webname` to the `configuration` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Brand_slug_key";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "configuration" DROP CONSTRAINT "configuration_pkey",
DROP COLUMN "alamat",
DROP COLUMN "bahasa",
DROP COLUMN "deskripsi",
DROP COLUMN "id_konfigurasi",
DROP COLUMN "nama_singkat",
DROP COLUMN "namaweb",
DROP COLUMN "tanggal",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "language" "Language" NOT NULL,
ADD COLUMN     "short_name" TEXT,
ADD COLUMN     "webname" TEXT NOT NULL,
ADD CONSTRAINT "configuration_pkey" PRIMARY KEY ("id");
