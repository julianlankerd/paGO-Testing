/*function Shipping(){
	cy
	.get('#ui-id-5').click()
	var t  = document.querySelectorAll('[type="text"]');
	cy.type(randomString({maxLen:3,minLen:0,charSet:nums})+'.'+randomString({maxLen:5,minLen:1,charSet:nums}))
}*/


/*PagoDash will be used to access the backend of paGO correctly*/
function PagoDash(){
	joomlalogin()
	cy.visit(backEnd)
	.get('#menu > li:nth-child(5) > a').click() //Drop Components menu
	.get('#menu > li.dropdown.open > ul > li').contains('paGO Commerce').click() // Drop
}
/*This is going to fill out the products "GENERAL" page*/
function productGeneral(){
	var itemName=randomString({maxLen:20,minLen:1,charSet:centerKybd});
	cy.get('#params_name').type(itemName)													
	.get('#params_sku').type(randomString({maxLen:20,minLen:1,charSet:centerKybd}))
	.get("#params_alias").type(randomString({maxLen:20,minLen:1,charSet:centerKybd}))
	.get('#params_price').type(randomString({maxLen:3,minLen:0,charSet:nums})+'.'+randomString({maxLen:5,minLen:1,charSet:nums}))
	.get("#params_qty").type(randomString({maxLen:5,minLen:1,charSet:nums}))							
	/*Selects a random option for each 'select' element that's a child of the region*/
	withinSelectRandom('#tabs > div.tabs-content.pg-pad-20.pg-white-bckg.pg-border')
	/*This will fire HTML wrapped input into the description fields*/
	var temp=HTMLText.splice(HTMLText);
	temp=temp.splice(temp)
	cy.get('[title="Toggle editor"]').click({multiple: true})
	.get("#params\\5b description\\5d").type(randomString({maxLen:100,minLen:90,charSet:centerKybd.splice(temp),embed:""}))
	.get("#params\\5b content\\5d").type(randomString({maxLen:100,minLen:90,charSet:centerKybd.splice(temp),embed:""}))
	.get('[title="Toggle editor"]').click({multiple: true})	
	/*This is going to check all of the possible categories available*/
	cy.get('#main-1 > ul').find('input').check({force: true})
}

function errorScan(){
    var errorFields = Cypress.$('label.label-error');
//    console.log(errorFields,errorFields.length);
//    while(errorFields.length>0){
		for(var j=0;j<errorFields.length;j++){
			errorFields[j].getParent().getElements('input')[0].value='123';
		}
		cy.get('#pago_toolbar > button:nth-child(1)').click();
		errorFields=Cypress.$('label.label-error');
//	}
}

function Input(){
	var inputFields=Cypress.$('[type="text"]')
	for(var i=0;i<inputFields.length;i++){
		inputFields[i].value=randomString({maxLen:5,minLen:0,charSet:nums.splice(centerKybd.splice(centerKybd.splice(centerKybd.splice(centerKybd))))})
	}
	cy.get("#pago_toolbar > button:nth-child(2)").click();
	errorScan
}

//function viewTabs(selector){
//	var allTabs = Cypress.$(selector);
//	for(var i=0;i<allTabs.length;i++){
//		console.log(allTabs[i],allTabs[i].click);
//	    allTabs[i].click();
//		var queriedFields = Cypress.$('[type="text"]')   //.type(randomString({maxLen:3,minLen:0,charSet:nums})+'.'+randomString({maxLen:5,minLen:1,charSet:nums}));
//		for(var j=0;j<queriedFields.length;j++){
//			queriedFields[j].value=randomString({maxLen:5,minLen:0,charSet:nums.splice(centerKybd.splice(centerKybd.splice(centerKybd.splice(centerKybd))))})
//			cy.get('#pago_toolbar > button.apply.pg-btn-medium.pg-btn-dark.pg-btn-green').click()
//		}
//	}
//}

/*This function will generate a random product*/

