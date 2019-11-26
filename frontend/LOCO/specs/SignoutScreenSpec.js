export default function (spec) {

    spec.describe('SignoutScreen Testing', function () {
        spec.it('W O R K S', async function () {
            await spec.pause(1000);
            await spec.fillIn('LoginUsername.TextInput', 'CYNTHIA');
            await spec.fillIn('LoginPassword.TextInput', '123');
            await spec.press('Login.Button');
            await spec.pause(5000);
            await spec.press('Signout.Button');
        });
    });
}

