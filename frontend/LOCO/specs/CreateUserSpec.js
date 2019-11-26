export default function (spec) {

    spec.describe('Creating User', function () {
        spec.it('W O R K S', async function () {
            await spec.press('SignUp.Button');
            await spec.fillIn('Username.TextInput', 'LISA');
            await spec.fillIn('Password.TextInput', '0');
            await spec.fillIn('FirstName.TextInput', 'Lisa');
            await spec.fillIn('LastName.TextInput', 'Chen');
            await spec.fillIn('AddressLine.TextInput', '6488 University Blvd,');
            await spec.fillIn('City.TextInput', 'Vancouver');
            await spec.fillIn('Province.TextInput', 'BC');
            await spec.fillIn('PostalCode.TextInput', 'V6T 1Z4');
            await spec.fillIn('Phone.TextInput', '(604) 822-2811');
            await spec.fillIn('Email.TextInput', 'email123@hotmail.com');
            await spec.fillIn('AboutMe.TextInput', 'Hi my name is Lisa\nI like to bake in my free time');
        });
    });
}

