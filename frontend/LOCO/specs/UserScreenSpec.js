export default function (spec) {

    spec.describe('UserScreen Testing', function () {
        spec.it('W O R K S', async function () {
            await spec.pause(1000);
            await spec.fillIn('LoginUsername.TextInput', 'CYNTHIA');
            await spec.fillIn('LoginPassword.TextInput', '123');
            await spec.press('Login.Button');
            await spec.pause(5000);
            await spec.press('EditProfile.Button');
            await spec.pause(1000);
            await spec.fillIn('AboutMe.TextInput', 'TESTING ABOUT ME INPUT');
            await spec.pause(500);
            await spec.fillIn('Email.TextInput', 'TESTING E-MAIL INPUT');
            await spec.pause(500);
            await spec.fillIn('Phone.TextInput', 'TESTING PHONE INPUT');
            await spec.pause(500);
            await spec.fillIn('Birthday.TextInput', 'TESTING BIRTHDAY INPUT');
            await spec.pause(500);
            await spec.fillIn('PostalCode.TextInput', 'TESTING POSTAL CODE INPUT');
            await spec.pause(500);
            await spec.fillIn('Province.TextInput', 'TESTING PROVINCE INPUT');
            await spec.pause(500);
            await spec.fillIn('City.TextInput', 'TESTING CITY INPUT');
            await spec.pause(500);
            await spec.fillIn('AddressLine.TextInput', 'TESTING ADDRESS LINE INPUT');
            await spec.pause(500);
            await spec.fillIn('LastName.TextInput', 'TESTING LAST NAME INPUT');
            await spec.pause(500);
            await spec.fillIn('FirstName.TextInput', 'TESTING FIRST NAME INPUT');
            await spec.pause(500);
            await spec.fillIn('Password.TextInput', 'TESTING PASSWORD INPUT');
            await spec.pause(500);
            await spec.fillIn('Username.TextInput', 'TESTING USERNAME INPUT');
            await spec.pause(1000);
            await spec.press('BioBack.Button');
            await spec.pause(1000);
            await spec.press('Following.Button');
            await spec.pause(1000);
            await spec.press('FollowingBack.Button');
            await spec.pause(1000);
            await spec.press('AllReviews.Button');
            await spec.pause(1000);
            await spec.press('Review1');
            await spec.pause(1000);
            await spec.press('EditReview.Button');
            await spec.pause(1000);
            await spec.fillIn('ReviewTitle.TextInput', 'TESTING REVIEW TITLE INPUT');
            await spec.fillIn('Review.TextInput', 'TESTING REVIEW INPUT');
            await spec.pause(1000);
            await spec.press('CancelEditReview.Button');
            await spec.pause(1000);
            await spec.press('ReviewBack.Button');
            await spec.pause(1000);
            await spec.press('AllReviewsBack.Button');
        });
    });
}

