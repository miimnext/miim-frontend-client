// 定义正则表达式类型
type RegexType = RegExp;

interface RegexMap {
  emailRegEx: RegexType;
  usernameRegEx: RegexType;
  passwordRegEx: RegexType;
}

interface RegexMethods {
  test: (key: keyof RegexMap, value: string) => boolean;
  match: (key: keyof RegexMap, value: string) => RegExpMatchArray | null;
}

export const RegEx: RegexMap & RegexMethods = {
  // 正则表达式定义
  emailRegEx: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  usernameRegEx: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{4,13}$/,
  passwordRegEx: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/,

  // `test` 方法：检查给定字符串是否匹配指定正则
  test: (key: keyof RegexMap, value: string): boolean => {
    return RegEx[key].test(value);
  },

  // `match` 方法：提取匹配的内容
  match: (key: keyof RegexMap, value: string): RegExpMatchArray | null => {
    return value.match(RegEx[key]);
  },
};
