export default function (spec) {

    spec.describe('SignupScreen Testing', function () {
        spec.it('W O R K S', async function () {
            // Wait 1 seconds before starting test
            await spec.pause(1000);
            await spec.press('SignUp.Button');
            await spec.pause(1000);
            await spec.fillIn('Username.TextInput', 'Lazi');
            await spec.pause(500);
            await spec.fillIn('Password.TextInput', 'pw123');
            await spec.pause(500);
            await spec.fillIn('FirstName.TextInput', 'Raj');
            await spec.pause(500);
            await spec.fillIn('LastName.TextInput', 'Siddh');
            await spec.pause(500);
            await spec.fillIn('AddressLine.TextInput', '100 W 49th Ave');
            await spec.pause(500);
            await spec.fillIn('City.TextInput', 'Vancouver');
            await spec.pause(500);
            await spec.fillIn('Province.TextInput', 'BC');
            await spec.pause(500);
            await spec.fillIn('PostalCode.TextInput', 'V5Y 2Z6');
            await spec.pause(500);
            await spec.fillIn('Phone.TextInput', '604-048-9012');
            await spec.pause(500);
            await spec.fillIn('Email.TextInput', 'neverever@hotmail.com');
            await spec.pause(500);
            await spec.fillIn('AboutMe.TextInput', 'Producer/Director/Screenwriter');
            await spec.pause(1000);
            // await spec.press('SignupBack.Button');
        });
    });
}

