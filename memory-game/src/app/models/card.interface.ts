export interface CardInterface {
  imageName: string;
  state: CardStatusEnum;
}

export enum CardStatusEnum {
  DEFAULT = 'DEFAULT',
  FLIPPED = 'FLIPPED',
  MATCHED = 'MATCHED'
}
