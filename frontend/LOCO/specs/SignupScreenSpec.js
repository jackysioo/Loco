export default function (spec) {

    spec.describe('SignupScreen Testing', function () {
        spec.it('W O R K S', async function () {
            // Wait 1 seconds before starting test
            await spec.pause(1000);
            await spec.press('SignUp.Button');
            await spec.pause(1000);
            await spec.fillIn('Username.TextInput', 'lisachen123');
            await spec.pause(500);
            await spec.fillIn('Password.TextInput', 'thisismypassword');
            await spec.pause(500);
            await spec.fillIn('FirstName.TextInput', 'Lisa');
            await spec.pause(500);
            await spec.fillIn('LastName.TextInput', 'Chen');
            await spec.pause(500);
            await spec.fillIn('AddressLine.TextInput', '1234 Address Street');
            await spec.pause(500);
            await spec.fillIn('City.TextInput', 'Vancouver');
            await spec.pause(500);
            await spec.fillIn('Province.TextInput', 'BC');
            await spec.pause(500);
            await spec.fillIn('PostalCode.TextInput', 'A8A 8A8');
            await spec.pause(500);
            await spec.fillIn('Birthday.TextInput', 'Jan 1, 2019');
            await spec.pause(500);
            await spec.fillIn('Phone.TextInput', '888-888-8888');
            await spec.pause(500);
            await spec.fillIn('Email.TextInput', 'email123@hotmail.com');
            await spec.pause(500);
            await spec.fillIn('AboutMe.TextInput', 'Hi my name is Lisa and I like penguins');
            await spec.pause(1000);
            await spec.press('SignupBack.Button');
        });
    });
}

