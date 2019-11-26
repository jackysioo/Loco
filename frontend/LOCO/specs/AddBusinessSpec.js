export default function (spec) {

    spec.describe('AddBusiness Testing', function () {
        spec.it('W O R K S', async function () {
            await spec.pause(1000);
            await spec.fillIn('LoginUsername.TextInput', 'PSLatte');
            await spec.fillIn('LoginPassword.TextInput', 'pw123');
            await spec.press('Login.Button');
            await spec.pause(5000);
            await spec.press('EditProfile.Button');
            await spec.pause(1000);
            await spec.press('AddService.Button');
            await spec.pause(1000);
            await spec.fillIn('AddServiceTitle.TextInput', 'Nail & Beauty');
            await spec.pause(500);
            await spec.fillIn('AddServicePrice.TextInput', '$50/set');
            await spec.pause(500);
            await spec.fillIn('AddServiceRegion.TextInput', 'Kitsalano,Vancouver');
            await spec.pause(500);
            await spec.fillIn('AddServiceTag1.TextInput', 'nail');
            await spec.pause(500);
            await spec.fillIn('AddServiceTag2.TextInput', 'beauty');
            await spec.pause(500);
            await spec.fillIn('AddServiceTag3.TextInput', 'spa');
            await spec.pause(500);
            await spec.fillIn('AddServiceAbout.TextInput', 'Nail beautician at your service!');
            // await spec.pause(1000);
            // await spec.press('AddServiceBack.Button');
            // await spec.pause(1000);
            // await spec.press('BioBack.Button');
        });
    });
}

