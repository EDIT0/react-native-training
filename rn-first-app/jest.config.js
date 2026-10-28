module.exports = {
  preset: '@react-native/jest-preset',
  // node_modules는 기본적으로 변환하지 않지만, ESM으로 배포된 RN 라이브러리는 변환해야 테스트에서 읽을 수 있다
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation)/)',
  ],
}
