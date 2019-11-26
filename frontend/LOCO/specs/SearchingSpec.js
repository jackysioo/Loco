export default function (spec) {

    spec.describe('Search Testing', function () {
        spec.it('W O R K S', async function () {
            await spec.pause(1000);
            await spec.press('Login.Button');
            await spec.pause(1000);
            await spec.press('Search.Button');
            await spec.pause(1000);
            await spec.fillIn('Search.TextInput', 'Pasta');
            await spec.pause(500);
            await spec.fillIn('Location.TextInput', 'Vancouver');
            await spec.pause(1000);
            await spec.press('SearchBar.Button');
            await spec.pause(1000);
            await spec.press('SearchResultBack.Button');
        });
    });
}

