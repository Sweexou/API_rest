import prisma from "../db.js"

export const getCharacters = async () => {
    return await prisma.character.findMany()
}

export const getCharacterById = async (id) => {
    return await prisma.character.findUnique({
        where: {
            id: parseInt(id)
        }
    })
}

export const deleteCharacter = async (id) => {
    if (await getCharacterById(id)) {
        await prisma.character.delete({
            where: {
                id: parseInt(id)
            }
        })
        return true
    }
    return false
}

export const createCharacter = async (name, weapon1Id, weapon2Id, armor1Id, armor2Id, accessory1Id, accessory2Id, userId) => {
    const count = await prisma.character.count({
        where: {
            name
        }
    })
    if (!userId) {
        userId = 1
    }
    if (count > 0){
        const error = new Error('Character already exists')
        error.status = 409
        throw error
    }
    
    const character = await prisma.character.create({
        data: {
            name,
            weapon1Id,
            weapon2Id,
            armor1Id,
            armor2Id,
            accessory1Id,
            accessory2Id,
            userId
        },
        select: {
            id: true,
            name: true,
            weapon1Id: true,
            weapon2Id: true,
            armor1Id: true,
            armor2Id: true,
            accessory1Id: true,
            accessory2Id: true,
            userId: true
        }
    })

    await prisma.stats_characters.create({
        data: {
            character_id: character.id,
            stat_id: 1,
            value: 0
        }
    })
    await prisma.stats_characters.create({
        data: {
            character_id: character.id,
            stat_id: 2,
            value: 0
        }
    })
    await prisma.stats_characters.create({
        data: {
            character_id: character.id,
            stat_id: 3,
            value: 0
        }
    })
    await prisma.stats_characters.create({
        data: {
            character_id: character.id,
            stat_id: 4,
            value: 0
        }
    })
    await prisma.stats_characters.create({
        data: {
            character_id: character.id,
            stat_id: 5,
            value: 0
        }
    })
    updateCharacterStats(character.id)
    return character
}


export const updateCharacter = async (id, name, weapon1Id, weapon2Id, armor1Id, armor2Id, accessory1Id, accessory2Id, userId) => {
    const character = await getCharacterById(id);
    if (!character) {
        const error = new Error("Character not found");
        error.status = 404;
        throw error;
    }
    if (character) {
        const checks = [
            weapon1Id && prisma.weapons.findUnique({ where: { id: weapon1Id } }),
            weapon2Id && prisma.weapons.findUnique({ where: { id: weapon2Id } }),
            armor1Id && prisma.armors.findUnique({ where: { id: armor1Id } }),
            armor2Id && prisma.armors.findUnique({ where: { id: armor2Id } }),
            accessory1Id && prisma.accessories.findUnique({ where: { id: accessory1Id } }),
            accessory2Id && prisma.accessories.findUnique({ where: { id: accessory2Id } }),
        ];
        const results = await Promise.all(checks);

        // error handling for invalid equipment IDs
        if (results.some((result, index) => !result && checks[index])) {
            const error = new Error("One or more equipment IDs are invalid");
            error.status = 404;
            throw error;
        }


        await prisma.character.update({
            where: {
                id: parseInt(id)
            },
            
            data: {
                name,
                weapon1Id,
                weapon2Id,
                armor1Id,
                armor2Id,
                accessory1Id,
                accessory2Id,
                userId
            }
        })
        updateCharacterStats(character.id)
        return true
    }
}

// 1: strength 2: fortitude 3: dextertity 4: perception 5: wisdom
export const getCharacterStats = async (id) => {
    return await prisma.stats_characters.findMany({
        where: {
            character_id : parseInt(id)
        },
        select: {
            stat_id: true,
            value: true
        }
    });
}

export const updateCharacterStats = async (id) => {
    const character = await getCharacterById(id);
    if (!character) {
        const error = new Error("Character not found");
        error.status = 404;
        throw error;
    }

    // 1: strength 2: fortitude 3: dextertity 4: perception 5: wisdom
    const totalStats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    const updateStats = (stat) => {
        if (totalStats.hasOwnProperty(stat.stat_id)) {
            totalStats[stat.stat_id] += stat.value;
        }
    };

    
    const equipmentIds = [
        { table: 'stats_Weapons', id: character.weapon1Id, idtable: 'weapon_id' },
        { table: 'stats_Weapons', id: character.weapon2Id, idtable: 'weapon_id' },
        { table: 'stats_Armors', id: character.armor1Id, idtable: 'armor_id' },
        { table: 'stats_Armors', id: character.armor2Id, idtable: 'armor_id' },
        { table: 'stats_accessories', id: character.accessory1Id, idtable: 'accessory_id' },
        { table: 'stats_accessories', id: character.accessory2Id, idtable: 'accessory_id' }
    ];

    // get all the stats of each equipment of the character
    const promises = equipmentIds.map(async (equipment) => {
        if (!equipment.id) return;
        const results = await prisma[equipment.table].findMany({
            where: { [equipment.idtable]: equipment.id }
        });
        results.forEach(updateStats); 
    });

    await Promise.all(promises); 
    // update of the stats of the character
    const updates = Object.entries(totalStats).map(([stat_id, value]) => ({
        where: {
            character_id_stat_id: {
                character_id: parseInt(id),
                stat_id: parseInt(stat_id)
            }
        },
        data: { value }
    }));

    await prisma.$transaction(
        updates.map((update) => prisma.stats_characters.update(update))
    );

    return true;
};

