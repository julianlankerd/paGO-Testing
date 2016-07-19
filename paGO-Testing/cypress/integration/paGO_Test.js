
describe('Full paGO Testing',function(){
	
	beforeEach('',function(){
	
	})
	
	afterEach('',function(){
		cy.end()
	})

	context('paGO back-end',function(){
		it('Do everything in the back-end with this \'it\' function since otherwise it won\'t work :(',function(){
				
			/*Go to the back end of Joomla! and navigate to the paGO dashboard*/
			PagoDash()
			/*This is going to begin testing the Products Section in the back-end of paGO*/
			CreateProduct()
			/*This is going to test the Category Section in the back-end of paGO*/
			CreateCategory()

			//Fuck this test
		})
	})
})

//Selects a random option for each 'select' element that's a child of the region
