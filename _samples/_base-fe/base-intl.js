/*
2024 2019

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl

BCP 47 https://datatracker.ietf.org/doc/html/rfc5646  locales 参数必须是一个 BCP 47 语言标记的字符串，或者是一个包括多个语言标记的数组。
网页头部的声明应该是用 lang="zh" 还是 lang="zh-cn" https://www.zhihu.com/question/20797118/answer/16809331

最新推荐: zh (不区分简繁体和地区) zh-Hans (中文简体)  zh-CN(考虑老浏览器兼容)。
zh cn 等组合中的“大小写”对功能无影响，但比如 cn 小写会有违规范。

BCP 47： Best Current Practice 47 一种标准化的语言和区域设置标记系统 language-extlang-script-region-variant-extension-privateuse 标记结构：
- 语言代码（必填）：长度: 2-3 个字母（ISO 639-1 或 ISO 639-3）示例: en（英语）、zh（中文）、fr（法语）等。2 个字母的一般和 ISO 639 二字码是相同的，三字码是额外在 [IANA](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) 中登记注册的。
- 国家/地区代码（可选）：长度: 2 个大写字母（ISO 3166-1 alpha-2）示例: US（美国）、CN（中国）、CA（加拿大）等，可以是数字 如 es-005=南美西班牙语。仅当有必要时才使用区域子标签。
- 脚本代码（可选）：长度: 4 个字母（ISO 15924）示例: Latn（拉丁文）、Cyrl（西里尔文）、Hans（简体中文）等。仅当有必要时才使用 script 子标签。
- 变体代码（可选）：长度: 各种长度 示例: valencia（瓦伦西亚语） pinyin=拼音 jyutping=粤拼 等。用于指示语言、脚本、区域组合不能涵盖的方言或变体。

zh-CN 简体中文-中国   zh-HK 繁体中文-香港   zh-MO 中文-澳门  zh-TW 中文-台湾  zh-SG 中文-新加坡
zh-CHS zh-Hans 简体中文  zh-CHT zh-Hant 繁体中文
zh-Hans-CN 简体中文-中国  zh-Hans-SG 简体中文-新加坡
zh(汉语/宏语言macrolanguage) za=Zhuang(状族语)  hak=Hakka(客家语)  cmn=Mandarin(普通话/是汉语的一种)
zh-cmn-Latn-pinyin 用拼音拼写的普通话(zh-cmn 就是 cmn)
zh-lzh-Hans 简体字书写的文言文
zh-yue-Hant-HK 在香港地区使用的繁体字书写的粤语

en-hk 英语(香港)  en-us 英语(美国)  en-gb 英语(英国)  en-ca 英语(加拿大)  en-au 英语(澳大利亚)
es-es 西班牙语(西班牙)  es-ar 西班牙语(阿根廷)
fr-fr 法语(法国)  fr-lu 法语(卢森堡)
es-us 西班牙语(美国)  es-mx 西班牙语(墨西哥)

*/

function isValidBCP47Tag(locale) {
  try {
    // 尝试创建一个 Intl.Locale 对象
    new Intl.Locale(locale);
    return true;
  } catch (e) {
    return false;
  }
}
console.log(isValidBCP47Tag('en-US'));  // true
console.log(isValidBCP47Tag('invalid-locale'));
console.log(isValidBCP47Tag('123')); // false

const korean = new Intl.Locale('ko', {
  region: 'KR',
  script: 'Kore',
  hourCycle: 'h23',
  calendar: 'gregory',
});
const japanese = new Intl.Locale('ja-Jpan-JP-u-ca-japanese-hc-h12');
console.log(korean.baseName, japanese.baseName);
console.log(korean.hourCycle, japanese.hourCycle);
// Expected output: "h23" "h12"

const locales = ["ban", "id-u-co-pinyin", "de-ID"];
console.log(Intl.NumberFormat.supportedLocalesOf(locales, { localeMatcher: "lookup" }));
// ["id-u-co-pinyin", "de-ID"]

