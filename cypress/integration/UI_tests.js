//------------------------------------------------------SignUp------------------------------------------------------------
//As a new user I want to register by creating a user name 
//and password so that system can remember me and my data.
describe('The Sign Up page', () => {

    it('Display Login', function(username, password) {

        cy.visit('/signup')

        cy.get('input[name=username]').type(username)

        // {enter} causes the form to submit
        cy.get('input[name=password]').type(`${password}`)

        cy.get('input[value=Submit]').click();

        // we should be redirected to /login
        cy.url().should('include', '/login')

        // UI should reflect this user being logged in
        cy.get('title').should('contain', 'Bus Booking App')
    })

    //////sequential execution 
    it('Login Successful', function(username, password) {

        ////cy.visit('/login')

        cy.get('input[name=username]').type(username)


        cy.get('input[name=password]').type(`${password}`)
            // causes the form to submit
        cy.get('input[value=Submit]').click();

        // we should be redirected to /dashboard
        cy.url().should('include', '/dashboard')
            //   cy.getCookie('your-session-cookie').should('exist')

        // UI should reflect this user being logged in
        cy.get('title').should('contain', 'Bus Booking App')
    })

    //////////////sequential going for buses page displaye the buses page


    it('Now go for buses page', function() {

        cy.visit('/buses')

        cy.get('input[name=date]').type(new Date)
        cy.get('input[name=departure]').type(Lahore)
        cy.get('input[name=departure]').type(Islamabad)
            // causes the form to submit
        cy.get('input[value=Submit]').click();

        // we should be redirected to /dashboard
        cy.url().should('include', '/available_buses')
            //   cy.getCookie('your-session-cookie').should('exist')

        // UI should reflect this user being logged in
        cy.get('title').should('contain', 'Bus Booking System')
    })


    //////  going for book ticket page display the book ticket page

    it('Select Bus', function() {

        /// cy.visit('/available_buses')


    })

    it('Payment', function() {

        /// cy.visit('/available_buses')


    })

})








//---------------------------------------------------------------------------LOGIN-------------------------------------------------------
// TESt case for Login UI automation with user name and password

// As a registered user, 
// I want to login with my username and password 
// so that system can authenticate me and I can trust it

//-----------------------Login By Seeding DATa----------------------------
describe('The Login Page', () => {
    beforeEach(() => {
        // reset and seed the database prior to every test
        cy.exec('npm run db:reset && npm run db:seed')

        // seed a user in the DB that we can control from our tests
        // assuming it generates a random password for us
        cy.request('POST', '/test/seed/user', { username: 'jane.lane' })
            .its('body')
            .as('currentUser')
    })

    it('sets auth cookie when logging in via form submission', function() {
        // destructuring assignment of the this.currentUser object
        const { username, password } = this.currentUser

        cy.visit('/login')

        cy.get('input[name=username]').type(username)

        // {enter} causes the form to submit
        cy.get('input[name=password]').type(`${password}{enter}`)

        cy.get('input[value=Submit]').click();

        // we should be redirected to /dashboard
        cy.url().should('include', '/dashboard')

        // our auth cookie should be present
        cy.getCookie('your-session-cookie').should('exist')

        // UI should reflect this user being logged in
        cy.get('h1').should('contain', 'jane.lane')
    })
})


//------------------Login by passing username and password as parmeters--------------------------


describe('The Login Page', () => {

    it('Login Successful', function(username, password) {

        cy.visit('/login')

        cy.get('input[name=username]').type(username)


        cy.get('input[name=password]').type(`${password}`)
            // causes the form to submit
        cy.get('input[value=Submit]').click();

        // we should be redirected to /dashboard
        cy.url().should('include', '/dashboard')
            //   cy.getCookie('your-session-cookie').should('exist')

        // UI should reflect this user being logged in
        cy.get('title').should('contain', '/userdashboard')
    })
})

/////testing the UI of buses page whether busses page is visible or not
describe('The Buses Page ', () => {

    it('Now go for buses page', function() {

        cy.visit('/buses')

        cy.get('input[name=date]').type(new Date)
        cy.get('input[name=departure]').type(Lahore)
        cy.get('input[name=departure]').type(Islamabad)
            // causes the form to submit
        cy.get('input[value=Submit]').click();

        // we should be redirected to /dashboard
        cy.url().should('include', '/available_buses')
            //   cy.getCookie('your-session-cookie').should('exist')

        // UI should reflect this user being logged in
        cy.get('title').should('contain', 'Bus Booking System')
    })
})


