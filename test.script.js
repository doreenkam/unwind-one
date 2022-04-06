const postFromDatabase = require('./server/database.json');

describe('Fetch posts using id', () => {
    test('id: 1 should return title: Anonymous 1', () => {
        expect(result).toBe(database.json[0]);
    });
})