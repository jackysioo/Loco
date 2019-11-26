export default function (spec) {

    spec.describe('SignoutScreen Testing', function () {
        spec.it('W O R K S', async function () {
            // Wait 1 seconds before starting test
            await spec.pause(1000);
            await spec.press('Signout.Button');
        });
    });
}

