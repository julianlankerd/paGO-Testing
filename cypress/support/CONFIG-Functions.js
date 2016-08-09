/*Create different "Systems"*/
function createSystem(){
	cy.get('#pago > div.pg-sidebar > ul > li.pg-menu-config > span').click()//Click on the 'caret' then Drop the  CONFIG menu down
	cy.get('#pago > div.pg-sidebar > ul > li.pg-menu-config.open > div').contains('Manage System').click()
	cy.get('#tabs-1 > div > div.pg-title-button-wrap.pg-sub-title-button-wrap.pg-mb-20').contains("Add").click()
	cy.then(function($aaa){		
		//Input('#tabs-1')//This is going to find all text fields and fire garbage into said fields
		cy.get('#new_currency_code_chosen > a').click()
		cy.get('#new_currency_code_chosen > div > ul > li:nth-child(23)').click()
		Input('#new-currency-modal')
		Input('#new-currency-symbol')
		//cy.get('#new-currency-symbol').type(randomString({maxLen:30,minLen:1,charSet:centerKybd.splice(ascii.splice(symbols.splice(nums.splice(whiteSpace)))), embed:''}))
		cy.get("#new-currency-modal > div > div.pg-pad-20.text-center > button").contains("Add").click(); //This is going to (try and) save the product
	}).end()
	cy.get("#pago_toolbar").contains("Save").click(); //This is going to (try and) save the product
	cy.visit(backend)
}
/*Create a new Tax class and Rule*/
function createTaxRule(){
	/*Create the Tax Class*/
	cy.get('#pago > div.pg-sidebar > ul > li.pg-menu-config > span').click()//Click on the 'caret' then Drop the  CONFIG menu down
	cy.get('#pago > div.pg-sidebar > ul > li.pg-menu-config.open > div').contains('Manage Tax Rules').click()
	cy.get('#pago_toolbar').contains("New").click()
	cy.then(function(){
		Input('#tabs');
	})
	cy.get("#pago_toolbar").contains("Save & Close").click(); //This is going to (try and) save the product
	/*Now Create the Tax Rule*/
	cy.get('a[title="Publish item"]').click({multiple: true}).end()
	cy.get('#pg-items-manager > tbody > tr:nth-child(1) > td:nth-child(3) > a').click()
	cy.get('#pago_toolbar').contains("New").click()
	cy.then(function(){
		Input('#tabs');
		SelectRandom('fieldset', 'input', 'checked');
		SelectRandom('select', 'option');
		Cypress.$('#params_pgtax_rate')[0].value = randomString({maxLen:8,minLen:1,charSet:nums, embed:''});
	})
	cy.get("#pago_toolbar").contains("Save & Close").click(); //This is going to (try and) save the product
	cy.visit(backend)
}

function createCustomShipping(){
	cy.get('#pago > div.pg-sidebar > ul > li.pg-menu-config > span').click()//Click on the 'caret' then Drop the  CONFIG menu down
	cy.get('#pago > div.pg-sidebar > ul > li.pg-menu-config.open > div').contains('Manage Custom Shipping').click()
	cy.get('#pago_toolbar').contains("New").click()
	cy.then(function(){
		Input('#tabs-1');
		Input('#tabs-2', 'Number');
		Input('#tabs-4', 'Number');
		Input('#tabs-5', 'Number');
		SelectRandom('fieldset', 'input', 'checked');
		SelectRandom('select', 'option');
	})
	cy.get("#pago_toolbar").contains("Save & Close").click(); //This is going to (try and) save the product
	cy.visit(backend)
}