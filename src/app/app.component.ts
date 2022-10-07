import { Component, Inject } from '@angular/core';
import { EnhancementType, Gear, GearRarity, GearType, Range, gearRanges } from '../modals/gear.modals';
import {Title} from "@angular/platform-browser";
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  GearRarity = GearRarity;
  gearRange = gearRanges;
  EnhancementType = EnhancementType;
  GearType = GearType;
  selectedRarity = 'Legendary';

  gear = Gear.Random();

  constructor(private titleService: Title, @Inject(APP_BASE_HREF) public baseHref: string) {
    this.titleService.setTitle('ToF Gear Rating');
  }

  getRangeLabel(range: Range): string {
    if(range.min === range.max) {
      return `${range.max}`;
    }
    return `${range.max}`;
  }

  getPercentageLabel(percentage: number): string {
    const number = Math.round(percentage * 100);
    if(number > 100) {
      return `> 100 %`;
    }
    if(number < 0) {
      return `< 0 %`;
    }
    return `${number} %`;
  }

  getGearUri() {
    return `${this.baseHref}assets/images/${GearRarity[this.gear.rarity].toLowerCase()}/${GearType[this.gear.type].toLowerCase()}.webp`;
  }

  rerollGear() {
    this.gear = Gear.Random({rarity: this.gear.rarity, type: this.gear.type});
  }

  rarityChanged() {
    this.gear = Gear.Random({rarity: this.gear.rarity, type: this.gear.type});
  }
  typeChanged() {
    this.gear = Gear.Random({rarity: this.gear.rarity, type: this.gear.type});
  }

  starsChanged(stars: number) {
    if(!this.gear.rarity) return;
    if(stars === this.gear.stars) stars = 0;
    const starsTyped = stars as 0|1|2|3|4|5;
    this.gear.stars = starsTyped;
    //this.gear = Gear.Random({rarity: this.gear.rarity, type: this.gear.type, stars: starsTyped});
  }

  getRarity(rarity: any) {
    return GearRarity[rarity];
  }

  getEnumValue(enumValue: any, en: any): number {
    return en[enumValue];
  }

  getColor(value: number) {
    if(value === 0) return 'white';
    if(value < 0) return 'red';
    if(value > 100) return 'blue';
    var hue=((value)*120).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
  }

  enhancementChanged(enhancement: any) {

  }
}
