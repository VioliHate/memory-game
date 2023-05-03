import {Component, OnInit} from '@angular/core';
import {CardModel} from "../../models/card.model";
import {CardStatusEnum} from "../../models/card.interface";
import {InfoDialogComponent} from "../../components/info-dialog/info-dialog.component";
import {MatDialog} from "@angular/material/dialog";

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

  restartFlag: boolean = false;

  timerId = null;

  imagesName = [
    'chiave-inglese.png',
    'ciliegie.png',
    'dromedario.png',
    'farfalla.png',
    'pensatore.png',
    'torre-eiffel.png'
  ]


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initCardGame();
  }

  initCardGame(){
    this.restartFlag = false;
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
    let timer = setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageName === cardTwo.imageName ? CardStatusEnum.MATCHED : CardStatusEnum.DEFAULT;
      cardOne.state = cardTwo.state = nextState;
      if(nextState === CardStatusEnum.MATCHED){
        clearTimeout(timer);
        this.point++
        if(this.point === this.imagesName.length){
          this.restartFlag = true;
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            data: {title: 'FINE PARTITA', message: 'Complimenti!' +
                ' La partita è terminata premere riavvia in alto per ricomiciare'},
            width: '20rem',
            height: 'auto'
          });
        }
      }
      this.flippedCards = [];
    }, 5000);
  }

  openRulesDialog() {
      const dialogRef = this.dialog.open(InfoDialogComponent, {
        data: {title: 'REGOLE', message: 'il giocatore scopre due carte. ' +
            'Se trova una coppia di figure uguali, le carte rimarranno scoperte. ' +
            'Se sbaglia, ricopre le carte che ha girato. ' +
            'Si gioca fino a quando tutte le coppie sono state scoperte.'},
        width: '20rem',
        height: 'auto'
      });
  }
}
