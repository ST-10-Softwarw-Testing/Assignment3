// describe('My First Test', () => {
//     it('Gets, types and asserts', () => {
//         cy.visit('https://example.cypress.io')

//         cy.contains('type').click()

//         // Should be on a new URL which includes '/commands/actions'
//         cy.url().should('include', '/commands/actions')

//         // Get an input, type into it and verify that the value has been updated
//         cy.get('.action-email')
//             .type('fake@email.com')
//             .should('have.value', 'fake@email.com')
//     })
// })
// describe('The Home Page', () => {
//     it('successfully loads', () => {
//         cy.visit('/') // change URL to match your dev URL
//     })
// })


//------------------------------------------------------SignUp------------------------------------------------------------
//As a new user I want to register by creating a user name 
//and password so that system can remember me and my data.
describe('The Sign Up page', () => {

    it('Display Login', function(username, password) {

        cy.visit('/Signup')

        cy.get('input[name=username]').type(username)

        // {enter} causes the form to submit
        cy.get('input[name=password]').type(`${password}{enter}`)

        cy.get('input[value=Submit]').click();

        // we should be redirected to /dashboard
        cy.url().should('include', '/Login')

        //   // our auth cookie should be present
        //   cy.getCookie('your-session-cookie').should('exist')

        // UI should reflect this user being logged in
        cy.get('title').should('contain', '/Login')
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

        cy.visit('/Login')

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

//----------------------------------------------------------------------------------------------------------------------------------------------------------------