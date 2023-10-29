import { faker } from '@faker-js/faker';
import { MongoClient, ServerApiVersion } from 'mongodb';
import inquirer from 'inquirer';

function prepSeeder() {
    'How big of seed? (one, some, many, lots):'

    inquirer.prompt([
        {
            name: 'seedSize',
            type: 'rawlist',
            message: 'How big of a seed?',
            default: 2, // aka "some"
            choices: [ 
                { name: 'one (1)', value: 1, key: 1 },
                { name: 'some (5)', value: 5, key: 5 },
                { name: 'many (15)', value: 15, key: 15 },
                { name: 'lots (100)', value: 100, key: 100 },
                { name: 'clear all', value: -1, key: 0 }
            ]
        }
    ]).then((answers) => {
        seed(answers.seedSize);
    })
}

async function seed(seedSize) {

    let _db;
    const localMongoUri = "mongodb://mongo:secretPassword@localhost:27017"

    const client = new MongoClient(localMongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
    })

    await client.connect()
    _db = client.db('app-dash')
    await _db.command({ ping: 1 })

    if (seedSize < 1) {
        let result = await _db.collection('apps').deleteMany({})
        console.log("Deleted " + result.deletedCount + " items");
        process.exit()
    }

    let groupLength = seedSize > 2 ? Math.max(2, Math.ceil(seedSize/5)) : 1;
    let groups = Array.from(Array(groupLength));
    
    console.log(`Seeding with ${seedSize} records in ${groupLength} groups`);
    
    (groups).forEach((_, i, g) => g[i] = `group${i}`);
    groups[0] = '';

    let seedItems = [];

    for(let i = 0; i < seedSize; i++) {
        // FYI: Title and Description rules are defined in `src/features/dialog/itemForm.js` Yup definition.
        let title = faker.lorem.words({ min: 1, max: 5 })
        while (title.length > 15) {
            title = title.substring(0, title.lastIndexOf(' ') - 1)
        }

        let description = faker.lorem.words({ min: 1, max: 10 })
        while (description.length > 30) {
            description = description.substring(0, description.lastIndexOf(' ') - 1)
        }

        let url = faker.internet.url()
        let imageUrl = faker.image.urlPlaceholder({ format: 'png', height: 40, width: 40 })

        let groupIdx = faker.number.int(groupLength - 1)

        let newItem = {
            title,
            description,
            url,
            imageUrl,
            image: '',
            group: groups[groupIdx]
        }
        
        seedItems.push(newItem);
    }

    let insertResponse = await _db.collection('apps').insertMany(seedItems);

    console.log(`Seeding complete! ${insertResponse.insertedCount} items seeded`)
    await client.close()
    process.exit()
}

prepSeeder();

