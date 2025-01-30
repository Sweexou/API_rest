-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Character` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `weapon1Id` INTEGER NULL,
    `weapon2Id` INTEGER NULL,
    `armor1Id` INTEGER NULL,
    `armor2Id` INTEGER NULL,
    `accessory1Id` INTEGER NULL,
    `accessory2Id` INTEGER NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Weapons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `min_damage` INTEGER NOT NULL,
    `max_damage` INTEGER NOT NULL,
    `damage_reduction` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Armors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `melee_defence` INTEGER NOT NULL,
    `ranged_defence` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Accessories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `magic_defence` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stats_Weapons` (
    `weapon_id` INTEGER NOT NULL,
    `stat_id` INTEGER NOT NULL,
    `value` INTEGER NOT NULL,

    PRIMARY KEY (`weapon_id`, `stat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stats_Armors` (
    `armor_id` INTEGER NOT NULL,
    `stat_id` INTEGER NOT NULL,
    `value` INTEGER NOT NULL,

    PRIMARY KEY (`armor_id`, `stat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stats_accessories` (
    `accessory_id` INTEGER NOT NULL,
    `stat_id` INTEGER NOT NULL,
    `value` INTEGER NOT NULL,

    PRIMARY KEY (`accessory_id`, `stat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stats_characters` (
    `character_id` INTEGER NOT NULL,
    `stat_id` INTEGER NOT NULL,
    `value` INTEGER NOT NULL,

    PRIMARY KEY (`character_id`, `stat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Character` ADD CONSTRAINT `Character_weapon1Id_fkey` FOREIGN KEY (`weapon1Id`) REFERENCES `Weapons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Character` ADD CONSTRAINT `Character_weapon2Id_fkey` FOREIGN KEY (`weapon2Id`) REFERENCES `Weapons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Character` ADD CONSTRAINT `Character_armor1Id_fkey` FOREIGN KEY (`armor1Id`) REFERENCES `Armors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Character` ADD CONSTRAINT `Character_armor2Id_fkey` FOREIGN KEY (`armor2Id`) REFERENCES `Armors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Character` ADD CONSTRAINT `Character_accessory1Id_fkey` FOREIGN KEY (`accessory1Id`) REFERENCES `Accessories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Character` ADD CONSTRAINT `Character_accessory2Id_fkey` FOREIGN KEY (`accessory2Id`) REFERENCES `Accessories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Character` ADD CONSTRAINT `Character_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stats_Weapons` ADD CONSTRAINT `Stats_Weapons_weapon_id_fkey` FOREIGN KEY (`weapon_id`) REFERENCES `Weapons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stats_Weapons` ADD CONSTRAINT `Stats_Weapons_stat_id_fkey` FOREIGN KEY (`stat_id`) REFERENCES `Stats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stats_Armors` ADD CONSTRAINT `Stats_Armors_armor_id_fkey` FOREIGN KEY (`armor_id`) REFERENCES `Armors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stats_Armors` ADD CONSTRAINT `Stats_Armors_stat_id_fkey` FOREIGN KEY (`stat_id`) REFERENCES `Stats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stats_accessories` ADD CONSTRAINT `Stats_accessories_accessory_id_fkey` FOREIGN KEY (`accessory_id`) REFERENCES `Accessories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stats_accessories` ADD CONSTRAINT `Stats_accessories_stat_id_fkey` FOREIGN KEY (`stat_id`) REFERENCES `Stats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stats_characters` ADD CONSTRAINT `Stats_characters_character_id_fkey` FOREIGN KEY (`character_id`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stats_characters` ADD CONSTRAINT `Stats_characters_stat_id_fkey` FOREIGN KEY (`stat_id`) REFERENCES `Stats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
