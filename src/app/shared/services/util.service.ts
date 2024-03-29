import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  static toTitleCase(str: string) {
    str = str.replace(/^\s+|\s+$/gm, '');
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  static isNullOrWhitespace(text: any): boolean {
    return !text || !text.trim();
  }

  static generateRandomString(length) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
    if (!length) {
      length = Math.floor(Math.random() * chars.length);
    }
    let str = '';
    for (let i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  static createYearRange(start, end) {
    const s = new Date(start);
    const startYear = s.getFullYear();

    const e = new Date(end);
    const endYear = e.getFullYear();
    const arr = Array();

    for (let i = startYear; i <= endYear; i++) {
      arr.push(i);
    }

    return arr;
  }

  static copyMessage(referralUrl) {
    const selectBox = document.createElement('textarea');
    selectBox.style.position = 'fixed';
    selectBox.style.left = '0';
    selectBox.style.top = '0';
    selectBox.style.opacity = '0';
    selectBox.value = referralUrl;
    document.body.appendChild(selectBox);
    selectBox.focus();
    selectBox.select();
    document.execCommand('copy');
    document.body.removeChild(selectBox);
    return;
  }

  static generateRandomWord() {
    const words = [
      'admiring',
      'adoring',
      'affectionate',
      'agitated',
      'amazing',
      'angry',
      'awesome',
      'blissful',
      'boring',
      'brave',
      'clever',
      'cocky',
      'compassionate',
      'competent',
      'condescending',
      'confident',
      'cranky',
      'dazzling',
      'determined',
      'distracted',
      'dreamy',
      'eager',
      'ecstatic',
      'elastic',
      'elated',
      'elegant',
      'eloquent',
      'epic',
      'fervent',
      'festive',
      'flamboyant',
      'focused',
      'friendly',
      'frosty',
      'gallant',
      'gifted',
      'goofy',
      'gracious',
      'happy',
      'hardcore',
      'heuristic',
      'hopeful',
      'hungry',
      'infallible',
      'inspiring',
      'jolly',
      'jovial',
      'keen',
      'kind',
      'laughing',
      'loving',
      'lucid',
      'mystifying',
      'modest',
      'musing',
      'naughty',
      'nervous',
      'nifty',
      'nostalgic',
      'objective',
      'optimistic',
      'peaceful',
      'pedantic',
      'pensive',
      'practical',
      'priceless',
      'quirky',
      'quizzical',
      'relaxed',
      'reverent',
      'romantic',
      'sad',
      'serene',
      'sharp',
      'silly',
      'sleepy',
      'stoic',
      'stupefied',
      'suspicious',
      'tender',
      'thirsty',
      'trusting',
      'unruffled',
      'upbeat',
      'vibrant',
      'vigilant',
      'vigorous',
      'wizardly',
      'wonderful',
      'xenodochial',
      'youthful',
      'zealous',
      'zen',
    ];
    return this.titleCase(words[Math.floor(Math.random() * words.length)]);
  }

  static titleCase(str) {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

  static generateGreeting() {
    const date = new Date();
    const hrs = date.getHours();
    let greeting = null;
    if (hrs < 12) {
      greeting = 'Good morning';
    } else if (hrs >= 12 && hrs <= 17) {
      greeting = 'Good afternoon';
    } else if (hrs >= 17 && hrs <= 24) {
      greeting = 'Good evening';
    }
    return greeting;
  }

  static safeUnsubscribe(subs) {
    if (subs) {
      subs.unsubscribe();
    }
  }

  static generateWebsiteName() {
    const left = [
      'admiring',
      'adoring',
      'affectionate',
      'agitated',
      'amazing',
      'angry',
      'awesome',
      'blissful',
      'boring',
      'brave',
      'clever',
      'cocky',
      'compassionate',
      'competent',
      'condescending',
      'confident',
      'cranky',
      'dazzling',
      'determined',
      'distracted',
      'dreamy',
      'eager',
      'ecstatic',
      'elastic',
      'elated',
      'elegant',
      'eloquent',
      'epic',
      'fervent',
      'festive',
      'flamboyant',
      'focused',
      'friendly',
      'frosty',
      'gallant',
      'gifted',
      'goofy',
      'gracious',
      'happy',
      'hardcore',
      'heuristic',
      'hopeful',
      'hungry',
      'infallible',
      'inspiring',
      'jolly',
      'jovial',
      'keen',
      'kind',
      'laughing',
      'loving',
      'lucid',
      'mystifying',
      'modest',
      'musing',
      'naughty',
      'nervous',
      'nifty',
      'nostalgic',
      'objective',
      'optimistic',
      'peaceful',
      'pedantic',
      'pensive',
      'practical',
      'priceless',
      'quirky',
      'quizzical',
      'relaxed',
      'reverent',
      'romantic',
      'sad',
      'serene',
      'sharp',
      'silly',
      'sleepy',
      'stoic',
      'stupefied',
      'suspicious',
      'tender',
      'thirsty',
      'trusting',
      'unruffled',
      'upbeat',
      'vibrant',
      'vigilant',
      'vigorous',
      'wizardly',
      'wonderful',
      'xenodochial',
      'youthful',
      'zealous',
      'zen',
    ];

    const right = [
      'albattani',
      'allen',
      'almeida',
      'agnesi',
      'archimedes',
      'ardinghelli',
      'aryabhata',
      'austin',
      'babbage',
      'banach',
      'bardeen',
      'bartik',
      'bassi',
      'beaver',
      'bell',
      'benz',
      'bhabha',
      'bhaskara',
      'blackwell',
      'bohr',
      'booth',
      'borg',
      'bose',
      'boyd',
      'brahmagupta',
      'brattain',
      'brown',
      'carson',
      'chandrasekhar',
      'shannon',
      'clarke',
      'colden',
      'cori',
      'cray',
      'curran',
      'curie',
      'darwin',
      'davinci',
      'dijkstra',
      'dubinsky',
      'easley',
      'edison',
      'einstein',
      'elion',
      'engelbart',
      'euclid',
      'euler',
      'fermat',
      'fermi',
      'feynman',
      'franklin',
      'galileo',
      'gates',
      'goldberg',
      'goldstine',
      'goldwasser',
      'golick',
      'goodall',
      'haibt',
      'hamilton',
      'hawking',
      'heisenberg',
      'hermann',
      'heyrovsky',
      'hodgkin',
      'hoover',
      'hopper',
      'hugle',
      'hypatia',
      'jackson',
      'jang',
      'jennings',
      'jepsen',
      'johnson',
      'joliot',
      'jones',
      'kalam',
      'kare',
      'keller',
      'kepler',
      'khorana',
      'kilby',
      'kirch',
      'knuth',
      'kowalevski',
      'lalande',
      'lamarr',
      'lamport',
      'leakey',
      'leavitt',
      'lewin',
      'lichterman',
      'liskov',
      'lovelace',
      'lumiere',
      'mahavira',
      'mayer',
      'mccarthy',
      'mcclintock',
      'mclean',
      'mcnulty',
      'meitner',
      'meninsky',
      'mestorf',
      'minsky',
      'mirzakhani',
      'morse',
      'murdock',
      'neumann',
      'newton',
      'nightingale',
      'nobel',
      'noether',
      'northcutt',
      'noyce',
      'panini',
      'pare',
      'pasteur',
      'payne',
      'perlman',
      'pike',
      'poincare',
      'poitras',
      'ptolemy',
      'raman',
      'ramanujan',
      'ride',
      'montalcini',
      'ritchie',
      'roentgen',
      'rosalind',
      'saha',
      'sammet',
      'shaw',
      'shirley',
      'shockley',
      'sinoussi',
      'snyder',
      'spence',
      'stallman',
      'stonebraker',
      'swanson',
      'swartz',
      'swirles',
      'tereshkova',
      'tesla',
      'thompson',
      'torvalds',
      'turing',
      'varahamihira',
      'visvesvaraya',
      'volhard',
      'villani',
      'wescoff',
      'wiles',
      'williams',
      'wilson',
      'wing',
      'wozniak',
      'wright',
      'yalow',
      'yonath'
    ];

    return left[Math.floor(Math.random() * left.length)] + '-' +
      right[Math.floor(Math.random() * left.length)] + '-' + Math.floor(10000000 + Math.random() * 90000000);
  }

  static openUrlInNewTab(url: any) {
    window.open(url, '_blank');

  }
}
