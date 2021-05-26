class Item { // Interdication de modifier cette class
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn; //désigne le nombre de jours restant pour vendre l'article.
    this.quality = quality;
    this.olderBetter = false //qui dénote combien l'article est précieux.
  }

    GetStatus() {
     if(this.name === 'Aged Brie' ||  this.name === 'Backstage passes to a TAFKAL80ETC concert'){
       this.olderBetter = true
     }
    }

  ControlQualityMaxMin() {
    if (this.name === 'Sulfuras'){
      this.quality = 80
    } else if(this.quality < 0){
      this.quality = 0
    } else if(this.quality > 50) {
      this.quality = 50
    }  
  }

  ControlSellIn() {
    if (this.olderBetter){
      if (this.sellIn <= 10 && this.sellIn > 5) {
        this.quality += 2;
      } else if (this.sellIn <= 5 && this.sellIn >= 0) {
        this.quality += 3;
      } else if (this.sellIn < 0) {
        this.quality = 0;
      } else {
        this.quality += 1
      }
    } else if (this.name === 'Sulfuras'){
      this.quality = 80
    } else {
      if (this.name.includes('Conjured')){
        if(this.sellIn > 0){
          this.quality -= 2
        } else if(this.sellIn < 0){
          this.quality -= 4
        }
    } else {
      if(this.sellIn > 0){
        this.quality -= 1
      } else if(this.sellIn < 0){
        this.quality -= 2
      }
    }
    } 
  }

  OneDayPast() { //
    if(this.olderBetter){
      this.sellIn -= 1
      this.ControlSellIn()
    } else if (this.name === 'Sulfuras'){
      this.ControlSellIn()
    } else {
      this.sellIn -= 1
      this.ControlSellIn()
    }
    this.ControlQualityMaxMin()
  }
}


const agedBrie = new Item('Aged Brie',5, 50)
const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert',10, 40)
const Sulfuras = new Item('Sulfuras',null, 80)



class Shop { // Autorisation de modifier la class
  constructor(items=[]){
    this.items = items;
  }
  
  updateQuality() {
    this.items.forEach((product) => {
      product.GetStatus();
      product.OneDayPast();
    })
    return this.items;
  }
}

const shopItem1 = new Shop([agedBrie,backstagePasses, Sulfuras]).updateQuality()





// function quality 
// function sellIn 


module.exports = {
  Item,
  Shop
}
