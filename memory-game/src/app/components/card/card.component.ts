import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardModel} from "../../models/card.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {CardStatusEnum} from "../../models/card.interface";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('cardFlip', [
      state(CardStatusEnum.DEFAULT, style({
        transform: 'none',
      })),
      state(CardStatusEnum.FLIPPED, style({
        transform: 'perspective(600px) rotateY(180deg)'
      })),
      state(CardStatusEnum.MATCHED, style({
        visibility: 'false',
        transform: 'scale(0.05)',
        opacity: 0
      })),
      transition(`${CardStatusEnum.DEFAULT} => ${CardStatusEnum.FLIPPED}`, [
        animate('400ms')
      ]),
      transition(`${CardStatusEnum.FLIPPED} => ${CardStatusEnum.DEFAULT}`, [
        animate('400ms')
      ]),
      transition(`* => ${CardStatusEnum.MATCHED}`, [
        animate('400ms')
      ])
    ])
  ]
})
export class CardComponent implements OnInit {

  @Input() cardData: CardModel;
  @Output() cardClicked = new EventEmitter<any>;
  constructor() {
    this.cardData = new CardModel();
  }

  ngOnInit(): void {
  }

}
