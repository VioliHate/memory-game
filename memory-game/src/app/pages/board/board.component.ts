import {Component, OnInit} from '@angular/core';
import {CardModel} from "../../models/card.model";
import {CardStatusEnum} from "../../models/card.interface";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  cards: CardModel[] = [];
  flippedCards: CardModel[] = [];

  moves: number = 0;
  point: number = 0;

  imagesName = [
    'chiave-inglese.png',
    'ciliegie.png',
    'dromedario.png',
    'farfalla.png',
    'pensatore.png',
    'torre-eiffel.png'
  ]


  constructor() { }

  ngOnInit(): void {
    this.initCardGame();
  }

  initCardGame(){
    this.moves = 0;
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

  cardClicked(i: number) {
    const cardInfo = this.cards[i];
    if (cardInfo.state === CardStatusEnum.DEFAULT && this.flippedCards.length < 2) {
      cardInfo.state = CardStatusEnum.FLIPPED;
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.check();
      }

    } else if (cardInfo.state === CardStatusEnum.FLIPPED) {
      cardInfo.state = CardStatusEnum.DEFAULT;
      this.flippedCards.pop();
      this.moves++;
    }
  }

  private check() {
    this.moves++;
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageName === cardTwo.imageName ? CardStatusEnum.MATCHED : CardStatusEnum.DEFAULT;
      cardOne.state = cardTwo.state = nextState;
      this.flippedCards = [];
    }, 1000);
  }
}
