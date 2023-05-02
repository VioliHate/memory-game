import {Component, OnInit} from '@angular/core';
import {CardModel} from "../../models/card.model";
import {CardStatusEnum} from "../../models/card.interface";
import {ngDebug} from "@angular/cli/src/utilities/environment-options";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  cards: CardModel[] = [];

  imagesName = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6'
  ]


  constructor() { }

  ngOnInit(): void {
    this.initCardGame();
  }

  initCardGame(){
    this.cards = [];
    this.imagesName.forEach((name) => {
      const card: CardModel = {
        imageName: name,
        state: CardStatusEnum.DEFAULT
      };
      // insert two identical cards
      this.cards.push({ ...card });
      this.cards.push({ ...card });
    });

   this.cards = this.shuffleCards(this.cards);
   console.log(this.cards);
  }

  private shuffleCards(cards: CardModel[]) {
    let  size = cards.length;
    while (size) {
      const i = Math.floor(Math.random() * size--);
      [cards[size], cards[i]] = [cards[i], cards[size]];
    }
    return cards;
  }

}
