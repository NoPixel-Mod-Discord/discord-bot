-- CreateTable
CREATE TABLE `Alts` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `altVenue` ENUM('twitch', 'facebook', 'youtube', 'discord') NOT NULL,
    `altId` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mods` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `isVerified` BOOLEAN NOT NULL,
    `modType` ENUM('twitch', 'facebook', 'youtube', 'discord') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bans` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `banTime` DATETIME(0) NOT NULL,
    `banVenue` ENUM('twitch', 'facebook', 'youtube', 'discord') NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `isBanned` BOOLEAN NOT NULL,
    `streamerId` VARCHAR(255) NOT NULL,
    `moderatorId` VARCHAR(255) NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `evidence` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Streamers` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(255) NOT NULL,
    `lastOnline` DATETIME(0) NOT NULL,
    `channelId` VARCHAR(255) NOT NULL,
    `streamType` ENUM('twitch', 'facebook', 'youtube', 'discord') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(255) NOT NULL,
    `venue` ENUM('twitch', 'facebook', 'youtube', 'discord') NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `users_userid_unique`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
