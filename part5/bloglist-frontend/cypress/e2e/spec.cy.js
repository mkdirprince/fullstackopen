describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'prince',
      username: 'master',
      password: 'root'
    }

    const user2 = {
      name: 'prince2',
      username: 'test',
      password: 'tester'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('Login')
  })


  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('master')
      cy.get('#password').type('root')
      cy.get('#login-button').click()

      cy.contains('master logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('maste')
      cy.get('#password').type('roo')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      
      cy.contains('master logged in').should('not.exist')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'master', password: 'root'})
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('A new blog created with cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.jospt.org')

      cy.get('#create-blog').click()

      cy.contains('A new blog created with cypress Cypress')
    })

    describe('and another blog', function () {
      beforeEach(function () {
        cy.createBlog({
          title: "another cypress blog",
          author: "Cypress",
          url: "https://bjsm.bmj.com/pages/bjsm-key-publishing-resources"
        })
      })

      it('it can be liked', function () {
        cy.contains('another cypress blog Cypress')
          .parent()
          .find('button:contains("view")')
          .click()
        
        cy.get('.like-button').click();

        cy.get('.likes').should(($likes) => {
          const newLikes = parseInt($likes.text(), 10);
          
          expect(newLikes).to.eq(1);
        });
      })

      it('user can delete blog', function () {
        cy.contains('another cypress blog Cypress')
          .parent()
          .find('button:contains("view")')
          .click()
        
        cy.get('.remove-blog').click()

        cy.contains('another cypress blog Cypress').should('not.exist')

        cy.contains('another cypress blog deleted successfully')
      })

    })

    describe('remove button visibility', function () {

      beforeEach(function () {
        cy.createBlog({
          title: "a third cypress blog",
          author: "Cypress",
          url: "https://bjsm.bmj.com"
        })

        cy.login({username: 'test', password: "tester"})
      })

      it('remove button is not visible for non-creator', function () {
        cy.contains('a third cypress blog Cypress')
          .parent()
          .find('button:contains("view")')
          .click()
        
        cy.contains('remove').should('not.exist')
      })
    
    })

    describe('Blog ordering by likes', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Blog with most likes',
          author: 'Author1',
          url: 'https://www.example1.com',
        });
    
        cy.createBlog({
          title: 'Blog with second most likes',
          author: 'Author2',
          url: 'https://www.example2.com',
        });
    
      });
    
      it('Blogs are ordered by likes with the most likes first', function () {
       
        cy.contains('Blog with second most likes Author2')
          .parent()
          .find('button:contains("view")')
          .click();
        
        cy.get('.like-button')
          .click({multiple: true})

          cy.wait(1000)

        cy.contains('Blog with most likes Author1')
          .parent()
          .find('button:contains("view")')
          .click();

        cy.get('.like-button')
          .click({multiple: true})
          
        cy.wait(1000)
    
        cy.get('.blogPost').eq(0).should('contain', 'Blog with most likes Author1');
        cy.get('.blogPost').eq(1).should('contain', 'Blog with second most likes Author2');
      });
    });

  })

 

})