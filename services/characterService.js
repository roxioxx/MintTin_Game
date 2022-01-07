const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

class characterService {
    constructor(dataFile) {
        this.dataFile = dataFile;
    }

    async getNames() {
        const data = await this.getData();
        return data.map(character => {
            return {
                name: character._id,
                shortname: character.shortname
            };
        });
    }

    async getCharacter(shortname) {
        const data = await this.getData();
        const character = data.find(elm => {
            return elm.shortname === shortname;
        });

        if (!character) return null;

        return {
            effect: character.effect,
            name: character._id,
            shortname: character.shortname,
            story: character.story
        }
    }

    async getListShort() {
        const data = await this.getData();
        return data.map(character => {
            return {
                name: character._id,
                shortname: character.shortname,
                effect: character.effect
            }
        })
    }

    async getList() {
        const data = await this.getData();
        return data.map(character => {
            return {
                name: character._id,
                shortname: character.shortname,
                effect: character.effect,
                story: character.story
            }
        })
    }

    async getData() {
        const data = await readFile(this.dataFile, "utf8");
        if (!data) return [];
        return JSON.parse(data);
    }
};

module.exports = characterService;