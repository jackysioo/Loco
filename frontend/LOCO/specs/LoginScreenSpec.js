export default function (spec) {

    spec.describe('LoginScreen Testing', function () {
        spec.it('W O R K S', async function () {
            // Wait 1 seconds before starting test
            await spec.pause(1000);
            await spec.fillIn('LoginUsername.TextInput', 'PSLatte');
            await spec.pause(1000);
            await spec.fillIn('LoginPassword.TextInput', 'pw123');
            await spec.pause(1000);
        });
    });
}

