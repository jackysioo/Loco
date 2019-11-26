export default function (spec) {

    spec.describe('EditBusiness Testing', function () {
        spec.it('W O R K S', async function () {
            await spec.pause(1000);
            await spec.press('EditProfile.Button');
            await spec.pause(1000);
            await spec.press('EditService.Button');
            await spec.pause(1000);
            await spec.fillIn('EditServiceTitle.TextInput', 'Edit Title');
            await spec.pause(500);
            await spec.fillIn('EditServicePrice.TextInput', '$40/hr');
            await spec.pause(500);
            await spec.fillIn('EditServiceRegion.TextInput', 'Burnaby');
            await spec.pause(500);
            await spec.fillIn('EditServiceTag1.TextInput', 'health');
            await spec.pause(500);
            await spec.fillIn('EditServiceTag2.TextInput', 'food');
            await spec.pause(500);
            await spec.fillIn('EditServiceTag3.TextInput', 'cook');
            await spec.pause(500);
            await spec.fillIn('EditServiceAbout.TextInput', 'I like to cook pasta!');
            await spec.pause(1000);
            await spec.press('EditServiceBack.Button');
        });
    });
}

