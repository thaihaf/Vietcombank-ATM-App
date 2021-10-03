import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConvertMoneyServiceService {
  constructor() {}

  mangso: String[] = [
    'không',
    'một',
    'hai',
    'ba',
    'bốn',
    'năm',
    'sáu',
    'bảy',
    'tám',
    'chín',
  ];

  dochangchuc(so: number, daydu: boolean): string {
    let chuoi = '';
    let chuc = Math.floor(so / 10);
    let donvi = so % 10;
    if (chuc > 1) {
      chuoi = ' ' + this.mangso[chuc] + ' mươi';
      if (donvi == 1) {
        chuoi += ' mốt';
      }
    } else if (chuc == 1) {
      chuoi = ' mười';
      if (donvi == 1) {
        chuoi += ' một';
      }
    } else if (daydu && donvi > 0) {
      chuoi = ' lẻ';
    }
    if (donvi == 5 && chuc > 1) {
      chuoi += ' lăm';
    } else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
      chuoi += ' ' + this.mangso[donvi];
    }
    return chuoi;
  }
  docblock(so: number, daydu: any) {
    let chuoi = '';
    let tram = Math.floor(so / 100);
    so = so % 100;
    if (daydu || tram > 0) {
      chuoi = ' ' + this.mangso[tram] + ' trăm';
      chuoi += this.dochangchuc(so, true);
    } else {
      chuoi = this.dochangchuc(so, false);
    }
    return chuoi;
  }
  dochangtrieu(so: number, daydu: boolean) {
    let chuoi = '';
    let trieu = Math.floor(so / 1000000);
    so = so % 1000000;
    if (trieu > 0) {
      chuoi = this.docblock(trieu, daydu) + ' triệu';
      daydu = true;
    }
    let nghin = Math.floor(so / 1000);
    so = so % 1000;
    if (nghin > 0) {
      chuoi += this.docblock(nghin, daydu) + ' nghìn';
      daydu = true;
    }
    if (so > 0) {
      chuoi += this.docblock(so, daydu);
    }
    return chuoi;
  }
  docso(so: number) {
    if (so == 0) return this.mangso[0];
    var chuoi = '',
      hauto = '';
    do {
      let ty = so % 1000000000;
      so = Math.floor(so / 1000000000);
      if (so > 0) {
        chuoi = this.dochangtrieu(ty, true) + hauto + chuoi;
      } else {
        chuoi = this.dochangtrieu(ty, false) + hauto + chuoi;
      }
      hauto = ' tỷ';
    } while (so > 0);
    return chuoi;
  }
}
