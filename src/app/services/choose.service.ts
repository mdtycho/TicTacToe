import { Injectable,EventEmitter } from '@angular/core';

@Injectable()
export class ChooseService {

  constructor() { }

  public ChooseOne:EventEmitter<string> = new EventEmitter();

  public RestartGame:EventEmitter<any> = new EventEmitter();

}
