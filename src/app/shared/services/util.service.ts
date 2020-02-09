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

  static convertToHtmlTag(text: string) {
    return '<' + text + '></' + text + '/>';
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

  static dedupeAdjacent(a, targets) {
    return a.filter((e, i) => e !== a[i - 1] || !targets.includes(e));
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

  static roundNumber(n: any, digits: number) {
    let negative = false;
    if (digits === undefined) {
      digits = 0;
    }
    if (n < 0) {
      negative = true;
      n = n * -1;
    }
    const multiplier = Math.pow(10, digits);
    n = parseFloat((n * multiplier).toFixed(11));
    n = (Math.round(n) / multiplier).toFixed(2);
    if (negative) {
      n = (n * -1).toFixed(2);
    }
    return n;
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

  static getCurrentDate() {
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];
    return `${ date.getDate() } ${ months[date.getMonth()] } ${ date.getFullYear() }`;
  }

  static generatWebsiteName() {
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
}
