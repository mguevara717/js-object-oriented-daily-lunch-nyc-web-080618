// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] }; //store

let neighborhoodId = 1;
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = neighborhoodId++
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter((delivery) => {
        return this.id === delivery.neighborhoodId
    })
  }

  customers() {
    return store.customers.filter((customer) => {
      return customer.neighborhoodId  === this.id
    })
  }

   meals(){
    let list = this.deliveries().map((delivery) =>{
      return delivery.meal()
    })

    return [...new Set(list)]
  }

} //end of neighborhood class

let mealId = 1;
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = mealId++
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.mealId === this.id
  })
}
  customers() {
    return this.deliveries().map((delivery) => {
        return delivery.customer()
    })
}

   static byPrice(){
    return store.meals.sort((a,b) => {
      return (b.price - a.price)
    })
  }


} //end of Meal class

let customerId = 1;
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = customerId++
    store.customers.push(this)
  }

  deliveries(){
   return store.deliveries.filter((delivery) => {
     return delivery.customerId === this.id
   })
 }
 meals(){
    return this.deliveries().map((delivery) => {
     return delivery.meal()
   })
 }

 totalSpent(){
  return this.meals().reduce((acc, cur ) => acc + cur.price, 0)
}

}

let deliveryId = 1;
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = deliveryId++
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(function(meal) {
      return(meal.id === this.mealId)
    }.bind(this))
  }

  customer() {
      return store.customers.find(function(customer) {
        return(customer.id === this.customerId)
      }.bind(this))
  }

  neighborhood() {
    return store.neighborhoods.find(function(neighborhood) {
      return(neighborhood => neighborhood.id === this.neighborhoodId)
    })
  }


}