export const getBasicCharacterStats = async (id) => {
    const character = await getCharacterById(id);
    
    const stats = await getCharacterStats(id);
    if (!stats) {
        const error = new Error("Character stats not found");
        error.status = 404;
        throw error;
    }

    // 1: strength 2: fortitude 3: dextertity 4: perception 5: wisdom
    let totalStats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

    // update of stats data in the object
    stats.forEach((stat) => {
        if (totalStats.hasOwnProperty(stat.stat_id)) {
            totalStats[stat.stat_id] = stat.value;
        }
    })

    //get on all the basic stats of each equipment of the character
    let hp = 5000, min_damage1 = 0, max_damage1 = 0, min_damage2 = 0 , max_damage2 = 0, melee_defence = 0, ranged_defence = 0, magic_defence = 0;
    try {
        if (character.weapon1Id) {
            const weaponsData = await prisma.weapons.findMany({
                where: {
                    id: character.weapon1Id
                }
            });
            if (weaponsData.length > 0) {
                min_damage1 += weaponsData[0].min_damage;
                max_damage1 += weaponsData[0].max_damage;
            }
        }
    
        if (character.weapon2Id) {
            const weaponsData2 = await prisma.weapons.findMany({
                where: {
                    id: character.weapon2Id
                }
            });
            if (weaponsData2.length > 0) {
                min_damage2 += weaponsData2[0].min_damage;
                max_damage2 += weaponsData2[0].max_damage;
            }
        }
    
        if (character.armor1Id) {
            const armorsData = await prisma.armors.findMany({
                where: {
                    id: character.armor1Id
                }
            });
            if (armorsData.length > 0) {
                melee_defence += armorsData[0].melee_defence;
                ranged_defence += armorsData[0].ranged_defence;
            }
        }
    
        if (character.armor2Id) {
            const armorsData2 = await prisma.armors.findMany({
                where: {
                    id: character.armor2Id
                }
            });
            if (armorsData2.length > 0) {
                melee_defence += armorsData2[0].melee_defence;
                ranged_defence += armorsData2[0].ranged_defence;
            }
        }
    
        if (character.accessory1Id) {
            const accessoriesData = await prisma.accessories.findMany({
                where: {
                    id: character.accessory1Id
                }
            });
            if (accessoriesData.length > 0) {
                magic_defence += accessoriesData[0].magic_defence;
            }
        }
    
        if (character.accessory2Id) {
            const accessoriesData2 = await prisma.accessories.findMany({
                where: {
                    id: character.accessory2Id
                }
            });
            if (accessoriesData2.length > 0) {
                magic_defence += accessoriesData2[0].magic_defence;
            }
        }
    } catch (error) {
        error = new Error("An error occurred while processing character equipment.");
        error.status = 500;
        throw error;
    }
    // calculation of the basic stats of the character
    hp = 5000 + (totalStats[1] * 50); // HP = Base + Strength contribution
    min_damage1 += totalStats[3] * 1; // Dexterity adds to min damage
    max_damage1 += totalStats[3] * 1; // Dexterity adds to max damage
    min_damage2 += totalStats[3] * 1;
    max_damage2 += totalStats[3] * 1;
    melee_defence += totalStats[2] * 25; // Fortitude adds to melee defence
    ranged_defence += totalStats[4] * 20; // Perception adds to ranged defence
    magic_defence += totalStats[5] * 15; // Wisdom adds to magic defence

    return {
        "hp": hp,
        "min_damage1": min_damage1,
        "max_damage1": max_damage1,
        "min_damage2": min_damage2,
        "max_damage2": max_damage2,
        "melee_defence": melee_defence,
        "ranged_defence": ranged_defence,
        "magic_defence": magic_defence
    }
}


