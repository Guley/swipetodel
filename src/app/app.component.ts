import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, keyframes, transition, animate, query, stagger } from '@angular/animations';

import { Configuration } from './config/configuration';
import { ListType } from './constants/list-type';
import { Warnings } from './constants/warnings';
import { Constants } from './constants/constants';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':leave', [
          stagger(100, [
            animate('0s', style({ opacity: '0' })),
            animate('0.2s', style({ height: '0px', opacity: '0', display: 'none' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('slideLeft', [
      transition('* => *', animate(100, keyframes([
        style({ left: '*', offset: 0 }),
        style({ left: '0', offset: 1 }),
      ])
      ))
    ])
  ]
})
export class AppComponent  {
  @Input() items: any;
  @Input() configuration: Configuration = null;
  @Output() deletedItem = new EventEmitter<any>();
  ngstdIndexNumber:number = null;
  disableWarnings = false;
  listType: string = null;
  slideThreshold: number;
  numberOfDeleteIcon: number = null;
  classname: string =  null;
  isInvalidConfig: boolean =  null;
  elementLeftSign = true;
  deletedResult = null;
  constructor() { }
  ngOnInit() {
    this.initializeSWipeList();
    this.items = [
    {
      title: 'Iron Man',
      icon: `pan_tool`,
      img: `https://image.flaticon.com/icons/png/512/663/663084.png`,
      description: `Iron Man is a fictional superhero. A wealthy American business magnate, playboy, and ingenious scientist, Anthony Edward "Tony" Stark suffers a severe chest injury during a kidnapping.  `,
      data: {
        name: 'Tony Stark',
        abilities: [
          'Flying', 'Shooting', 'billionaire'
        ]
      }
    },
    {
      title: 'Capton America',
      icon: `view_stream`,
      img: `https://image.flaticon.com/icons/png/512/663/663077.png`,
      description: `Captain America is a fictional superhero.Captain America is the alter ego of Steve Rogers, a frail young man enhanced to the peak of human perfection by an experimental serum to aid the United States government's efforts in World War II.`,
      data: {
        name: 'Steve Rogers',
        abilities: [
          'Strong', 'Very Strong'
        ]
      }
    },
    {
      title: 'Dr Strange',
      icon: `offline_bolt`,
      img: `https://image.flaticon.com/icons/png/512/663/663089.png`,
      description: `Doctor Stephen Vincent Strange is a fictional superhero. After a car accident severely damages his hands and hinders his ability to perform surgery, he searches the globe for a way to repair them and encounters the Ancient One. `,
      data: {
        name: 'Steven Strange',
        abilities: [
          'Master of Mystic Art'
        ]
      }
    },
    {
      title: 'Shaktiman',
      icon: `flash_on`,
      img: `https://image.flaticon.com/icons/png/512/663/663086.png`,
      description: `Shaktimaan is an Indian fictional superhero. Shaktimaan is depicted as a human who has attained superhuman strength and power through deep meditation and attaining control over five elements of life.`,
      data: {
        name: 'Pandit Gangadhar',
        abilities: [
          'Attractive male', 'Healing', 'Will power-based constructs', 'Flying'
        ]
      }
    },
    {
      title: 'The Winter Soldier',
      icon: `trending_up`,
      img: `https://image.flaticon.com/icons/png/512/663/663088.png`,
      description: `James Buchanan "Bucky" Barnes is a fictional superhero. James Buchanan Barnes was born in Shelbyville, Indiana in 1925. Barnes grew up as an Army brat. `,
      data: {
        name: 'James Buchanan "Bucky" Barnes',
        abilities: [
          'Hand to hand combat and Martial arts', 'Strong Arm'
        ]
      }
    },
    {
      title: 'The Batman',
      icon: `attach_money`,
      img: `https://image.flaticon.com/icons/png/512/663/663076.png`,
      description: ` Batman does not possess any superpowers; rather, he relies on his genius intellect, physical prowess, martial arts abilities, detective skills, science and technology, vast wealth, intimidation, and indomitable will. A large assortment of villains make up Batman's rogues gallery, including his archenemy, the Joker.`,
      data: {
        name: 'Bruce wayne',
        abilities: [
          'Rich', 'Strong'
        ]
      }
    },
    {
      title: 'The Superman',
      icon: `send`,
      img: `https://image.flaticon.com/icons/png/512/663/663079.png`,
      description: `Early in his childhood, he displays various superhuman abilities, which, upon reaching maturity, he resolves to use for the benefit of humanity through a "Superman" identity.`,
      data: {
        name: 'Clark Kent',
        abilities: [
          'Attractive male', 'Healing', 'Will power-based constructs', 'Flying'
        ]
      }
    },
    {
      title: 'The Black Panther',
      icon: `send`,
      img: `https://image.flaticon.com/icons/png/512/663/663078.png`,
      description: `Black Panther's real name is T'Challa, king and protector of the fictional African nation of Wakanda.`,
      data: {
        name: `King T'Challa`,
        abilities: [
          'Superhumanly acute senses', 'Enhanced strength', 'Speed', 'Agility', 'Stamina', 'Durability', 'Healing', 'Reflexes'
        ]
      }
    },
    {
      title: 'The Hulk',
      icon: `send`,
      img: `https://image.flaticon.com/icons/png/512/663/663083.png`,
      description: `Hulk, a green-skinned, hulking and muscular humanoid possessing a vast degree of physical strength, and his alter ego Bruce Banner.`,
      data: {
        name: `Bruce Banner`,
        abilities: [
          'Limitless physical strength'
        ]
      }
    }
  ]
  }
  initializeSWipeList(): void {
    this.detectInvalidConfig();
    this.setDisableWarnings();
    this.setslideThreshold();
    this.setNumberOfDeleteIcon();
    this.setlistType();
  }
  detectInvalidConfig(): void {
    if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
      this.isInvalidConfig = true;
      this.logWarnings(Warnings.CONFIG_NOT_LOADED);
    } else {
      this.isInvalidConfig = false;
    }
  }
  setNumberOfDeleteIcon(): void {
    const config = this.configuration;
    if (this.isInvalidConfig || config.numberOfDeleteIcon === 2) {
      this.numberOfDeleteIcon = Constants.NUMBER_OF_DELETE_ICONS;
    } else{
      this.numberOfDeleteIcon = null;
    }
  }
  setslideThreshold(): void {
    if (this.isInvalidConfig) {
      this.slideThreshold = Constants.DEFAULT_SLIDE_THRESHOLD;
      this.logWarnings(Warnings.SLIDE_THRESHOLD_NOT_FOUND, `${Constants.ADDING_DEFAULT_SLIDE_THRESHOLD} ${Constants.DEFAULT_SLIDE_THRESHOLD}%.`);
      return;
    }
    const config = this.configuration;
    if (config.slideThreshold === null || config.slideThreshold === undefined || typeof config.slideThreshold !== 'number') {
      if (typeof config.slideThreshold !== 'number') {
        this.logWarnings(Warnings.INVALID_SLIDE_THRESHOLD_NOT_ALLOWED, `${Constants.ADDING_DEFAULT_SLIDE_THRESHOLD} ${Constants.DEFAULT_SLIDE_THRESHOLD}%.`);
      } else {
        this.logWarnings(Warnings.SLIDE_THRESHOLD_NOT_FOUND, `${Constants.ADDING_DEFAULT_SLIDE_THRESHOLD} ${Constants.DEFAULT_SLIDE_THRESHOLD}%.`);
      }
      this.slideThreshold = Constants.DEFAULT_SLIDE_THRESHOLD;
    } else {
      if (config.slideThreshold < Constants.MIN_SLIDE_THRESHOLD || config.slideThreshold === Constants.MIN_SLIDE_THRESHOLD || config.slideThreshold > Constants.MAX_SLIDE_THRESHOLD) {
        if (config.slideThreshold > Constants.MAX_SLIDE_THRESHOLD) {
          this.logWarnings(Warnings.MAX_SLIDE_THRESHOLD_NOT_ALLOWED, `${Constants.ADDING_DEFAULT_SLIDE_THRESHOLD} ${Constants.DEFAULT_SLIDE_THRESHOLD}%.`);
        }
        if (config.slideThreshold < Constants.MIN_SLIDE_THRESHOLD || config.slideThreshold === Constants.MIN_SLIDE_THRESHOLD) {
          this.logWarnings(Warnings.ZERO_SLIDE_THRESHOLD_NOT_ALLOWED, `${Constants.ADDING_DEFAULT_SLIDE_THRESHOLD} ${Constants.DEFAULT_SLIDE_THRESHOLD}%.`);
        }
        this.slideThreshold = Constants.DEFAULT_SLIDE_THRESHOLD;
      } else {
        this.slideThreshold = config.slideThreshold;
      }
    }
  }
  setlistType(): void {
    const config = this.configuration;
    if (this.isInvalidConfig || config.listType === `` || config.listType === undefined || config.listType === null) {
      this.listType = ListType.LISTWITHIMAGE;
    } else {
      const listType = config.listType.trim();
      switch (listType) {
        case ListType.SINGLELINE:
        case ListType.MULTILINE:
        case ListType.LISTWITHICON:
        case ListType.LISTWITHIMAGE:
          this.listType = listType;
          break;
        default:
          this.listType = ListType.SINGLELINE;
      }
    }
  }
  setDisableWarnings(): void {
    if (this.isInvalidConfig) {
      this.disableWarnings = false;
    } else {
      const config = this.configuration;
      this.disableWarnings = (config.disableWarnings && config.disableWarnings !== undefined && config.disableWarnings !== null) ? true : false;
    }
  }
  getClassName(): string{
    if (this.isInvalidConfig) {
      return `${Constants.DEFAULT_CLASS_NAME}`;
    } else {
      if (this.configuration.classname !== '' && this.configuration.classname !== null && this.configuration.classname !== undefined ){
        return `${Constants.DEFAULT_CLASS_NAME} ${this.configuration.classname}`;
      } else {
        return `${Constants.DEFAULT_CLASS_NAME}`;
      }
    }
  }
  panend(action, index, elementRefrence): void {
    const currentMargin = this.getLeftPosition(elementRefrence);
    if (currentMargin > this.slideThreshold || 
        (currentMargin < - this.slideThreshold &&  this.numberOfDeleteIcon === Constants.NUMBER_OF_DELETE_ICONS)) {
      this.removeElement(index);
    } else {
      this.ngstdIndexNumber = index;
    }
  }
  panmove(action, elementRefrence): void {
    elementRefrence.style.left = action.deltaX + 'px';
    elementRefrence.offsetLeft > 0 ? this.elementLeftSign = true : this.elementLeftSign = false;
  }
  alignComplete(event): void {
    event.element.style.left = '0px';
    event.element.offsetLeft > 0 ? this.elementLeftSign = true : this.elementLeftSign = false;
    this.ngstdIndexNumber = null;
  }
  getLeftSign() {
    return this.elementLeftSign ?  true : false;
  }
  removeElement(index): void {
    const deletedItem = this.items[index];
    this.deletedResult = deletedItem;
    this.items.splice(index, 1);
    this.deletedItem.emit(deletedItem);
   
  }
  getLeftPosition(elementRefrence): number {
    const currentleftPosition = elementRefrence.style.left.slice(0, -2);
    if (currentleftPosition !== null) {
      return (parseInt(
        currentleftPosition, 10
      ) * 100) / window.innerWidth;
    } else {
      return 0;
    }
  }
  logWarnings(warningFor: string, extraMessage: any = null): void {
    if (this.disableWarnings) {
      return;
    }
    switch (warningFor) {
      case Warnings.CONFIG_NOT_LOADED:
      case Warnings.SLIDE_THRESHOLD_NOT_FOUND:
      case Warnings.ZERO_SLIDE_THRESHOLD_NOT_ALLOWED:
      case Warnings.MAX_SLIDE_THRESHOLD_NOT_ALLOWED:
      case Warnings.INVALID_SLIDE_THRESHOLD_NOT_ALLOWED:
        extraMessage === null ? console.warn(this.getConstValue(warningFor)) : console.warn(this.getConstValue(warningFor), extraMessage);
        break;
      default:
        // unicons !
    }
  }
  getConstValue(constantName: string): string {
    return Constants[constantName];
  }
}
