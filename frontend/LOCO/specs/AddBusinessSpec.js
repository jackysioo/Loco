export default function (spec) {

    spec.describe('AddBusiness Testing', function () {
        spec.it('W O R K S', async function () {
            await spec.pause(1000);
            await spec.press('AddProfile.Button');
            await spec.pause(1000);
            await spec.press('AddService.Button');
            await spec.pause(1000);
            await spec.fillIn('AddServiceTitle.TextInput', 'Add Title');
            await spec.pause(500);
            await spec.fillIn('AddServicePrice.TextInput', '$40/hr');
            await spec.pause(500);
            await spec.fillIn('AddServiceRegion.TextInput', 'Burnaby');
            await spec.pause(500);
            await spec.fillIn('AddServiceTag1.TextInput', 'health');
            await spec.pause(500);
            await spec.fillIn('AddServiceTag2.TextInput', 'food');
            await spec.pause(500);
            await spec.fillIn('AddServiceTag3.TextInput', 'cook');
            await spec.pause(500);
            await spec.fillIn('AddServiceAbout.TextInput', 'I like to cook pasta!');
            await spec.pause(1000);
            await spec.press('AddServiceBack.Button');
            await spec.pause(1000);
            await spec.press('BioBack.Button');
        });
    });
}