/////testing the UI of booking page whether selected buses can be booked
describe('The Buses Page ', () => {

    it('Login Successful', function() {

        cy.visit('/booking')

        cy.get('input[name=date]').type(new Date)
        cy.get('input[name=departure]').type(Lahore)
        cy.get('input[name=departure]').type(Islamabad)
            // causes the form to submit
        cy.get('input[value=Submit]').click();

        // we should be redirected to /dashboard
        cy.url().should('include', '/available_buses')
            //   cy.getCookie('your-session-cookie').should('exist')

        // UI should reflect this user being logged in
        cy.get('title').should('contain', 'Bus Booking System')
    })
})


//----------------------------------------------------------------------------------------------------------------------------------------------------------------


///UNIT TEST FOR TESTING WHEN BUS SERVICE IS NOT AVAILABE--------------------------------------------

describe(`Buses Page`, () => {
    describe(`Service is temporily suspended`, () => {
        beforeEach(() => {
            cy.intercept('GET', '/api/buses/list', { body: [] }).as('emptyList');
            cy.visit('/busespage');
            cy.wait('@emptyList');
        });

        it(`a message should be displayed`, () => {
            cy.get(`[data-test-id="no delivery"]`)
                .should('exist')
                .and('be.visible')
                .and('contain', 'Sorry, our service is temporly unavailable.');
        });
    });
});




///UNIT TEST FOR TESTING WHEN BUS SERVICE IS NOT AVAILABE plus adding static API TO GET DATA FOR TEST--------------------------------------------


describe(`Buses Page`, () => {
    describe(`when there is a proper response for buses`, () => {
        beforeEach(() => {
            cy.intercept('GET', '/api/buses/list', { fixture: 'buseslist.json' }).as('buses'); ////Our static api response
            ///will come from buseslist.json
            cy.visit('/busespage');
            // We wait for the response
            cy.wait('@buses');
        });

        it(`should display the available buses`, () => {
            cy.get(`[data-test-id=""]`) // we retrieve our mocked buses
                .should('be.visible') // we assert it is visible 
                .contains("1", "Niazi Expres");

        });
    });
});


describe2(`Buses Page`, () => {
    describe(`when there is a proper response for buses`, () => {
        beforeEach(() => {
            cy.intercept('GET', '/api/buses/list', { fixture: 'buseslist.json' }).as('buses'); ////Our static api response
            ///will come from buseslist.json
            cy.visit('/busespage');
            // We wait for the response
            cy.wait('@buses');
        });

        it(`should display the available buses`, () => {
            cy.get(`[data-test-id="1"]`) // we retrieve our mocked buses
                .should('be.visible') // we assert it is visible 
                .contains("1", "Niazi Expres");

        });
    });
});



/////complete Unit test for testing Successful login

it("succesful Signup", () => {
    var actual = signup("36302-3497449-1", "zain", "0304-6437766", "zainabbaskhakhi123@gmail.com", "zaman@123");
    assert.equal(1, actual);

})

it("Wrong Cnic pattern", () => {
    var actual = signup("36302-3497449-11", "zain", "0304-6437766", "zainabbaskhakhi123@gmail.com", "zaman@123");
    assert.equal(0, actual);
})

it("Singup_alphanumeric_phoneNo", () => {
    var actual = signup("36302-3497449-1", "zain", "0304-64377abcd", "zainabbaskhakhi123@gmail.com", "zaman@123");
    assert.equal(0, actual);
})

it("login Successful", () => {
    var actual = login("36302-3497449-1", "zaman@123");
    assert.equal(1, actual);
})


it("login with wrong CNIC", () => {
    var actual = login("36302-3ab7449-1", "zaman@123");
    assert.equal(0, actual);
})


it("Singin_greater_length_password", () => {
    var actual = login("36302-3497449-1", "zaman@123sdhbchvern");
    assert.equal(0, actual);
})


it("updating the user profile with correct values", () => {

    var actual = updateprofile("36302-3497449-1", "zain@123", "zain@321");
    assert.equal(1, actual);
})


it("updating the user profile with wrong cnic", () => {

    var actual = updateprofile("36302-3497dc449-1", "12345", "12345566");
    assert.equal(0, actual);
})

it("updating the user profile with greater length cnic", () => {

    var actual = updateprofile("36302-3497449-13456", "12345", "123456");
    assert.equal(0, actual);
})

it("updating the user profile by submitting wrong fromat password", () => {

    var actual = updateprofile("36302-3497449-1", "12345zain466354534", "123457");
    assert.equal(0, actual);
})


it("selecting correct payment method", () => {
    var actual = payment_method("0316-6383977", "easypaisa");
    assert.equal(1, actual);
})


it("selecting wrong payment method by entering wrong number", () => {
    var actual = payment_method("0316-638abcd", "easypaisa");
    assert.equal(0, actual);
})