# Setup

* `cd` into the project root and run `npm install`.
* Run `npm test`. Everything should be green.
* Run `node` in the root directory.

# Do the shopping

There's an application service that provides the functionlity. If we were to add a REST API it would consume the service. So let's load that first.

```javascript
const app = require('./src/application/application-service')
```

Next fetch some _Items_

```javascript
const apple = app.findItemByName('Apple')
const banana = app.findItemByName('Banana')
const orange = app.findItemByName('Orange')
const papaya = app.findItemByName('Papaya')
```

Now, let's add Items to our basket

```javascript
let shoppingBasket
shoppingBasket = app.addItemToBasket(null, apple, 2)
shoppingBasket = app.addItemToBasket(shoppingBasket, banana, 1)
shoppingBasket = app.addItemToBasket(shoppingBasket, orange, 2)
shoppingBasket = app.addItemToBasket(shoppingBasket, papaya, 5)
```

We'd like to pa ... no, let's get some more bananas

```javascript
shoppingBasket = app.addItemToBasket(shoppingBasket, banana, 3)
```

Ok, now we want to pay

```javascript
shoppingBasket = app.pay(shoppingBasket)
```

We should get a nicely formatted receipt.

# Approach

I implemented this exercise by doing _Test-Driven Development_ and I tried to implement it in a functional way. Inspired by _Domain-Driven Design_ I designed the objects (or more precise: _Value Objects_) by encoding domain rules inside them: If the object exists it must be valid.

# TODOs
* Design: Put some additional thought (constraints) into the _Value Objects_. Can an Item name be millions of characters long?
* Design: Handle money correctly.
* Features: Whoops! I added to many bananas to my basket. How do I get them out?
* Infrastructure: Logging
