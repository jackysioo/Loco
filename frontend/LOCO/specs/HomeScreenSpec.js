export default function (spec) {

    spec.describe('HomeScreen Testing', function () {
        spec.it('W O R K S', async function () {
            // Wait 5 seconds before starting test
            // await spec.pause(1000);
            // await spec.press('Categories.Button1');
            // await spec.pause(1000);
            // await spec.press('Back.Button');
            // await spec.focus('Search.TextInput')
            await spec.pause(1000);
            // await spec.fillIn('Search.TextInput', 'FOOD');
            // await spec.fillIn('Location.TextInput', 'VANCOUVER');
            // await spec.press('SearchBar.Button');
            // await spec.pause(1000);
            // await spec.press('SearchResult.Button');
            // await spec.pause(1000);
            // await spec.press('BusinessBack.Button');
            // await spec.pause(1000);
            // await spec.press('Filters.Button');
            // await spec.pause(1000);
            // await spec.press('CloseFilters.Button');
            // await spec.pause(1000);
            // await spec.press('Sort.Button');
            // await spec.pause(1000);
            // await spec.press('CloseSort.Button');
            await spec.pause(1000);
            await spec.press('MapOpen.Button');
            await spec.pause(1000);
            await spec.press('Callout.Button');
            await spec.pause(2000);
            await spec.press('MapClose.Button');
            await spec.pause(1000);
            await spec.press('Back.Button');
            await spec.pause(1000);
            await spec.press('Search.TextInput');
            await spec.pause(1000);
            await spec.fillIn('Search.TextInput', 'TUTOR');
            await spec.fillIn('Location.TextInput', 'VANCOUVER');
            await spec.press('SearchBarCancel.Button');
            await spec.pause(1000);
        });
    });
}

