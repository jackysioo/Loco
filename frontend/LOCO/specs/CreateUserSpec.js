export default function (spec) {

    spec.describe('Creating User', function () {
        spec.it('W O R K S', async function () {
            await spec.press('SignUp.Button');
            await spec.fillIn('Username.TextInput', 'lisachen123');
            await spec.fillIn('Password.TextInput', 'thisismypassword');
            await spec.fillIn('FirstName.TextInput', 'Lisa');
            await spec.fillIn('LastName.TextInput', 'Chen');
            await spec.fillIn('AddressLine.TextInput', '1234 Address Street');
            await spec.fillIn('City.TextInput', 'Vancouver');
            await spec.fillIn('Province.TextInput', 'BC');
            await spec.fillIn('PostalCode.TextInput', 'A8A 8A8');
            await spec.fillIn('Phone.TextInput', '888-888-8888');
            await spec.fillIn('Email.TextInput', 'email123@hotmail.com');
            await spec.fillIn('AboutMe.TextInput', 'Hi my name is Lisa and I like penguins');
            await spec.press('SaveChanges.Button.Button');
        });
    });
}

