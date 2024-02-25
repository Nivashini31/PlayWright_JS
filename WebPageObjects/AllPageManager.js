const {AddingCartObjects} = require('./AddingCartObjects');
const {CreateAccountObjects} = require('./CreateAccountObjects');
const {CommonPageObjects} = require('./CommonPageObjects');
const { CartPage } = require('./CartPage');

class AllPageManager
{
constructor(page)
{
    this.page = page;
    this.addingCartObjects = new AddingCartObjects(this.page);
    this.createAccountObjects = new CreateAccountObjects(this.page);
    this.commonPageObjects= new CommonPageObjects(this.page);
    this.cartPageObjects= new CartPage(this.page);
   
}

getAddingCartObjects()
{
    return this.addingCartObjects;
}

getCreateAccountObjects()
{
    return this.createAccountObjects;
}
getCommonPageObjects()
{
    return this.commonPageObjects;
}
getCartPageObjects()
{
    return this.cartPageObjects;
}


}
module.exports = {AllPageManager};