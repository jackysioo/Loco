export default function (spec) {

    spec.describe('HomeScreen Testing', function () {
        spec.it('W O R K S', async function () {
            await spec.pause(1000);
            await spec.press('Login.Button');
            await spec.pause(1000);
            await spec.press('Categories.Button1');
            await spec.pause(1000);
            await spec.press('Back.Button');
        });
    });
}

