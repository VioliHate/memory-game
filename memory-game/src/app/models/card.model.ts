import {CardInterface, CardStatusEnum} from "./card.interface";

export class CardModel implements CardInterface{
  imageName: string;
  state: CardStatusEnum;

  constructor() {
    this.imageName = ''
    this.state = CardStatusEnum.DEFAULT;
  }
}