function CreateProduct(){
		cy
		.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop > span').click()//Click on the 'caret' then Drop the shop menu down
		.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop.open > div > ul > li:nth-child(1) > a').click()	
		.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop.open > a').click()//Go to the shop (product view)
		.get('#limit').select('All',{force:true})//Show 'all' items
		.get('#pago_toolbar > button.new.pg-btn-medium.pg-btn-green.pg-btn-dark').click()//Make a new item
		/*This is going to fill out the products "GENERAL" page*/
		//productGeneral()
		
		/*Move over to the 'Shipping' tab*/
			
		
			//return Viewtabs()
				cy.then(function($aaa){
					//cy.get('#ui-id-1').click()
					//console.log(Viewtabs('#tabs > div.pg-tabs > ul > li > a'))
//					viewTabs('#tabs > div.pg-tabs > ul > li > a');
					Input()
//					errorScan('#tabs > div.pg-tabs > ul > li > a');

					cy.then(function($bbb){
						errorScan()

					}).end()

				}).end()

			
			//foo()
		
		/*cy.pause()
		cy.get('#pago_toolbar > button.apply.pg-btn-medium.pg-btn-dark.pg-btn-green').click()	//and save it
		.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop.open > a').click()//Go to the shop (product view)
		
		/*Go back to the item*/
		/*cy.then(function($a){	
			return selectFrom($("#pg-items-manager > tbody > tr > td.pg-item-name > div > span > a"),"textContent",itemName)
		}).click({force: true})
		/*Use the other save button and exit*/
		/*cy.get("#pago_toolbar > button:nth-child(1)").click()
		cy.then(function($a){													//Go back again
			return selectFrom($("#pg-items-manager > tbody > tr > td.pg-item-name > div > span > a"),"textContent",itemName);
		}).click({force: true})															
		cy.get("#pago_toolbar > button:nth-child(3)").click()//Save and new
		cy.get("#pago_toolbar > button.cancel.pg-btn-medium.pg-btn-dark").click()//Cancel the new item
		

		/*This will begin to  work on the "Discounts" tab*/
		//cy.get('#ui-id-2').click()

		/*Don't forget to check the front-end for the item that was created!*/
		/*This will delete the item(s) generated*/
		/*.get('#checkall').check({force:true})				
		.get('#pago_toolbar > button.delete').click({force:true})	*/
}

/*This will Begin testing the Categories section*/

function CreateCategory(){
	cy
			.get("#pago > div.pg-sidebar > ul > li.pg-menu-shop.open > div > ul > li:nth-child(2) > a").click()//Go to the categories menu
			.get("#pago_toolbar > button.new.pg-btn-medium.pg-btn-green.pg-btn-dark").click()				//Make a new category and save it
			var categoryName=randomString({maxLen:20,minLen:1,charSet:centerKybd});						//
			cy.get("#params_name").type(categoryName)									//
			.get("#params_alias").type(randomString({maxLen:20,minLen:1,charSet:centerKybd}))				//
			.get("#pago_toolbar > button:nth-child(2)").click()								//
			
			.get('#pago > div.pg-sidebar > ul > li.pg-menu-shop.current.open > div > ul > li:nth-child(2) > a').click()//Go to the categories menu
			
			.then(function($a){													//Go back to the category
				return selectFrom($("#pg-categories-manager > tbody > tr > td.pg-category-name > a"),"textContent",categoryName);	//
			}).click()															//
			
			.get("#pago_toolbar > button:nth-child(1)").click()//Use the other save button and exit
			
			.then(function($a){													//Go back again
				return selectFrom($("#pg-categories-manager > tbody > tr > td.pg-category-name > a"),"textContent",categoryName);	//
			}).click()
																		//
			.get("#pago_toolbar > button:nth-child(3)").click()//Save and new
			.get("#pago_toolbar > button:nth-child(4)").click()//Cancel the new category
			
			/*Get rid of every Category item*/
			//.get('#checkall').check({force:true})			
			//.get('#pago_toolbar > button.delete').click({force:true})
}