export const getCharacterHitpool = async (id) => {
    const character = await getCharacterById(id);
    if (!character) {
        const error = new Error("Character not found");
        error.status = 404;
        throw error;
    }

    const stats = await getBasicCharacterStats(id);
    if (!stats) {
        const error = new Error("Character stats not found");
        error.status = 404;
        throw error;
    }
    // 4melee def = 1% melee mitigation up to 50% then 5 point per % up to 70% then 10 point per % up to 80%
    // 4ranged def = 1% ranged mitigation up to 50% then 5 point per % up to 70% then 10 point per % up to 80%
    // 2magic def = 1% magic mitigation up to 50% then 5 point per % up to 75% 
    const baseBossHit = 300
    const baseMobHit = 100
    let melee_mitigation = 0
    let ranged_mitigation = 0
    let magic_mitigation = 0

    // calculation of the mitigation of the character
    if (stats.melee_defence >= 200) {
        if (stats.melee_defence >= 300) {
            if (stats.melee_defence >= 400) {
                melee_mitigation = 80
            } else {
                melee_mitigation = 70 + (stats.melee_defence - 300) / 10
            }
        } else {
            melee_mitigation = 50 + (stats.melee_defence - 200) / 5
        }
    } else {
        if (stats.melee_defence > 3) {
            melee_mitigation = stats.melee_defence /4
        }
    }
    
    if (stats.ranged_defence >= 200) {
        if (stats.ranged_defence >= 300) {
            if (stats.ranged_defence >= 400) {
                ranged_mitigation = 80
            } else {
                ranged_mitigation = 70 + (stats.ranged_defence - 300) / 10
            }
        } else {
            ranged_mitigation = 50 + (stats.ranged_defence - 200) / 5
        }
    } else {
        if (stats.ranged_defence > 3) {
            ranged_mitigation = stats.ranged_defence /4
        }
    }

    if (stats.magic_defence >= 200) {
        if (stats.magic_defence >= 300) {
            magic_mitigation = 75
        } else {
            magic_mitigation = 50 + (stats.magic_defence - 200) / 5
        }
    } else {
        if (stats.magic_defence > 1) {
            magic_mitigation = stats.magic_defence /2
        }
    }
    
    // calculation of the hit pool of the character
    let melee_bosshitDeath = parseFloat((stats.hp / (baseBossHit * (100 - melee_mitigation) / 100)).toFixed(2));
    let melee_bosseffectiveHit = parseFloat((melee_bosshitDeath * baseBossHit).toFixed(2));
    let melee_mobhitDeath = parseFloat((stats.hp / (baseMobHit * (100 - melee_mitigation) / 100)).toFixed(2));

    let ranged_bosshitDeath = parseFloat((stats.hp / (baseBossHit * (100 - ranged_mitigation) / 100)).toFixed(2));
    let ranged_bosseffectiveHit = parseFloat((ranged_bosshitDeath * baseBossHit).toFixed(2));
    let ranged_mobhitDeath = parseFloat((stats.hp / (baseMobHit * (100 - ranged_mitigation) / 100)).toFixed(2));

    let magic_bosshitDeath = parseFloat((stats.hp / (baseBossHit * (100 - magic_mitigation) / 100)).toFixed(2));
    let magic_bosseffectiveHit = parseFloat((magic_bosshitDeath * baseBossHit).toFixed(2));
    let magic_mobhitDeath = parseFloat((stats.hp / (baseMobHit * (100 - magic_mitigation) / 100)).toFixed(2));

    return {
        "melee_effectiveHitPool": melee_bosseffectiveHit,
        "melee_bosseffectiveHit": melee_bosshitDeath,
        "melee_mobeffectiveHit": melee_mobhitDeath,

        "ranged_effectiveHitPool": ranged_bosseffectiveHit,
        "ranged_bosseffectiveHit": ranged_bosshitDeath,
        "ranged_mobeffectiveHit": ranged_mobhitDeath,

        "magic_effectiveHitPool": magic_bosseffectiveHit,
        "magic_bosseffectiveHit": magic_bosshitDeath,
        "magic_mobeffectiveHit": magic_mobhitDeath,
    }
}

export const getCharacterAvgDamage = async (id) => {
    const character = await getCharacterById(id);
    if (!character) {
        const error = new Error("Character not found");
        error.status = 404;
        throw error;
    }

    const stats = await getBasicCharacterStats(id);
    if (!stats) {
        const error = new Error("Character stats not found");
        error.status = 404;
        throw error;
    }

    // calculation of the average damage of the character
    let avg_damage1 = (stats.min_damage1 + stats.max_damage1) / 2;
    let avg_damage2 = (stats.min_damage2 + stats.max_damage2) / 2;

    return {
        "avg_damage1": avg_damage1,
        "avg_damage2": avg_damage2
    }
}

    