const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
const regionNamesInTraditionalChinese = new Intl.DisplayNames(['zh-Hant'], {
  type: 'region',
});
console.log(regionNamesInEnglish.of('US'));
console.log(regionNamesInTraditionalChinese.of('US'));

let date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));
console.log(new Intl.DateTimeFormat('en-US').format(date));
// Expected output: "12/20/2020"
console.log(new Intl.DateTimeFormat(['ban', 'id']).format(date));
// Expected output: "20/12/2020"
console.log(
  new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Australia/Sydney',
  }).format(date),
);
// Expected output: "Sunday, 20 December 2020 at 14:23:16 GMT+11"

console.log(date.toLocaleTimeString());
console.log(date.toLocaleTimeString("zh-CN"));
console.log(date.toLocaleTimeString("en-US"));
console.log(date.toLocaleTimeString("en-GB"));
console.log(date.toLocaleTimeString("ko-KR"));

date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
// 请求参数 (options) 中包含参数星期 (weekday)，并且该参数的值为长类型 (long)
let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
console.log(new Intl.DateTimeFormat("de-DE", options).format(date));
// "Donnerstag, 20. Dezember 2012"
// 需要使用世界标准时间 (UTC)，并且 UTC 使用短名字 (short) 展示
options.timeZone = "UTC";
options.timeZoneName = "short";
console.log(new Intl.DateTimeFormat("en-US", options).format(date));
// "Thursday, December 20, 2012, UTC"
options = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "Australia/Sydney",
  timeZoneName: "short",
  fractionalSecondDigits: 3,
};
console.log(new Intl.DateTimeFormat("en-AU", options).format(date));
// "2:00:00.200 pm AEDT"
options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  dayPeriod: "short", // 单独设置会出现 10 at night
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "America/Los_Angeles",
};
console.log(new Intl.DateTimeFormat("en-US", options).format(date));
// "12/19/2012, 19:00:00"
// 要使用选项，但是需要使用浏览器的默认区域，请使用 'default'
console.log(new Intl.DateTimeFormat("default", options).format(date));

// 在你的区域下创建相对时间格式化程序
const rtf = new Intl.RelativeTimeFormat("en", {
  localeMatcher: "best fit", // 其他值："lookup"
  numeric: "always", // 其他值："auto"
  style: "long", // 其他值："short"或"narrow"
});
// 使用负值（-1）格式化相对时间。
console.log(rtf.format(-1, "day")); // "1 day ago"
// 使用正值（1）格式化相对时间。
console.log(rtf.format(1, "day")); // "in 1 day"

const duration = {
  hours: 1,
  minutes: 46,
  seconds: 40,
};
console.log(new Intl.DurationFormat("fr-FR", { style: "long" }).format(duration));
console.log(new Intl.DurationFormat("en", { style: "short" }).format(duration));
// "1 hr, 46 min and 40 sec"

const number = 123456.789;
console.log(new Intl.NumberFormat("de-DE").format(number));
console.log(new Intl.NumberFormat("ar-EG").format(number));
console.log(
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    number,
  ),
);
console.log(
  new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(
    number,
  ),
);
console.log(
  new Intl.NumberFormat("pt-PT", {
    style: "unit",
    unit: "kilometer-per-hour",
  }).format(50),
);
// 50 km/h

const list = ["Motorcycle", "Bus", "Car"];
console.log(
  new Intl.ListFormat("en-GB", { style: "long", type: "conjunction" }).format(
    list,
  ),
);

const str = "吾輩は猫である。名前はたぬき。";
console.table(str.split(" "));
// ['吾輩は猫である。名前はたぬき。']  这两个句子并没有得到正确的分割。
const segmenterJa = new Intl.Segmenter("ja-JP", { granularity: "word" });
const segments = segmenterJa.segment(str);
console.table(Array.from(segments));
// [{segment: '吾輩', index: 0, input: '吾輩は猫である。名前はたぬき。', isWordLike: true},
// etc.
// ]
