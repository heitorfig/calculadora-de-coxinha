import { Component } from '@angular/core';

class Item {
  id: string;
  name: string;
  proportion: number;
  checked?: boolean;
}

class ItemToBuy {
  item: Item;
  quantity: number;
}

class Type {
  name: string;
  quantityPerCapita: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public peopleQuantity: number;
  public types: Type[] = [];
  public itemsToBuy: ItemToBuy[] = [];
  public itemsAvailable: Item[] = [];
  public quantityPerCapita: number = 7;
  public thighSize: number = 1;
  public sodaPerCapita = 1/6;

  constructor() {
    this.types.push({
      name: 'Pra galera comer',
      quantityPerCapita: 7
    });
    this.types.push({
      name: 'Pra comer e sobrar',
      quantityPerCapita: 9
    });
    this.types.push({
      name: 'Pra comer e sobrar para o outro dia',
      quantityPerCapita: 12
    });

    this.itemsAvailable.push({
      id: 'coxinha',
      name: 'coxinhas',
      proportion: 0.3,
      checked: true
    });
    this.itemsAvailable.push({
      id: 'bolinha',
      name: 'bolinhas de queijo',
      proportion: 0.2,
      checked: true
    });
    this.itemsAvailable.push({
      id: 'kibe',
      name: 'kibes',
      proportion: 0.2,
      checked: true
    });
    this.itemsAvailable.push({
      id: 'esfirra',
      name: 'esfirras',
      proportion: 0.15,
      checked: true
    });
    this.itemsAvailable.push({
      id: 'kibe-recheado',
      name: 'kibes recheados',
      proportion: 0.15,
      checked: true
    });
    this.itemsAvailable.push({
      id: 'misto',
      name: 'mistos',
      proportion: 0.1,
      checked: true
    });
    this.itemsAvailable.push({
      id: 'empada',
      name: 'empadas',
      proportion: 0.1,
      checked: true
    });
  }

  calc() {
    let items = this.itemsAvailable.filter((item) => {
      return item.checked;
    });
    let totalToBuy = this.peopleQuantity * this.quantityPerCapita * this.thighSize;

    let totalProportion = items.reduce((prev, cur) => {
      return prev + cur.proportion;
    }, 0);
    let ratio = 1 / totalProportion;

    this.itemsToBuy = [];
    for (let item of items) {
      let quantity = Math.ceil(item.proportion * ratio * totalToBuy);
      if (quantity < this.peopleQuantity) {
        quantity = this.peopleQuantity - 1;
      }
      this.itemsToBuy.push({
        item: item,
        quantity: quantity
      });
    }
  }

  getTotalToBuy() {
    let total = this.itemsToBuy.reduce((prev, cur) => {
      return prev + cur.quantity;
    }, 0);
    return total;
  }
}
